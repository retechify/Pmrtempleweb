import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const images = [
  { src: '/gallery/pic1.jpg?v=1', title: 'Annadanam Program', category: 'Events' },
  { src: '/gallery/pic2.jpg?v=1', title: 'Goddess Makaliyamman Darshan', category: 'Rituals' },
  { src: '/gallery/pic3.jpg?v=1', title: 'Mulaipari Decorations', category: 'Culture' },
  { src: '/gallery/pic4.jpg?v=1', title: 'Temple Night Rituals', category: 'Events' },
  { src: '/gallery/pic5.jpg?v=1', title: 'Divine Amman Alankaram', category: 'Rituals' },
  { src: '/gallery/pic6.jpg?v=1', title: 'Temple Committee Meeting', category: 'Community' },
  { src: '/gallery/pic7.jpg?v=1', title: 'Divine Offerings', category: 'Rituals' },
  { src: '/gallery/pic8.jpg?v=1', title: 'Inner Sanctum Darshan', category: 'Rituals' },
  { src: '/gallery/pic9.jpg?v=1', title: 'Street Procession', category: 'Culture' },
  { src: '/gallery/pic10.jpg?v=1', title: 'Festival LED Lights', category: 'Events' },
  { src: '/gallery/pic11.jpg?v=1', title: 'Devotees in Celebration', category: 'Community' },
];

const Gallery = () => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (idx) => {
    setCurrentIndex(idx);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="section" style={{ paddingTop: '6rem' }}>
      <div className="container">
        <h1 className="section-title">Temple Gallery</h1>
        <p style={{ textAlign: 'center', marginBottom: '3rem', color: 'var(--clr-text-muted)' }}>
          Glimpses of divine poojas, architecture, and festivals.
        </p>

        <motion.div 
          className="grid"
          style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
          }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={idx}
              variants={{
                hidden: { opacity: 0, scale: 0.9 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              style={{
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '4/5',
                cursor: 'pointer',
                boxShadow: 'var(--shadow-md)',
                position: 'relative',
                background: 'var(--clr-surface)'
              }}
              onClick={() => openLightbox(idx)}
              whileHover={{ y: -8, boxShadow: 'var(--shadow-lg)' }}
            >
              <img 
                src={img.src} 
                alt={img.title} 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = `https://placehold.co/600x800/800000/d4af37?text=Please+Save+${img.src.split('/').pop()}`;
                }}
              />
              <div 
                className="gallery-overlay"
                style={{
                  position: 'absolute', inset: 0, 
                  background: 'linear-gradient(to top, rgba(128,0,0,0.85), transparent)', 
                  display: 'flex', flexDirection: 'column', justifyContent: 'flex-end',
                  padding: '2rem', transition: 'all 0.3s ease',
                  opacity: 0
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0'}
              >
                <span style={{ color: 'var(--clr-gold)', fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>
                  {img.category}
                </span>
                <h3 style={{ color: 'white', fontSize: '1.6rem', fontWeight: '800', margin: 0 }}>
                  {img.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {lightboxOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                position: 'fixed', inset: 0, zIndex: 100,
                background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(5px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center'
              }}
              onClick={closeLightbox}
            >
              <button 
                onClick={closeLightbox}
                style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}
              >
                <X size={32} />
              </button>

              <button 
                onClick={prevImage}
                style={{ position: 'absolute', left: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer' }}
              >
                <ChevronLeft size={32} />
              </button>

              <motion.img
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                src={images[currentIndex].src}
                style={{ maxHeight: '85vh', maxWidth: '85vw', borderRadius: '4px', objectFit: 'contain' }}
                onClick={(e) => e.stopPropagation()}
                alt="Lightbox View"
              />

              <button 
                onClick={nextImage}
                style={{ position: 'absolute', right: '2rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '50%', padding: '0.5rem', cursor: 'pointer' }}
              >
                <ChevronRight size={32} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;
