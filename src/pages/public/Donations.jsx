import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, CreditCard, HeartHandshake, CheckCircle } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const Donations = () => {
  const { addDonation, donations } = useContext(DataContext);
  const [formData, setFormData] = useState({ name: '', amount: '', category: 'Donation' });
  const [showQR, setShowQR] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFakeRazorpay = (e) => {
    e.preventDefault();
    setProcessing(true);
    
    // Simulate payment delay
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      // Add to context
      addDonation({
        donorName: formData.name,
        amount: Number(formData.amount),
        date: new Date().toISOString().split('T')[0],
        category: formData.category,
      });

      // Reset form
      setTimeout(() => {
        setSuccess(false);
        setFormData({ name: '', amount: '', category: 'Donation' });
      }, 4000);
    }, 2000);
  };

  const isMakalya = (cat) => cat === 'Makalya Contribution' || cat === 'Mangalya Contribution';
  const recentDonations = [...(donations || [])].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 10);

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '6rem' }}>
      <div className="container" style={{ maxWidth: '1000px' }}>
        <h1 className="section-title">Temple Contributions</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--clr-text-muted)', fontSize: '1.1rem' }}>
          Your generous contributions support daily poojas, festivals, and temple development.
        </p>

        <div className="grid grid-cols-2" style={{ gap: '3rem', alignItems: 'flex-start' }}>
          
          {/* Payment Form */}
          <motion.div 
            className="card" 
            style={{ borderTop: '4px solid var(--clr-gold)' }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              Make a Donation
            </h2>

            {success ? (
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                style={{ textAlign: 'center', padding: '3rem 0' }}
              >
                <CheckCircle size={64} color="var(--clr-success)" style={{ margin: '0 auto 1rem' }} />
                <h3 style={{ color: 'var(--clr-success)', marginBottom: '0.5rem' }}>Payment Successful!</h3>
                <p style={{ color: 'var(--clr-text-muted)' }}>Thank you for your devotion and contribution. May Goddess Makaliyamman bless you.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFakeRazorpay}>
                <div className="form-group">
                  <label className="form-label">Donor Name</label>
                  <input 
                    type="text" className="form-control" required placeholder="Enter full name"
                    value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                
                <div className="form-group">
                  <label className="form-label">Contribution Category</label>
                  <select 
                    className="form-control" required
                    value={formData.category} onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    <option value="Donation">General Donation</option>
                    <option value="Makalya Contribution">Makalya Contribution</option>
                    <option value="Family Contribution">Family Contribution</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Amount (₹)</label>
                  <input 
                    type="number" className="form-control" required min="10" placeholder="0"
                    value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: '1rem', fontSize: '1.1rem', position: 'relative' }}
                  disabled={processing}
                >
                  {processing ? 'Processing Secure Payment...' : (
                    <><CreditCard size={20} /> Pay with Razorpay</>
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* QR & Bank Details */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}
          >
            <div className="card" style={{ textAlign: 'center', borderTop: '4px solid var(--clr-maroon)' }}>
              <HeartHandshake size={48} color="var(--clr-maroon)" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1rem', fontFamily: 'var(--font-heading)', fontSize: '1.5rem' }}>
                UPI / QR Code Transfer
              </h3>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>
                Scan the QR code using any UPI app (GPay, PhonePe, Paytm). After payment, you can inform the temple admin.
              </p>
              
              <button 
                onClick={() => setShowQR(!showQR)} 
                className="btn btn-outline" 
                style={{ width: '100%', justifyContent: 'center' }}
              >
                <QrCode size={18} /> {showQR ? 'Hide QR Code' : 'Show UPI QR Code'}
              </button>

              <AnimatePresence>
                {showQR && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }} 
                    animate={{ height: 'auto', opacity: 1 }} 
                    exit={{ height: 0, opacity: 0 }}
                    style={{ overflow: 'hidden', marginTop: '1.5rem' }}
                  >
                    <div style={{ padding: '1.5rem', background: 'var(--clr-surface)', borderRadius: 'var(--radius-md)', border: '1px solid #eee' }}>
                      <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
                        alt="UPI QR Code" 
                        style={{ width: '180px', height: '180px', margin: '0 auto', opacity: 0.8 }} 
                      />
                      <p style={{ marginTop: '1rem', fontWeight: 'bold', color: 'var(--clr-text-main)' }}>UPI ID: makaliyamman@okaxis</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="card" style={{ background: 'var(--clr-surface)' }}>
              <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
                Direct Bank Transfer
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--clr-text-muted)' }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #ccc', paddingBottom: '0.5rem' }}>
                  <strong>Account Name:</strong> <span>Sri Sakthi Makaliyamman Trust</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #ccc', paddingBottom: '0.5rem' }}>
                  <strong>Bank:</strong> <span>State Bank of India</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px dashed #ccc', paddingBottom: '0.5rem' }}>
                  <strong>Account No:</strong> <span>1234 5678 9012</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: '0.5rem' }}>
                  <strong>IFSC Code:</strong> <span>SBIN0001234</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>

        {/* Live Contribution List */}
        <motion.div 
          className="card" 
          style={{ marginTop: '4rem', borderTop: '4px solid var(--clr-gold)' }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', textAlign: 'center' }}>
            Recent Divine Contributions
          </h2>
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>Donor Name</th>
                  <th>Category</th>
                  <th>Contribution (₹)</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((d, i) => (
                  <tr key={i}>
                    <td style={{ fontWeight: '600' }}>{d.donorName}</td>
                    <td>
                      <span style={{ 
                        background: isMakalya(d.category) ? 'var(--clr-gold-light)' : '#f3f4f6', 
                        display: 'inline-block', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 'bold'
                      }}>
                        {d.category}
                      </span>
                    </td>
                    <td style={{ fontWeight: 'bold' }}>₹{d.amount?.toLocaleString()}</td>
                    <td style={{ color: 'var(--clr-text-muted)', fontSize: '0.85rem' }}>{d.date}</td>
                  </tr>
                ))}
                {recentDonations.length === 0 && (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: '#ccc', padding: '2rem' }}>No recent contributions recorded yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
;

export default Donations;
