import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, Download } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const MembersAdmin = () => {
  const { members, addMember, updateMember, deleteMember, recordPayment } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [activeMember, setActiveMember] = useState(null);
  const [paymentData, setPaymentData] = useState({ amount: '', date: new Date().toISOString().split('T')[0] });
  const [formData, setFormData] = useState({ name: '', category: 'Makalya Contribution' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateMember({ id: editingId, ...formData });
    } else {
      addMember(formData);
    }
    setFormData({ name: '', category: 'Makalya Contribution' });
    setShowModal(false);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleRecordPayment = (e) => {
    e.preventDefault();
    recordPayment(activeMember.id, paymentData.amount, paymentData.date);
    setPaymentData({ amount: '', date: new Date().toISOString().split('T')[0] });
    setShowPaymentModal(false);
  };

  const handleEdit = (m) => {
    setFormData({ name: m.name, category: m.category });
    setEditingId(m.id);
    setIsEditing(true);
    setShowModal(true);
  };

  const openAddModal = () => {
    setFormData({ name: '', category: 'Makalya Contribution' });
    setIsEditing(false);
    setEditingId(null);
    setShowModal(true);
  };

  const filteredMembers = members.filter(m => m.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const isMakalya = (cat) => cat === 'Makalya Contribution' || cat === 'Mangalya Contribution';
  
  const specialCount = members.filter(m => isMakalya(m.category) && (m.totalPaid || 0) >= 2501).length;
  const totalMakalyaCount = members.filter(m => isMakalya(m.category)).length;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem' }}>
          Makalya Contribution Data
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-outline" onClick={() => window.print()}><Download size={18} /> Export / Print</button>
          <button className="btn btn-primary" onClick={openAddModal}><Plus size={18} /> Add New Household</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem' }}>
        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--clr-gold)' }}>
          <div style={{ background: 'var(--clr-gold-light)', color: 'var(--clr-gold-dark)', padding: '0.75rem', borderRadius: '50%', fontWeight: 'bold' }}>🏆</div>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>Special Mark Donors (₹2501+)</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--clr-text-main)' }}>{specialCount} Families</h3>
          </div>
        </div>
        <div className="card" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid var(--clr-maroon)' }}>
          <div style={{ background: '#fef2f2', color: 'var(--clr-maroon)', padding: '0.75rem', borderRadius: '50%', fontWeight: 'bold' }}>👥</div>
          <div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>Total Makalya Records</p>
            <h3 style={{ margin: 0, fontSize: '1.5rem', color: 'var(--clr-text-main)' }}>{totalMakalyaCount} Families</h3>
          </div>
        </div>
      </div>

      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '300px' }}>
            <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--clr-text-muted)' }} />
            <input 
              type="text" 
              className="form-control" 
              placeholder="Search by name..." 
              style={{ paddingLeft: '2.5rem' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th style={{ width: '60px' }}>S.No</th>
                <th>Family / Couple Name</th>
                <th>Category</th>
                <th>Total Paid (₹)</th>
                <th>Dues recorded</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((m, index) => {
                const isSpecial = isMakalya(m.category) && (m.totalPaid || 0) >= 2501;
                return (
                  <tr key={m.id} style={{ background: isSpecial ? '#fffbeb' : 'inherit' }}>
                    <td style={{ color: 'var(--clr-text-muted)', fontWeight: 'bold' }}>{index + 1}</td>
                    <td style={{ fontWeight: '600', color: 'var(--clr-maroon)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {m.name}
                        {isSpecial && (
                          <span style={{ 
                            background: 'var(--clr-gold)', 
                            color: 'white', 
                            fontSize: '0.65rem', 
                            padding: '2px 6px', 
                            borderRadius: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '2px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                          }}>
                            🏆 Special Mark
                          </span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span style={{ 
                        background: isMakalya(m.category) ? 'var(--clr-gold-light)' : '#f3f4f6', 
                        display: 'inline-block', padding: '0.25rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                      }}>
                        {m.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 'bold', fontSize: '1.1rem', color: isSpecial ? 'var(--clr-gold-dark)' : 'var(--clr-success)' }}>
                      ₹{m.totalPaid || 0}
                    </td>
                  <td>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                      {(m.payments || []).map((p) => (
                        <span key={p.id} style={{ fontSize: '0.7rem', padding: '2px 4px', background: '#fef3c7', borderRadius: '4px', border: '1px solid #fde68a' }}>
                          ₹{p.amount} ({p.date})
                        </span>
                      ))}
                      {(m.payments || []).length === 0 && <span style={{ color: '#ccc', fontSize: '0.8rem' }}>No payments recorded</span>}
                    </div>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button 
                        className="btn btn-primary" 
                        style={{ padding: '4px 8px', fontSize: '0.75rem' }}
                        onClick={() => { setActiveMember(m); setShowPaymentModal(true); }}
                      >
                        + Add Due
                      </button>
                      <button 
                        onClick={() => handleEdit(m)}
                        style={{ padding: '4px 8px', fontSize: '0.75rem', background: '#fff', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer' }}
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => deleteMember(m.id)}
                        style={{ color: 'var(--clr-danger)', background: 'none', border: 'none', cursor: 'pointer' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
              })}
              {filteredMembers.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-text-muted)' }}>
                    No names found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Info Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div className="card" style={{ width: '100%', maxWidth: '400px', borderTop: '4px solid var(--clr-maroon)' }} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>{isEditing ? 'Edit Family Details' : 'Add New Family'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Name (Husband - Wife)</label>
                <input type="text" className="form-control" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Category</label>
                <select className="form-control" value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}>
                  <option value="Makalya Contribution">Makalya Contribution</option>
                  <option value="Family Contribution">Family Contribution</option>
                </select>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save Changes</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {/* Payment Entry Modal */}
      {showPaymentModal && activeMember && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div className="card" style={{ width: '100%', maxWidth: '400px', borderLeft: '8px solid var(--clr-success)' }} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h2 style={{ color: 'var(--clr-success)', marginBottom: '0.5rem' }}>Record Payment</h2>
            <p style={{ marginBottom: '1.5rem', fontWeight: 'bold' }}>Family: {activeMember.name}</p>
            <form onSubmit={handleRecordPayment}>
              <div className="form-group">
                <label className="form-label">Amount Paid (₹)</label>
                <input type="number" className="form-control" required placeholder="Enter amount..." value={paymentData.amount} onChange={(e) => setPaymentData({...paymentData, amount: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Date of Payment</label>
                <input type="date" className="form-control" required value={paymentData.date} onChange={(e) => setPaymentData({...paymentData, date: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowPaymentModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary" style={{ flex: 1, background: 'var(--clr-success)' }}>Add Payment</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default MembersAdmin;
