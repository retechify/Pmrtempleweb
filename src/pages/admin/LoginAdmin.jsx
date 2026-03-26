import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';

const LoginAdmin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // Case-insensitive username check for better mobile experience
    const isValidUser = credentials.username.trim().toLowerCase() === 'poomalur';
    const isValidPass = credentials.password === 'Admin@123';

    if (isValidUser && isValidPass) {
      localStorage.setItem('temple_admin_auth', 'true');
      navigate('/admin/dashboard');
    } else {
      setError('Invalid username or password. Please check for correct capitals.');
    }
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
              type="text" className="form-control" required placeholder="Enter Username (e.g. Poomalur)"
              value={credentials.username} onChange={(e) => setCredentials({...credentials, username: e.target.value})}
            />
          </div>
          <div className="form-group" style={{ marginBottom: '1.5rem', position: 'relative' }}>
            <label className="form-label" style={{ fontSize: '0.9rem' }}>Password</label>
            <input 
              type={showPassword ? "text" : "password"} className="form-control" required placeholder="Enter Password"
              value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{ position: 'absolute', right: '10px', bottom: '10px', background: 'none', border: 'none', color: 'var(--clr-maroon)', cursor: 'pointer', fontSize: '0.8rem' }}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '52px', fontSize: '1.1rem', marginBottom: '1.5rem' }}>
            <LogIn size={20} /> Login to Console
          </button>

          <div style={{ textAlign: 'center', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: 0, right: 0, height: '1px', background: '#eee', zIndex: 0 }}></div>
            <span style={{ position: 'relative', background: 'white', padding: '0 1rem', color: '#999', fontSize: '0.8rem', zIndex: 1 }}>OR</span>
          </div>

          <button 
            type="button"
            onClick={() => alert("Google connectivity is active! Use the password portal first, then link your account in the Dashboard.")}
            style={{ 
              width: '100%', marginTop: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', 
              padding: '0.75rem', borderRadius: '8px', border: '1px solid #ddd', background: 'white', cursor: 'pointer',
              color: 'var(--clr-text-main)', fontSize: '0.9rem', fontWeight: '500'
            }}
          >
            <img src="https://www.gstatic.com/images/branding/product/2x/googleg_48dp.png" alt="Google" style={{ width: '18px' }} />
            Sign in with Google Account
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginAdmin;
