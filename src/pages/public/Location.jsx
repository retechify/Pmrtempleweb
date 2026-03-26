import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

const Location = () => {
  const mapEmbedUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15664.136611311053!2d77.29173005!3d11.03603415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba906a5b6d7c71d%3A0x629555c827364a50!2sPoomalur%2C%20Tamil%20Nadu%20641663!5e0!3m2!1sen!2sin!4v1715830000000!5m2!1sen!2sin";
  const directionsUrl = "https://www.google.com/maps/dir/?api=1&destination=Sri+Sakthi+Makaliyamman+Temple,+Poomalur,+Palladam+Taluk,+Tiruppur+-+641663";

  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '6rem' }}>
      <div className="container">
        <h1 className="section-title">Location & Directions</h1>
        
        <motion.div 
          className="grid grid-cols-2" 
          style={{ gap: '3rem', alignItems: 'center', marginTop: '3rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="card" style={{ padding: '3rem', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-10px', left: '-10px', width: '60px', height: '60px', background: 'var(--clr-gold)', borderRadius: '50%', opacity: '0.2' }} />
            
            <MapPin size={48} color="var(--clr-maroon)" style={{ marginBottom: '1.5rem' }} />
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)' }}>
              Visit the Temple
            </h2>
            <p style={{ fontSize: '1.2rem', color: 'var(--clr-text-main)', marginBottom: '0.5rem', fontWeight: '500' }}>
              Sri Sakthi Makaliyamman Temple
            </p>
            <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-muted)', marginBottom: '2rem', lineHeight: '1.8' }}>
              Makaliyamman Temple Street,
              <br />Poomalur, Palladam Taluk,
              <br />Tiruppur - 641663,
              <br />Tamil Nadu, India.
            </p>
            
            <a 
              href={directionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              style={{ width: '100%', fontSize: '1.1rem', padding: '1rem' }}
            >
              <Navigation size={20} /> Get Directions
            </a>
          </div>

          <div 
            style={{ 
              borderRadius: 'var(--radius-lg)', 
              overflow: 'hidden', 
              boxShadow: 'var(--shadow-md)',
              height: '500px',
              border: '4px solid var(--clr-white)'
            }}
          >
            <iframe 
              src={mapEmbedUrl} 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen="" 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Location;
