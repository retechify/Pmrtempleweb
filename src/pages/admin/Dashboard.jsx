import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import { Wallet, TrendingUp, TrendingDown, DollarSign, Check } from 'lucide-react';
import { DataContext } from '../../context/DataContext';
import { syncDataToCloud } from '../../firebase/db';

const Dashboard = () => {
  const { stats, transactions, members, donations, archives, archiveYear } = useContext(DataContext);

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

  const [syncStatus, setSyncStatus] = useState('idle'); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState('');
  const [lastSync, setLastSync] = useState(null);

  const handleSync = async () => {
    setSyncStatus('loading');
    setErrorMessage('');
    try {
      await syncDataToCloud({ members, donations, transactions });
      setSyncStatus('success');
      setLastSync(new Date());
      setTimeout(() => setSyncStatus('idle'), 3000);
    } catch (error) {
       console.error("Sync caught error:", error);
       setSyncStatus('error');
       // Clean up error message for the user
       const msg = error.message.includes("permission-denied") 
         ? "Google Cloud Permission Denied: You need to set your Firestore Rules to 'allow read, write: if true;' in the console."
         : error.message;
       setErrorMessage(msg);
       setTimeout(() => setSyncStatus('idle'), 5000); // Reset after 5s
    }
  }

  const googleUser = JSON.parse(localStorage.getItem('temple_admin_user') || 'null');

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '2rem', margin: 0 }}>
          Smart Accounting Dashboard
        </h1>
        {googleUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.5rem 1rem', background: 'white', borderRadius: '30px', border: '1px solid #eee' }}>
             <img src={googleUser.photo} alt="User" style={{ width: '32px', height: '32px', borderRadius: '50%' }} />
             <div>
               <p style={{ margin: 0, fontSize: '0.85rem', fontWeight: 'bold' }}>{googleUser.name}</p>
               <p style={{ margin: 0, fontSize: '0.7rem', color: 'var(--clr-text-muted)' }}>Admin Account</p>
             </div>
          </div>
        )}
      </div>

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
            <img src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" alt="Google" style={{ width: '24px' }} />
            Cloud Database Sync
          </h3>
          <p style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>
            Connect your secure **Google Cloud Database** to store all temple accounts, donor lists, and gallery settings in the cloud for real-time safety.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <button 
              className={`btn ${syncStatus === 'success' ? 'btn-success' : 'btn-primary'}`} 
              disabled={syncStatus === 'loading'}
              style={{ 
                width: '100%', 
                background: syncStatus === 'success' ? '#22c55e' : (syncStatus === 'error' ? 'var(--clr-danger)' : '#4285F4'), 
                borderColor: syncStatus === 'success' ? '#22c55e' : (syncStatus === 'error' ? 'var(--clr-danger)' : '#4285F4'), 
                fontWeight: 'bold',
                color: 'white',
                transition: 'all 0.3s ease'
              }}
              onClick={handleSync}
            >
              {syncStatus === 'loading' ? "⚡ Connecting to Google Cloud..." : 
               syncStatus === 'success' ? "✔️ Sync Successful!" : 
               syncStatus === 'error' ? "❌ Sync Failed" : "Sync with Google Database"}
            </button>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', padding: '0.75rem', background: syncStatus === 'error' ? '#fef2f2' : '#f0fdf4', borderRadius: '8px', border: syncStatus === 'error' ? '1px solid #fecaca' : '1px solid #bcf0da' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{ width: '8px', height: '8px', background: syncStatus === 'loading' ? 'var(--clr-gold)' : (syncStatus === 'error' ? 'var(--clr-danger)' : '#22c55e'), borderRadius: '50%', animation: syncStatus === 'loading' ? 'pulse 1s infinite' : 'none' }}></div>
                <span style={{ fontSize: '0.85rem', color: syncStatus === 'error' ? 'var(--clr-danger)' : '#166534', fontWeight: '700' }}>
                  Status: {syncStatus === 'loading' ? 'Establishing Handshake...' : (syncStatus === 'error' ? 'Connection Blocked' : 'Live Cloud Sync Active')}
                </span>
              </div>
              {lastSync && syncStatus !== 'error' ? (
                <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', marginLeft: '1.25rem' }}>
                  Last synced: {lastSync.toLocaleTimeString()}
                </span>
              ) : syncStatus === 'error' && (
                <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)', marginLeft: '1.25rem' }}>
                  Check Google Console Rules
                </span>
              )}
            </div>
            {errorMessage && (
              <div style={{ padding: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', color: 'var(--clr-danger)', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                <strong>Issue Detected:</strong> {errorMessage}
              </div>
            )}
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-2" style={{ gap: '2rem', marginBottom: '3rem' }}>
        <motion.div className="card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem' }}>Administrative Tools</h3>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            <button className="btn btn-outline" style={{ flex: '1 1 45%' }} onClick={() => window.print()}>
              Export PDF Report
            </button>
            <button 
              className="btn" 
              style={{ flex: '1 1 45%', background: 'var(--clr-maroon)', color: 'white' }} 
              onClick={() => {
                const year = prompt("Enter Year to Archive (e.g. 2025):");
                if(year && window.confirm(`Are you sure you want to CLOSE ${year}? This will reset current ledger to start ${Number(year)+1}.`)) {
                  archiveYear(year);
                  setSyncStatus('success');
                  setTimeout(() => setSyncStatus('idle'), 3000);
                }
              }}
            >
              Final Yearly Closure
            </button>
          </div>
          
          {syncStatus === 'success' && (
            <motion.div 
              initial={{ scale: 0 }} 
              animate={{ scale: 1 }} 
              style={{ color: '#22c55e', display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.5rem', fontWeight: 'bold', background: '#f0fdf4', padding: '1rem', borderRadius: '12px', border: '1px solid #bcf0da' }}
            >
              <div style={{ background: '#22c55e', color: 'white', borderRadius: '50%', padding: '4px', display: 'flex' }}>
                <Check size={20} />
              </div>
              Year Data Closed & Archived Successfully! ✓
            </motion.div>
          )}
          
          <div>
            <h4 style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)', marginBottom: '0.75rem' }}>Saved Historical Archives</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
              {(archives || []).map((arch, idx) => (
                <motion.div 
                  key={idx} 
                  whileHover={{ y: -5 }}
                  style={{ 
                    padding: '1rem', 
                    background: 'white', 
                    border: '1px solid #e5e7eb', 
                    borderRadius: '12px', 
                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                    cursor: 'pointer',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem'
                  }}
                  onClick={() => alert(`Viewing archived data for ${arch.year}. Features Total Income: ${formatCurrency(arch.stats?.totalIncome || 0)}`)}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 'bold', color: 'var(--clr-maroon)', fontSize: '1.1rem' }}>{arch.year}</span>
                    <TrendingUp size={16} color="var(--clr-success)" />
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--clr-text-muted)' }}>Archived: {arch.date}</span>
                  <button className="btn btn-outline" style={{ padding: '0.25rem', fontSize: '0.7rem', marginTop: '0.5rem' }}>View Full Records</button>
                </motion.div>
              ))}
              {(archives || []).length === 0 && <p style={{ fontSize: '0.8rem', color: '#ccc' }}>No yearly archives yet.</p>}
            </div>
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
