import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, Download } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const DonationsAdmin = () => {
  const { donations, addDonation, updateDonation, deleteDonation } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ donorName: '', amount: '', date: '', category: 'Donation' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      donorName: formData.donorName,
      amount: Number(formData.amount),
      date: formData.date || new Date().toISOString().split('T')[0],
      category: formData.category
    };

    if (isEditing) {
      updateDonation({ id: editingId, ...data });
    } else {
      addDonation(data);
    }
    
    setFormData({ donorName: '', amount: '', date: '', category: 'Donation' });
    setShowModal(false);
    setIsEditing(false);
  };

  const handleEdit = (d) => {
    setFormData({ donorName: d.donorName, amount: d.amount, date: d.date, category: d.category });
    setEditingId(d.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setFormData({ donorName: '', amount: '', date: new Date().toISOString().split('T')[0], category: 'Donation' });
    setIsEditing(false);
    setShowModal(true);
  };

  const filteredDonations = donations.filter(d => 
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem' }}>
          Donation Records
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => window.print()}><Download size={18} /> Export List</button>
          <button className="btn btn-primary" onClick={openAddModal}><Plus size={18} /> Add New Donation</button>
        </div>
      </div>

      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--clr-text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search donor or category..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Total Entries: <strong>{donations.length}</strong></span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>S.No</th>
                <th>Donor Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map((d, index) => (
                <tr key={d.id}>
                  <td style={{ color: 'var(--clr-text-muted)', fontWeight: 'bold' }}>{index + 1}</td>
                  <td style={{ fontWeight: '600' }}>{d.donorName}</td>
                  <td>
                    <span style={{ 
                      background: d.category === 'Donation' ? '#f3f4f6' : 'var(--clr-gold-light)', 
                      display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold'
                    }}>
                      {d.category}
                    </span>
                  </td>
                  <td style={{ color: 'var(--clr-success)', fontWeight: 'bold' }}>{formatCurrency(d.amount)}</td>
                  <td>{d.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        onClick={() => handleEdit(d)}
                        style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteDonation(d.id)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-danger)' }}
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredDonations.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-text-muted)' }}>
                    No donation records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div 
            className="card" 
            style={{ width: '100%', maxWidth: '500px', borderTop: '4px solid var(--clr-maroon)', maxHeight: '90vh', overflowY: 'auto' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              {isEditing ? 'Update Donation' : 'Add Donation Record'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Donor Name</label>
                <input type="text" className="form-control" required value={formData.donorName} onChange={(e) => setFormData({...formData, donorName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Donation">General Donation</option>
                  <option value="Makalya Contribution">Makalya Contribution</option>
                  <option value="Family Contribution">Family Contribution</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input type="number" className="form-control" required min="1" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" required value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{isEditing ? 'Update Entry' : 'Save Entry'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DonationsAdmin;
