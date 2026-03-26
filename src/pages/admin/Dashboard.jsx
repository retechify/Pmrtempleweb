import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const Dashboard = () => {
  const { stats, transactions } = useContext(DataContext);

  const allTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  const formatCurrency = (amount) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(amount);

  const StatCard = ({ title, value, icon, color, delay }) => (
    <motion.div 
      className="card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', borderLeft: `4px solid ${color}` }}
    >
      <div style={{ background: `${color}15`, color, padding: '1rem', borderRadius: '50%' }}>
        {icon}
      </div>
      <div>
        <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem', fontWeight: '500', marginBottom: '0.25rem' }}>{title}</p>
        <h3 style={{ fontSize: '1.5rem', color: 'var(--clr-text-main)' }}>{formatCurrency(value)}</h3>
      </div>
    </motion.div>
  );

  return (
    <div>
      <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem', marginBottom: '2rem' }}>
        Smart Accounting Dashboard
      </h1>

      <div className="grid grid-cols-4" style={{ marginBottom: '3rem' }}>
        <StatCard title="Makalya Vari (Income)" value={stats.totalMangalya} icon={<TrendingUp size={24} />} color="var(--clr-success)" delay={0.1} />
        <StatCard title="Donations (Income)" value={stats.totalDonationsList + stats.totalFamily} icon={<TrendingUp size={24} />} color="var(--clr-success)" delay={0.2} />
        <StatCard title="Total Expenses" value={stats.totalExpense} icon={<TrendingDown size={24} />} color="var(--clr-danger)" delay={0.3} />
        <StatCard title="Net Balance" value={stats.netBalance} icon={<Wallet size={24} />} color="var(--clr-gold-dark)" delay={0.4} />
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem' }}>Income Breakdown</h3>
          <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #eee' }}>
              <span style={{ color: 'var(--clr-text-muted)' }}>Mangalya Contribution</span>
              <strong style={{ color: 'var(--clr-text-main)' }}>{formatCurrency(stats.totalMangalya)}</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.75rem', borderBottom: '1px solid #eee' }}>
              <span style={{ color: 'var(--clr-text-muted)' }}>Family Contribution</span>
              <strong style={{ color: 'var(--clr-text-main)' }}>{formatCurrency(stats.totalFamily)}</strong>
            </li>
            <li style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: 'var(--clr-text-muted)' }}>General Donations</span>
              <strong style={{ color: 'var(--clr-text-main)' }}>{formatCurrency(stats.totalDonationsList)}</strong>
            </li>
          </ul>
        </motion.div>

        <motion.div className="card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '22px' }} />
            Cloud Synchronization
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>
            Securely link your Google Account to automatically backup temple accounts and gallery data to your personal cloud drive.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              className="btn btn-primary" 
              style={{ width: '100%', background: '#4285F4', borderColor: '#4285F4' }}
              onClick={() => alert("Connecting to Google Cloud Services...")}
            >
              Link Google Account for Backup
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem', background: 'var(--clr-surface)', borderRadius: '8px', border: '1px dashed var(--clr-gold)' }}>
              <div style={{ width: '8px', height: '8px', background: 'var(--clr-danger)', borderRadius: '50%' }}></div>
              <span style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>Status: Not Connected</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem' }}>Administrative Tools</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-outline" style={{ flex: '1 1 45%' }} onClick={() => window.print()}>
              Export PDF Report
            </button>
            <button className="btn btn-primary" style={{ flex: '1 1 45%' }} onClick={() => window.print()}>
              Print Statement
            </button>
          </div>
        </motion.div>
      </div>

      <motion.div className="card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem' }}>Recent Transactions</h3>
        
        {allTransactions.length > 0 ? (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Type</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {allTransactions.slice(0, 10).map((t, i) => (
                  <tr key={i}>
                    <td>{t.date || 'N/A'}</td>
                    <td>{t.description}</td>
                    <td>
                      <span style={{ 
                        background: t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)', 
                        color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem' 
                      }}>
                        {t.type}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 'bold', color: t.type === 'Credit' ? 'var(--clr-success)' : 'var(--clr-danger)' }}>
                      {t.type === 'Credit' ? '+' : '-'}{formatCurrency(t.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p style={{ color: 'var(--clr-text-muted)', textAlign: 'center', padding: '2rem 0' }}>No transactions recorded yet.</p>
        )}
      </motion.div>
    </div>
  );
};

export default Dashboard;
