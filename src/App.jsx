import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/public/Home';
import About from './pages/public/About';
import Gallery from './pages/public/Gallery';
import Location from './pages/public/Location';
import Donations from './pages/public/Donations';
import Videos from './pages/public/Videos';
import Contact from './pages/public/Contact';
import Accounts from './pages/public/Accounts';

// Admin Pages
import LoginAdmin from './pages/admin/LoginAdmin';
import Dashboard from './pages/admin/Dashboard';
import MembersAdmin from './pages/admin/MembersAdmin';
import DonationsAdmin from './pages/admin/DonationsAdmin';
import LedgerAdmin from './pages/admin/LedgerAdmin';

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('temple_admin_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="location" element={<Location />} />
          <Route path="donations" element={<Donations />} />
          <Route path="videos" element={<Videos />} />
          <Route path="contact" element={<Contact />} />
        </Route>

        {/* Admin Login */}
        <Route path="/admin/login" element={<LoginAdmin />} />

        {/* Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="members" element={<MembersAdmin />} />
          <Route path="donations" element={<DonationsAdmin />} />
          <Route path="ledger" element={<LedgerAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
