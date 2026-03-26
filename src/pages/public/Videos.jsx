import React from 'react';
import { motion } from 'framer-motion';

const videos = [
  { id: "dqLSH60PNP4", title: "Temple Previous Year Full Event" },
  { id: "i3mBChim2sg", title: "Divine Amman Darsham - Event Clip 1" },
  { id: "lNqS_N65ckQ", title: "Temple Rituals - Devotional Short" },
  { id: "tna5781FA0A", title: "Temple Celebration Short - Amman Darshan" },
  { id: "2ErxCNZW91M", title: "Amman Devotional Short - Special Rituals" },
  { id: "p6GGef1Cr4g", title: "Temple Festival Highlights Short" },
];

const Videos = () => {
  return (
    <div className="section" style={{ minHeight: '80vh', paddingTop: '6rem' }}>
      <div className="container">
        <h1 className="section-title">Temple Media</h1>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1rem', fontSize: '1.1rem' }}>
            Watch our special poojas, events, and devotional performances directly from our official YouTube Channel.
          </p>
          <a 
            href="https://www.youtube.com/@poomalur_temple" 
            target="_blank" rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ display: 'inline-flex', padding: '0.5rem 1.5rem', borderRadius: '99px' }}
          >
            Subscribe to POOMALUR FUNCTIONS
          </a>
        </div>

        {/* Featured Video - Spanning two clips width */}
        <motion.div 
          style={{ maxWidth: '1000px', margin: '0 auto 5rem' }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="card" style={{ padding: '1rem', borderRadius: '32px', background: 'var(--clr-white)', boxShadow: 'var(--shadow-lg)', overflow: 'hidden' }}>
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '24px', overflow: 'hidden', background: '#000' }}>
              <iframe 
                src={`https://www.youtube.com/embed/${videos[0].id}`}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={videos[0].title}
              ></iframe>
            </div>
            <h2 style={{ marginTop: '2rem', color: 'var(--clr-maroon)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', textAlign: 'center', fontWeight: '900', fontFamily: 'var(--font-heading)', letterSpacing: '-0.5px' }}>
              Featured: {videos[0].title}
            </h2>
          </div>
        </motion.div>

        {/* 2x2 Grid for other clips */}
        <motion.div 
          style={{ 
            maxWidth: '1200px', 
            margin: '0 auto', 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '4rem' 
          }}
          initial="hidden" animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
          }}
        >
          {videos.slice(1, 5).map((vid, idx) => (
            <motion.div 
              key={idx}
              className="card"
              style={{ padding: '0.8rem', borderRadius: '24px', background: 'var(--clr-white)', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
              }}
              whileHover={{ y: -10, boxShadow: 'var(--shadow-lg)' }}
            >
              <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '16px', overflow: 'hidden', background: '#000' }}>
                <iframe 
                  src={`https://www.youtube.com/embed/${vid.id}`}
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={vid.title}
                ></iframe>
              </div>
              <h3 style={{ marginTop: '1.5rem', color: 'var(--clr-maroon)', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', textAlign: 'center', fontWeight: '800', fontFamily: 'var(--font-heading)', lineHeight: '1.3' }}>
                {vid.title}
              </h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Videos;
