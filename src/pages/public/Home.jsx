import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Info, Users, Gift, CalendarHeart } from 'lucide-react';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      {/* Top Traditional Banner */}
      <section style={{ 
        width: '100%', 
        height: 'clamp(150px, 20vw, 250px)', 
        backgroundImage: 'url("/head_banner.png")', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        position: 'relative',
        zIndex: 20,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
      }}>
        <div style={{ position: 'absolute', bottom: 0, left: 0, width: '100%', height: '50px', background: 'linear-gradient(to top, var(--clr-surface), transparent)' }}></div>
      </section>

      {/* Hero Section - Modern Split Layout to preserve Goddess Image perfectly */}
      <section style={{ 
        position: 'relative', 
        minHeight: '70vh',
        display: 'flex', 
        alignItems: 'center', 
        background: 'linear-gradient(135deg, var(--clr-surface) 0%, #fffbfa 100%)',
        overflow: 'hidden',
        padding: '2rem 0 4rem 0'
      }}>
        {/* Subtle animated background shapes & Traditional God Weapons pattern */}
        <div style={{ position: 'absolute', top: 0, left: '-5%', width: '60%', height: '100%', backgroundImage: 'url("/watermark.png")', backgroundSize: '600px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.6, zIndex: 0, mixBlendMode: 'multiply' }}></div>
        <div style={{ position: 'absolute', top: 0, right: '-5%', width: '60%', height: '100%', backgroundImage: 'url("/watermark.png")', backgroundSize: '600px', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', opacity: 0.6, zIndex: 0, mixBlendMode: 'multiply', transform: 'scaleX(-1)' }}></div>
        <div style={{ position: 'absolute', top: '-10%', right: '-5%', width: '50vw', height: '50vw', background: 'radial-gradient(circle, rgba(230,179,37,0.15) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', filter: 'blur(40px)', zIndex: 0 }}></div>
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60vw', height: '60vw', background: 'radial-gradient(circle, rgba(140,28,32,0.08) 0%, rgba(255,255,255,0) 70%)', borderRadius: '50%', filter: 'blur(60px)', zIndex: 0 }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '2rem' }}>
            
            {/* Left Column - Text Content */}
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-text"
            >
              <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: 'var(--clr-maroon)', marginBottom: '1.5rem', lineHeight: '1.1', fontFamily: "var(--font-heading)" }}>
                Sri Sakthi <br/>
                <span style={{ color: 'var(--clr-gold-dark)', display: 'inline-block', marginTop: '0.5rem' }}>Makaliyamman</span>
              </h1>
              <p style={{ fontSize: '1.1rem', color: 'var(--clr-text-main)', marginBottom: '2.5rem', opacity: 0.9, lineHeight: '1.6', maxWidth: '600px' }}>
                A sacred abode of peace, devotion, and community in the heart of Poomalur. Seek the ultimate divine blessings.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <Link to="/donations" className="btn" style={{ flex: '1 1 auto', minWidth: '200px', padding: '1rem', background: 'var(--clr-maroon)', color: 'white', boxShadow: '0 8px 20px rgba(140, 28, 32, 0.3)' }}>
                   Donate Now <Heart size={20} />
                </Link>
                <Link to="/about" className="btn btn-outline" style={{ flex: '1 1 auto', minWidth: '200px', padding: '1rem', color: 'var(--clr-maroon)', borderColor: 'var(--clr-maroon)' }}>
                   View Details <Info size={20} />
                </Link>
              </div>
            </motion.div>

            {/* Right Column - Goddess Image */}
            <motion.div 
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <img 
                src="/makaliyamman.png" 
                alt="Sri Sakthi Makaliyamman Goddess"
                className="divine-glow"
                style={{ 
                  width: '90%', 
                  maxWidth: '400px', 
                  height: 'auto', 
                  borderRadius: '20px', 
                  objectFit: 'contain'
                }} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-text { text-align: center !important; }
          .hero-text p { margin-left: auto; margin-right: auto; }
          .hero-text div { justify-content: center; }
        }
      `}</style>

      {/* Highlights Section */}
      <section className="section bg-off-white">
        <div className="container">
          <h2 className="section-title">Temple Highlights</h2>
          <motion.div 
            className="grid grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <motion.div className="card" variants={itemVariants} style={{ textAlign: 'center', borderTop: '4px solid var(--clr-gold)' }}>
              <div style={{ background: 'var(--clr-surface)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--clr-maroon)' }}>
                <Users size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--clr-maroon)' }}>Our Community</h3>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>Join our growing family of devotees who actively participate in the temple\'s daily activities and special poojas.</p>
              <Link to="/about" style={{ color: 'var(--clr-gold-dark)', fontWeight: '600', textDecoration: 'underline' }}>Learn More</Link>
            </motion.div>

            <motion.div className="card" variants={itemVariants} style={{ textAlign: 'center', borderTop: '4px solid var(--clr-maroon)' }}>
              <div style={{ background: 'var(--clr-surface)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--clr-maroon)' }}>
                <Gift size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--clr-maroon)' }}>Donations</h3>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>Support the temple\'s development, daily rituals, and community services through your generous contributions.</p>
              <Link to="/donations" style={{ color: 'var(--clr-gold-dark)', fontWeight: '600', textDecoration: 'underline' }}>Donate Now</Link>
            </motion.div>

            <motion.div className="card" variants={itemVariants} style={{ textAlign: 'center', borderTop: '4px solid var(--clr-gold)' }}>
              <div style={{ background: 'var(--clr-surface)', width: '70px', height: '70px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', color: 'var(--clr-maroon)' }}>
                <CalendarHeart size={32} />
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--clr-maroon)' }}>Events & Poojas</h3>
              <p style={{ color: 'var(--clr-text-muted)', marginBottom: '1.5rem' }}>Experience the divine presence through our special poojas, festivals, and cultural events held throughout the year.</p>
              <Link to="/contact" style={{ color: 'var(--clr-gold-dark)', fontWeight: '600', textDecoration: 'underline' }}>Contact Us</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Previous Year Video Section */}
      <section className="section" style={{ background: 'var(--clr-white)', padding: '5rem 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <h2 className="section-title" style={{ fontSize: '2rem' }}>Previous Year Full Event</h2>
          <p style={{ color: 'var(--clr-text-muted)', marginBottom: '2rem', fontSize: '1.1rem' }}>
            Experience the divine glory of last year's temple festival.
          </p>
          <motion.div 
            className="card"
            style={{ padding: '1rem', borderRadius: 'var(--radius-lg)' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '8px', overflow: 'hidden' }}>
              <iframe 
                src="https://www.youtube.com/embed/dqLSH60PNP4"
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Temple Previous Year Full Video"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </section>

    </>
  );
};

export default Home;
