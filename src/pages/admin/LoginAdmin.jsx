import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'Pmrtemple' && credentials.password === 'Temple@123') {
      localStorage.setItem('temple_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password');
    }
  };

  const handleGoogleAuth = () => {
    setIsGoogleLoading(true);
    // Realistic simulation of a Google Auth flow
    setTimeout(() => {
      localStorage.setItem('temple_admin_auth', 'true');
      navigate('/admin/dashboard');
    }, 1500);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--clr-off-white)' }}>
      <motion.div 
        className="card"
        style={{ width: '100%', maxWidth: '400px', padding: '3rem 2rem', borderTop: '4px solid var(--clr-maroon)' }}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ width: '60px', height: '60px', background: 'var(--clr-surface)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--clr-maroon)' }}>
            <Lock size={32} />
          </div>
          <h1 style={{ fontFamily: 'var(--font-heading)', color: 'var(--clr-maroon)', fontSize: '1.75rem', marginBottom: '0.5rem' }}>
            Temple Admin Login
          </h1>
          <p style={{ color: 'var(--clr-text-muted)', fontSize: '0.9rem' }}>Secure Portal Access</p>
        </div>

        {error && (
          <div style={{ background: '#fee2e2', color: 'var(--clr-danger)', padding: '0.75rem', borderRadius: '4px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div className="form-group" style={{ marginBottom: '1rem' }}>
            <label className="form-label" style={{ fontSize: '0.9rem' }}>Username</label>
            <input 
              type="text" className="form-control" required placeholder="Enter Username"
              value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label" style={{ fontSize: '0.9rem' }}>Password</label>
            <input 
              type="password" className="form-control" required placeholder="Enter Password"
              value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <LogIn size={18} /> Login
          </button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0', gap: '0.5rem' }}>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
          <span style={{ fontSize: '0.85rem', color: 'var(--clr-text-muted)' }}>OR</span>
          <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }}></div>
        </div>

        <button 
          onClick={handleGoogleAuth} 
          className="btn btn-outline" 
          disabled={isGoogleLoading}
          style={{ width: '100%', borderColor: '#e2e8f0', color: 'var(--clr-text-main)' }}
        >
          {isGoogleLoading ? (
            <span style={{ fontSize: '0.9rem', color: 'var(--clr-text-muted)' }}>Signing in with Google...</span>
          ) : (
            <>
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" style={{ width: '18px', height: '18px', marginRight: '0.5rem' }} />
              Continue with Google
            </>
          )}
        </button>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;
