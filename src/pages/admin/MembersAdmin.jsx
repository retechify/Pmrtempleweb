import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, Download } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const MembersAdmin = () => {
  const { members, addMember, updateMember, deleteMember } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', category: 'Mangalya Contribution', amountPaid: '', paymentDate: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateMember({
        id: editingId,
        name: formData.name,
        category: formData.category,
        amountPaid: Number(formData.amountPaid),
        paymentDate: formData.paymentDate || new Date().toISOString().split('T')[0]
      });
    } else {
      addMember({
        name: formData.name,
        category: formData.category,
        amountPaid: Number(formData.amountPaid),
        paymentDate: formData.paymentDate || new Date().toISOString().split('T')[0]
      });
    }
    setFormData({ name: '', category: 'Mangalya Contribution', amountPaid: '', paymentDate: '' });
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (m) => {
    setFormData({ name: m.name, category: m.category, amountPaid: m.amountPaid, paymentDate: m.paymentDate });
    setEditingId(m.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setFormData({ name: '', category: 'Mangalya Contribution', amountPaid: '', paymentDate: '' });
    setIsEditing(false);
    setEditingId(null);
    setShowModal(true);
  };

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem' }}>
          Member Management
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => window.print()}><Download size={18} /> Export List</button>
          <button className="btn btn-primary" onClick={openAddModal}><Plus size={18} /> Add Member</button>
        </div>
      </div>

      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--clr-text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search members..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <span style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Total Members: <strong>{members.length}</strong></span>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Amount Paid</th>
                <th>Payment Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(m => (
                <tr key={m.id}>
                  <td style={{ fontWeight: '500' }}>{m.name}</td>
                  <td>
                    <span style={{ 
                      background: m.category === 'Mangalya Contribution' ? 'var(--clr-gold-light)' : 'var(--clr-surface)', 
                      display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem' 
                    }}>
                      {m.category}
                    </span>
                  </td>
                  <td>₹{m.amountPaid}</td>
                  <td>{m.paymentDate}</td>
                  <td>
                    <button 
                      onClick={() => handleEdit(m)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-text-main)', marginRight: '1rem' }}
                      title="Edit Member"
                    >
                      <span style={{ textDecoration: 'underline' }}>Edit</span>
                    </button>
                    <button 
                      onClick={() => deleteMember(m.id)}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-danger)' }}
                      title="Delete Member"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-text-muted)' }}>
                    No members found.
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
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>{isEditing ? 'Edit Member' : 'Add New Member'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" required value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Mangalya Contribution">Mangalya Contribution</option>
                  <option value="Family Contribution">Family Contribution</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Amount Paid</label>
                <input type="number" className="form-control" required min="0" value={formData.amountPaid} onChange={(e) => setFormData({...formData, amountPaid: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Payment Date (Optional)</label>
                <input type="date" className="form-control" value={formData.paymentDate} onChange={(e) => setFormData({...formData, paymentDate: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>{isEditing ? 'Update Details' : 'Add Member'}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MembersAdmin;
