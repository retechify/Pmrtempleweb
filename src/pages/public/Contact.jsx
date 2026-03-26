import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('Message sent successfully! Om Sairam.');
    e.target.reset();
    setTimeout(() => setStatus(''), 3000);
  };

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '6rem' }}>
      <div className="container">
        <h1 className="section-title">Contact Us</h1>
        
        <div className="grid grid-cols-2" style={{ gap: '4rem', marginTop: '3rem' }}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              Get in Touch
            </h2>
            <p style={{ color: 'var(--clr-text-muted)', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
              We welcome your queries, suggestions, and devotions. Reach out to us for pooja bookings, special events or donations.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--clr-surface)', padding: '1rem', borderRadius: '50%', color: 'var(--clr-maroon)' }}>
                  <MapPin size={24} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--clr-text-main)', marginBottom: '0.5rem' }}>Temple Address</h3>
                  <p style={{ color: 'var(--clr-text-muted)' }}>
                    Sri Sakthi Makaliyamman Temple,<br/>
                    Makaliyamman Temple Street,<br/>
                    Poomalur, Palladam Taluk,<br/>
                    Tiruppur - 641663, Tamil Nadu
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--clr-surface)', padding: '1rem', borderRadius: '50%', color: 'var(--clr-maroon)' }}>
                  <Phone size={24} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--clr-text-main)', marginBottom: '0.5rem' }}>Phone</h3>
                  <p style={{ color: 'var(--clr-text-muted)' }}>+91 98765 43210</p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'flex-start' }}>
                <div style={{ background: 'var(--clr-surface)', padding: '1rem', borderRadius: '50%', color: 'var(--clr-maroon)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <h3 style={{ color: 'var(--clr-text-main)', marginBottom: '0.5rem' }}>Email</h3>
                  <p style={{ color: 'var(--clr-text-muted)' }}>makaliyamman.temple24@gmail.com</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="card"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ borderTop: '4px solid var(--clr-gold)' }}
          >
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '2rem', fontFamily: 'var(--font-heading)' }}>
              Send a Message
            </h2>

            {status && (
              <div style={{ padding: '1rem', background: 'var(--clr-success)', color: 'white', borderRadius: '4px', marginBottom: '1.5rem', textAlign: 'center' }}>
                {status}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-control" placeholder="Enter your name" required />
              </div>
              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input type="tel" className="form-control" placeholder="Enter your mobile number" required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea className="form-control" rows="5" placeholder="How can we help you?" required></textarea>
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                <Send size={18} /> Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
