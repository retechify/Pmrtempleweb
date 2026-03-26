import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const Accounts = () => {
  const { stats, donations, members, transactions } = useContext(DataContext);
  const [activeTab, setActiveTab] = useState('ledger');
  const [searchTerm, setSearchTerm] = useState('');

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const StatCard = ({ title, value, icon, color, delay }) => (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${color}` }}
    >
      <div style={{ background: `${color}15`, color, padding: '1rem', borderRadius: '50%' }}>{icon}</div>
      <div>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--clr-text-main)' }}>{formatCurrency(value)}</h3>
      </div>
    </motion.div>
  );

  const filteredTxns = transactions.filter(t => t.description.toLowerCase().includes(searchTerm.toLowerCase())).sort((a,b) => new Date(b.date) - new Date(a.date));

  const allContributions = [
    ...members.map(m => ({ id: m.id, date: m.paymentDate, source: 'Member', name: m.name, category: m.category, amount: m.amountPaid })),
    ...donations.map(d => ({ id: d.id, date: d.date, source: 'Donation', name: d.donorName, category: d.category, amount: d.amount }))
  ].sort((a,b) => new Date(b.date) - new Date(a.date)).filter(c => c.name?.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '6rem' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 className="section-title">Temple Accounts & Public Ledger</h1>
        <p style={{ textAlign: 'center', marginBottom: '2rem', color: 'var(--clr-text-muted)', fontSize: '1.1rem' }}>
          Transparent tracking of temple funds and community contributions.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${activeTab === 'ledger' ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => { setActiveTab('ledger'); setSearchTerm(''); }}
            style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', borderRadius: '99px' }}
          >
            General Ledger (All Credits & Debits)
          </button>
          <button 
            className={`btn ${activeTab === 'contributions' ? 'btn-primary' : 'btn-outline'}`} 
            onClick={() => { setActiveTab('contributions'); setSearchTerm(''); }}
            style={{ padding: '0.75rem 2rem', fontSize: '1.1rem', borderRadius: '99px' }}
          >
            Mangalya & Family Tracking
          </button>
        </div>

        {activeTab === 'ledger' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
              <StatCard title="Total Credits (General)" value={stats.totalIncome} icon={<TrendingUp size={24} />} color="var(--clr-success)" delay={0.1} />
              <StatCard title="Total Debits (Expenses)" value={stats.totalExpense} icon={<TrendingDown size={24} />} color="var(--clr-danger)" delay={0.2} />
              <StatCard title="Overall Net Balance" value={stats.netBalance} icon={<Wallet size={24} />} color="var(--clr-gold-dark)" delay={0.3} />
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ color: 'var(--clr-maroon)' }}>General Credit & Debit Log</h3>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.75rem', color: 'var(--clr-text-muted)' }} />
                  <input type="text" placeholder="Search entries..." className="form-control" style={{ paddingLeft: '2.5rem', width: '250px' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table">
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}><tr><th>Date</th><th>Description</th><th>Type</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
                  <tbody>
                    {filteredTxns.map((t) => (
                      <tr key={t.id}>
                        <td>{t.date || 'N/A'}</td>
                        <td>{t.description}</td>
                        <td><span style={{ background: t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' }}>{t.type}</span></td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)' }}>
                          {t.type === 'Credit' ? '+' : '-'}{formatCurrency(t.amount)}
                        </td>
                      </tr>
                    ))}
                    {filteredTxns.length === 0 && (<tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No ledger entries found.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'contributions' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <div className="grid grid-cols-3" style={{ marginBottom: '3rem' }}>
              <StatCard title="Makalya Vari Tracked" value={stats.totalMangalya} icon={<TrendingUp size={24} />} color="var(--clr-success)" delay={0.1} />
              <StatCard title="Family Contributions" value={stats.totalFamily} icon={<TrendingUp size={24} />} color="var(--clr-success)" delay={0.2} />
              <StatCard title="General Donations Tracked" value={stats.totalDonationsList} icon={<Wallet size={24} />} color="var(--clr-gold-dark)" delay={0.3} />
            </div>

            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                <h3 style={{ color: 'var(--clr-maroon)' }}>Contributor Tracking List</h3>
                <div style={{ position: 'relative' }}>
                  <Search size={16} style={{ position: 'absolute', top: '50%', transform: 'translateY(-50%)', left: '0.75rem', color: 'var(--clr-text-muted)' }} />
                  <input type="text" placeholder="Search name..." className="form-control" style={{ paddingLeft: '2.5rem', width: '250px' }} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                </div>
              </div>
              <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <table className="table">
                  <thead style={{ position: 'sticky', top: 0, zIndex: 10 }}><tr><th>Date</th><th>Name / Donor</th><th>Category</th><th style={{ textAlign: 'right' }}>Amount Contributed</th></tr></thead>
                  <tbody>
                    {allContributions.map((c) => (
                      <tr key={c.id}>
                        <td>{c.date || 'N/A'}</td>
                        <td style={{ fontWeight: '500' }}>{c.name}</td>
                        <td><span style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>{c.category}</span></td>
                        <td style={{ textAlign: 'right', fontWeight: 'bold', color: 'var(--clr-success)' }}>
                          {formatCurrency(c.amount)}
                        </td>
                      </tr>
                    ))}
                    {allContributions.length === 0 && (<tr><td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No contributors found.</td></tr>)}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Accounts;
