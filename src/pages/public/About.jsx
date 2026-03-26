import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '6rem', position: 'relative', overflow: 'hidden' }}>
      {/* Traditional God Weapons Background - Left & Right */}
      <div style={{ position: 'absolute', top: 0, left: '-5%', width: '60%', height: '100%', backgroundImage: 'url("/watermark.png")', backgroundSize: '600px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.6, zIndex: 0, mixBlendMode: 'multiply' }}></div>
      <div style={{ position: 'absolute', top: 0, right: '-5%', width: '60%', height: '100%', backgroundImage: 'url("/watermark.png")', backgroundSize: '600px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.6, zIndex: 0, mixBlendMode: 'multiply', transform: 'scaleX(-1)' }}></div>
      
      <div className="container" style={{ maxWidth: '900px', position: 'relative', zIndex: 10 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="section-title">About the Temple</h1>
          
          <div className="card" style={{ padding: '3rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', background: 'radial-gradient(var(--clr-gold-light), transparent)', opacity: '0.1', borderRadius: '50%' }} />
            
            <h2 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem', fontFamily: 'var(--font-heading)', fontSize: '2rem' }}>History & Significance</h2>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              The Sri Sakthi Makaliyamman Temple, nestled in the serene town of Poomalur in Palladam Taluk, serves as a beacon of spirituality and cultural heritage for devotees from all walks of life. Renowned for its powerful deity, Goddess Makaliyamman, the temple stands as a testament to the region's enduring faith and traditions.
            </p>
            
            <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-muted)', marginBottom: '1.5rem', lineHeight: '1.8' }}>
              For generations, the temple has been a vital center for community gatherings, religious festivals, and spiritual solace. The architecture and ambiance of the temple reflect traditional Dravidian styles, adorned with vibrant artwork and intricate sculptures that depict various mythological tales.
            </p>

            <div style={{ background: 'var(--clr-surface)', borderLeft: '4px solid var(--clr-gold)', padding: '1.5rem', marginTop: '2rem', borderRadius: '0 var(--radius-md) var(--radius-md) 0' }}>
              <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '0.5rem' }}>Our Mission</h3>
              <p style={{ color: 'var(--clr-text-main)', fontStyle: 'italic' }}>
                "To uphold the sacred traditions, foster a deeply connected community, and provide a sanctuary for spiritual awakening and peace."
              </p>
            </div>
            
            <div style={{ marginTop: '3rem' }}>
              <h3 style={{ color: 'var(--clr-maroon)', marginBottom: '1.5rem' }}>Temple Timings</h3>
              <ul style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <li style={{ background: 'var(--clr-off-white)', padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }}>
                  <strong style={{ display: 'block', color: 'var(--clr-text-main)' }}>Morning Darshan</strong>
                  <span style={{ color: 'var(--clr-text-muted)' }}>06:00 AM - 12:00 PM</span>
                </li>
                <li style={{ background: 'var(--clr-off-white)', padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }}>
                  <strong style={{ display: 'block', color: 'var(--clr-text-main)' }}>Evening Darshan</strong>
                  <span style={{ color: 'var(--clr-text-muted)' }}>04:00 PM - 09:00 PM</span>
                </li>
                <li style={{ background: 'var(--clr-off-white)', padding: '1rem', borderRadius: '8px', border: '1px solid #eee' }}>
                  <strong style={{ display: 'block', color: 'var(--clr-text-main)' }}>Special Poojas</strong>
                  <span style={{ color: 'var(--clr-text-muted)' }}>Tuesdays & Fridays</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
