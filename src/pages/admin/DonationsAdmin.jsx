import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, Download } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const DonationsAdmin = () => {
  const { donations, addDonation, deleteDonation } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ donorName: '', amount: '', date: '', category: 'Donation' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addDonation({
      donorName: formData.donorName,
      amount: Number(formData.amount),
      date: formData.date || new Date().toISOString().split('T')[0],
      category: formData.category
    });
    setFormData({ donorName: '', amount: '', date: '', category: 'Donation' });
    setShowModal(false);
  };

  const filteredDonations = donations.filter(d => 
    d.donorName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem' }}>
          Donation Records
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => window.print()}><Download size={18} /> Export List</button>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}><Plus size={18} /> Add Manual Entry</button>
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
                <th>Donor Name</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredDonations.map(d => (
                <tr key={d.id}>
                  <td style={{ fontWeight: '500' }}>{d.donorName}</td>
                  <td>
                    <span style={{ 
                      background: d.category === 'Donation' ? 'var(--clr-surface)' : 'var(--clr-gold-light)', 
                      display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' 
                    }}>
                      {d.category}
                    </span>
                  </td>
                  <td style={{ color: 'var(--clr-success)', fontWeight: 'bold' }}>₹{d.amount}</td>
                  <td>{d.date}</td>
                  <td>
                    <button 
                      onClick={() => deleteDonation(d.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-danger)' }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredDonations.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-text-muted)' }}>
                    No donation records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div 
            className="card" 
            style={{ width: '100%', maxWidth: '500px', borderTop: '4px solid var(--clr-maroon)', maxHeight: '90vh', overflowY: 'auto' }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>Add Manual Donation</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Donor Name</label>
                <input type="text" className="form-control" required value={formData.donorName} onChange={(e) => setFormData({...formData, donorName: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Donation">General Donation</option>
                  <option value="Mangalya Contribution">Mangalya Contribution</option>
                  <option value="Family Contribution">Family Contribution</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount</label>
                <input type="number" className="form-control" required min="1" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Date (Optional)</label>
                <input type="date" className="form-control" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Record</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DonationsAdmin;
