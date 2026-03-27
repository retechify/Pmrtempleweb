import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { Plus, Trash2, Search, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const LedgerAdmin = () => {
  const { transactions, addTransaction, deleteTransaction } = useContext(DataContext);
  const [showModal, setShowModal] = useState(false);
  const [txnType, setTxnType] = useState('Credit');
  const [formData, setFormData] = useState({ date: new Date().toISOString().split('T')[0], description: '', amount: '' });
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddTransaction = (e) => {
    e.preventDefault();
    addTransaction({
      date: formData.date,
      description: formData.description,
      type: txnType,
      amount: Number(formData.amount)
    });
    setFormData({ date: new Date().toISOString().split('T')[0], description: '', amount: '' });
    setShowModal(false);
  };

  const filteredTxns = transactions
    .filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  return (
    <div className="fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem' }}>
          General Ledger (Credits & Debits)
        </h1>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn btn-success" onClick={() => { setTxnType('Credit'); setShowModal(true); }} style={{ background: 'var(--clr-success)', color: 'white', border: 'none' }}>
            <ArrowDownRight size={18} /> Add Credit
          </button>
          <button className="btn btn-danger" onClick={() => { setTxnType('Debit'); setShowModal(true); }} style={{ background: 'var(--clr-danger)', color: 'white', border: 'none' }}>
            <ArrowUpRight size={18} /> Add Debit
          </button>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '2rem' }}>
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '1rem', color: 'var(--clr-text-muted)' }} />
          <input 
            type="text" 
            placeholder="Search entries..." 
            className="form-control"
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
              <th>Date</th>
              <th>Description</th>
              <th>Type</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTxns.map((t, index) => (
              <tr key={t.id} style={{ borderLeft: `4px solid ${t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)'}` }}>
                <td style={{ color: 'var(--clr-text-muted)', fontWeight: 'bold' }}>{index + 1}</td>
                <td style={{ fontWeight: '500' }}>{t.date}</td>
                <td>{t.description}</td>
                <td>
                  <span style={{ 
                    background: t.type === 'Credit' ? '#ecfdf5' : '#fef2f2', 
                    color: t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)', 
                    padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold', border: `1px solid ${t.type === 'Credit' ? '#d1fae5' : '#fee2e2'}`
                  }}>
                    {t.type === 'Credit' ? 'INCOME' : 'EXPENSE'}
                  </span>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 'bold', fontSize: '1rem', color: t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)' }}>
                  {t.type === 'Credit' ? '+' : '-'}{formatCurrency(t.amount)}
                </td>
                <td style={{ textAlign: 'center' }}>
                  <button onClick={() => deleteTransaction(t.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-danger)' }} title="Delete Entry">
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
            {filteredTxns.length === 0 && (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '2rem', color: 'var(--clr-text-muted)' }}>
                  No ledger entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Transaction Modal */}
      {showModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
          <motion.div className="card" style={{ width: '100%', maxWidth: '400px', maxHeight: '90vh', overflowY: 'auto' }} initial={{ scale: 0.9 }} animate={{ scale: 1 }}>
            <h2 style={{ marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', color: txnType === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)' }}>
              Add {txnType} Entry
            </h2>
            <form onSubmit={handleAddTransaction}>
              <div className="form-group">
                <label className="form-label">Date</label>
                <input type="date" className="form-control" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Description (e.g. Drums, Bulk Donations)</label>
                <input type="text" className="form-control" required placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className="form-group">
                <label className="form-label">Amount (₹)</label>
                <input type="number" className="form-control" required min="1" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} />
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
                <button type="button" className="btn btn-outline" style={{ flex: 1 }} onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="btn" style={{ flex: 1, color: 'white', background: txnType === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)' }}>Save {txnType}</button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

    </div>
  );
};

export default LedgerAdmin;
