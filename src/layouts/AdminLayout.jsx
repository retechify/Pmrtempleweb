import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, BookOpen, LogOut, Menu, X } from 'lucide-react';

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('temple_admin_auth');
    navigate('/admin/login');
  };

  const menuItems = [
    { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard size={20} /> },
    { name: 'Members', path: '/admin/members', icon: <Users size={20} /> },
    { name: 'Donations', path: '/admin/donations', icon: <CreditCard size={20} /> },
    { name: 'General Ledger', path: '/admin/ledger', icon: <BookOpen size={20} /> },
  ];

  return (
    <div style={{ display: 'flex', height: '100vh', background: 'var(--clr-off-white)' }}>
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div 
          style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 40 }}
          onClick={() => setSidebarOpen(false)}
          className="sidebar-overlay"
        />
      )}

      {/* Sidebar */}
      <aside 
        style={{
          width: '260px',
          background: 'var(--clr-white)',
          borderRight: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          position: 'fixed',
          height: '100%',
          zIndex: 50,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease'
        }}
        className="admin-sidebar"
      >
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.25rem', color: 'var(--clr-maroon)', fontFamily: 'var(--font-heading)' }}>
            Temple Admin
          </h2>
          <button 
            style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'block' }}
            className="mobile-close-btn"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={24} color="var(--clr-text-main)" />
          </button>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {menuItems.map(item => (
            <NavLink
              key={item.name}
              to={item.path}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                color: isActive ? 'var(--clr-white)' : 'var(--clr-text-muted)',
                background: isActive ? 'var(--clr-maroon)' : 'transparent',
                fontWeight: isActive ? '600' : '500',
                transition: 'all 0.2s ease',
                textDecoration: 'none'
              })}
              onClick={() => setSidebarOpen(false)}
            >
              {item.icon}
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div style={{ padding: '1.5rem 1rem', borderTop: '1px solid #e2e8f0' }}>
          <button 
            onClick={handleLogout}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.75rem 1rem',
              width: '100%',
              background: 'transparent',
              border: 'none',
              color: 'var(--clr-danger)',
              fontWeight: '600',
              cursor: 'pointer',
              borderRadius: '8px',
              transition: 'background 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = '#fee2e2'}
            onMouseOut={(e) => e.target.style.background = 'transparent'}
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main">
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <button 
            className="mobile-menu-btn"
            style={{ background: 'var(--clr-white)', border: '1px solid #e2e8f0', padding: '0.5rem', borderRadius: '8px', cursor: 'pointer' }}
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={24} color="var(--clr-text-main)" />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: '40px', height: '40px', background: 'var(--clr-gold)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: 'var(--clr-white)' }}>
              A
            </div>
            <div>
              <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>Admin User</p>
              <p style={{ fontSize: '0.8rem', color: 'var(--clr-text-muted)' }}>Administrator</p>
            </div>
          </div>
        </header>

        <div className="admin-content-wrapper">
          <Outlet />
        </div>
      </main>

      <style>{`
        .admin-main {
          flex: 1;
          padding: 2rem;
          margin-left: 260px;
          overflow-y: auto;
          width: calc(100vw - 260px);
        }

        @media (max-width: 1023px) {
          .admin-main {
            margin-left: 0;
            width: 100vw;
          }
        }

        @media (min-width: 1024px) {
          .admin-sidebar { transform: translateX(0) !important; }
          .mobile-menu-btn { display: none !important; }
          .mobile-close-btn { display: none !important; }
          .sidebar-overlay { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
