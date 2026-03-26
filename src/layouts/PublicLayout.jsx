import React, { useState } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Menu, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PublicLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isAdmin = localStorage.getItem('temple_admin_auth') === 'true';

  const links = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Accounts', path: '/accounts' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Donations', path: '/donations' },
    { name: 'Videos', path: '/videos' },
    { name: 'Location', path: '/location' },
    { name: 'Contact', path: '/contact' },
    { name: isAdmin ? 'Admin Console' : 'Admin Login', path: '/admin' },
  ];

  const closeMenu = () => setIsOpen(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header className="glass" style={{ position: 'sticky', top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '80px' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', textDecoration: 'none' }} onClick={closeMenu}>
            <div style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, var(--clr-maroon), var(--clr-maroon-dark))', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 12px rgba(128,0,0,0.3)', flexShrink: 0 }}>
              <span style={{ color: 'var(--clr-gold)', fontSize: '1.3rem', fontWeight: 'bold', fontFamily: "var(--font-heading)" }}>S</span>
            </div>
            <span style={{ fontFamily: "var(--font-heading)", color: 'var(--clr-maroon)', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.5px', lineHeight: '1.2', whiteSpace: 'nowrap' }}>
              Sri Sakthi Makaliyamman
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'none', gap: '0.75rem' }} className="nav-desktop">
            {links.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                className="nav-link-animated"
                style={{
                  fontWeight: '600',
                  fontSize: '1.1rem',
                  color: location.pathname === link.path ? 'var(--clr-maroon)' : 'var(--clr-text-main)',
                  padding: '0.5rem 1rem',
                  position: 'relative',
                  transition: 'color 0.3s ease'
                }}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/donations" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', marginLeft: '1rem', fontSize: '1.1rem' }}>
              Donate Now <Heart size={18} />
            </Link>
          </nav>

          {/* Mobile Nav Toggle */}
          <button 
            style={{ display: 'block', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--clr-maroon)' }}
            className="nav-mobile-toggle"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'var(--clr-white)', borderBottom: '1px solid #eee' }}
            className="mobile-menu"
          >
            <nav style={{ display: 'flex', flexDirection: 'column', padding: '1.5rem', gap: '1rem' }}>
              {links.map((link) => (
                <Link 
                  key={link.name} 
                  to={link.path}
                  style={{
                    fontWeight: '500',
                    fontSize: '1.1rem',
                    color: location.pathname === link.path ? 'var(--clr-maroon)' : 'var(--clr-text-main)',
                  }}
                  onClick={closeMenu}
                >
                  {link.name}
                </Link>
              ))}
              <Link to="/donations" className="btn btn-primary" style={{ marginTop: '1rem', width: '100%' }} onClick={closeMenu}>
                Donate Now <Heart size={16} />
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) {
          .nav-desktop { display: flex !important; align-items: center; }
          .nav-mobile-toggle { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ background: 'var(--clr-maroon-dark)', color: 'var(--clr-off-white)', padding: '4rem 0 2rem' }}>
        <div className="container grid grid-cols-3">
          <div>
            <h3 style={{ color: 'var(--clr-gold)', marginBottom: '1rem' }}>Sri Sakthi Makaliyamman</h3>
            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.9rem' }}>
              Makaliyamman Temple Street, Poomalur,<br />
              Palladam Taluk, Tiruppur - 641663,<br />
              Tamil Nadu, India.
            </p>
          </div>
          <div>
            <h3 style={{ color: 'var(--clr-gold)', marginBottom: '1rem' }}>Quick Links</h3>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {links.slice(0, 4).map(link => (
                <li key={link.name}>
                  <Link to={link.path} style={{ color: 'rgba(255,255,255,0.8)' }}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 style={{ color: 'var(--clr-gold)', marginBottom: '1rem' }}>Admin Access</h3>
            <Link to="/admin" style={{ color: 'rgba(255,255,255,0.8)', textDecoration: 'underline' }}>Admin Portal Login</Link>
          </div>
        </div>
        <div className="container" style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>
          &copy; {new Date().getFullYear()} Sri Sakthi Makaliyamman Temple. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
