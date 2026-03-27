import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Info, Users, Gift, Calendar, Coins, Landmark, Sparkles } from 'lucide-react';
import { DataContext } from '../../context/DataContext';

const Home = () => {
  const { stats, members, archives } = useContext(DataContext);

  const isMakalya = (cat) => cat === 'Makalya Contribution' || cat === 'Mangalya Contribution';
  
  // Aggregate all payments from Makalya members for the live list
  const allMakalyaPayments = members
    .filter(m => isMakalya(m.category))
    .flatMap(m => (m.payments || []).map(p => ({ ...p, memberName: m.name, memberTotal: m.totalPaid })))
    .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort ASC - Earliest first

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

      {/* Hero Section - Divine Red Edition */}
      <section style={{ 
        position: 'relative', 
        minHeight: '90vh',
        display: 'flex', 
        alignItems: 'center', 
        background: 'radial-gradient(circle at center, #9a1212 0%, #4a0000 100%)',
        overflow: 'hidden',
        padding: '2rem 0'
      }}>
        {/* ============ FLOATING DIVINE PARTICLES & GLOW ANIMATIONS ============ */}
        {/* Golden floating particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: `${3 + Math.random() * 5}px`,
              height: `${3 + Math.random() * 5}px`,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${i % 3 === 0 ? '#ffd700' : i % 3 === 1 ? '#ff9900' : '#d4af37'}, transparent)`,
              left: `${5 + (i * 4.7) % 90}%`,
              bottom: '-10px',
              zIndex: 5,
              pointerEvents: 'none',
              boxShadow: `0 0 ${6 + i % 4 * 3}px ${i % 3 === 0 ? '#ffd700' : '#d4af37'}`
            }}
            animate={{
              y: [0, -(300 + Math.random() * 500)],
              x: [0, (Math.random() - 0.5) * 80],
              opacity: [0, 0.9, 0.7, 0],
              scale: [0.5, 1.2, 0.8, 0.3]
            }}
            transition={{
              duration: 6 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: 'easeOut'
            }}
          />
        ))}

        {/* Warm glowing diya lights along top edge */}
        {[10, 25, 40, 55, 70, 85].map((left, i) => (
          <motion.div
            key={`diya-${i}`}
            style={{
              position: 'absolute',
              top: `${10 + i * 5}px`,
              left: `${left}%`,
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              background: '#ffd700',
              zIndex: 6,
              pointerEvents: 'none',
              boxShadow: '0 0 15px 6px rgba(255,165,0,0.5), 0 0 40px 12px rgba(255,215,0,0.2)'
            }}
            animate={{
              opacity: [0.4, 1, 0.6, 1, 0.4],
              scale: [0.8, 1.3, 0.9, 1.2, 0.8],
              boxShadow: [
                '0 0 15px 6px rgba(255,165,0,0.3), 0 0 40px 12px rgba(255,215,0,0.1)',
                '0 0 20px 10px rgba(255,165,0,0.6), 0 0 50px 18px rgba(255,215,0,0.3)',
                '0 0 15px 6px rgba(255,165,0,0.3), 0 0 40px 12px rgba(255,215,0,0.1)'
              ]
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Corner Ornamental Glow - Top Left */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          zIndex: 3,
          pointerEvents: 'none'
        }} />

        {/* Corner Ornamental Glow - Top Right */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '250px',
          height: '250px',
          background: 'radial-gradient(circle, rgba(212,175,55,0.15) 0%, transparent 70%)',
          zIndex: 3,
          pointerEvents: 'none'
        }} />

        {/* Large Decorative Mandala Background */}
        <div style={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          width: '900px', 
          height: '900px', 
          backgroundImage: 'url("https://www.transparentpng.com/download/mandala/circular-traditional-mandala-design-transparent-10.png")', 
          backgroundSize: 'contain', 
          backgroundPosition: 'center', 
          backgroundRepeat: 'no-repeat', 
          opacity: 0.08, 
          zIndex: 0,
          filter: 'invert(1)'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '4rem' }}>
            
            {/* Left Column - Content Area */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(12px)',
                  padding: '3.5rem',
                  borderRadius: '40px',
                  border: '1px solid rgba(212, 175, 55, 0.3)',
                  boxShadow: '0 30px 60px rgba(0,0,0,0.4)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                {/* Internal corner mandalas */}
                <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '100px', height: '100px', backgroundImage: 'url("https://www.transparentpng.com/download/mandala/circular-traditional-mandala-design-transparent-10.png")', backgroundSize: 'contain', opacity: 0.1, filter: 'invert(1)' }}></div>
                
                <span style={{ color: 'var(--clr-gold-light)', fontWeight: '700', letterSpacing: '5px', textTransform: 'uppercase', fontSize: '0.85rem', marginBottom: '1.5rem', display: 'block', textShadow: '0 0 10px rgba(212,175,55,0.4)' }}>
                  ॐ Sri Sakthi Namaha ॐ
                </span>
                <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', color: '#ffffff', marginBottom: '1.5rem', lineHeight: '1.1', fontWeight: '900', textShadow: '0 4px 15px rgba(0,0,0,0.6)' }}>
                  Sri Sakthi <br/>
                  <span style={{ color: 'var(--clr-gold-light)', display: 'inline-block' }}>Makaliyamman</span>
                </h1>
                <p style={{ fontSize: '1.25rem', color: '#fdfbf7', marginBottom: '3rem', opacity: 0.9, lineHeight: '1.8' }}>
                  A sacred sanctuary dedicated to Goddess Makaliyamman. Step into a world of spiritual peace, divine energy, and timeless tradition in Poomalur.
                </p>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <Link to="/donations" className="btn" style={{ padding: '1.1rem 3rem', fontSize: '1.1rem', background: 'var(--clr-gold)', color: '#4a0000', fontWeight: '900', boxShadow: '0 10px 25px rgba(212, 175, 55, 0.4)' }}>
                     Donate Now <Heart size={20} fill="#4a0000" />
                  </Link>
                  <Link to="/about" className="btn btn-outline" style={{ padding: '1.1rem 3rem', fontSize: '1.1rem', color: '#ffffff', borderColor: '#ffffff', borderWeight: '2px' }}>
                     View History <Info size={20} />
                  </Link>
                </div>
              </motion.div>
            </motion.div>

            {/* Right Column - Goddess Focus */}
            <motion.div 
              style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              {/* Divine Aura Glow */}
              <div style={{ 
                position: 'absolute', 
                width: '140%', 
                height: '140%', 
                background: 'radial-gradient(circle, rgba(212,175,55,0.25) 0%, transparent 65%)',
                zIndex: -1,
                animation: 'pulse 4s ease-in-out infinite'
              }}></div>
              
              <img 
                src="/makaliyamman.png" 
                alt="Divine Mother Makaliyamman"
                className="divine-glow"
                style={{ 
                  width: '100%', 
                  maxWidth: '520px', 
                  height: 'auto', 
                  borderRadius: '120px 120px 30px 30px', 
                  border: '4px solid var(--clr-gold)',
                  boxShadow: '0 50px 100px rgba(0,0,0,0.6)',
                  zIndex: 2
                }} 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Contributions Section */}
      <section className="section" style={{ background: '#2d0a0a', borderTop: '4px solid var(--clr-gold)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: 0, right: 0, opacity: 0.05, filter: 'invert(1)' }}>
          <Sparkles size={200} />
        </div>
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', background: 'rgba(212,175,55,0.2)', padding: '0.5rem 1.5rem', borderRadius: '100px', marginBottom: '1rem', border: '1px solid var(--clr-gold)', color: 'var(--clr-gold-light)', fontWeight: 'bold' }}
            >
              <div style={{ width: '8px', height: '8px', background: '#22c55e', borderRadius: '50%', boxShadow: '0 0 10px #22c55e' }}></div>
              Live Divine Ledger - Festival 2025
            </motion.div>
            <h2 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Divine Collections</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Live updates of our sacred collections and village support</p>
          </div>

          <div className="grid grid-cols-3" style={{ gap: '2rem' }}>
            <motion.div 
              className="card" 
              whileHover={{ y: -5 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.3)', textAlign: 'center', padding: '2.5rem' }}
            >
              <Landmark size={40} color="var(--clr-gold-light)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Total Makalya Vari</h3>
              <div style={{ color: 'var(--clr-gold-light)', fontSize: '2.5rem', fontWeight: '900' }}>₹{stats.totalMangalya?.toLocaleString()}</div>
            </motion.div>

            <motion.div 
              className="card" 
              whileHover={{ y: -5 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.3)', textAlign: 'center', padding: '2.5rem' }}
            >
              <Users size={40} color="var(--clr-gold-light)" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Family Funds</h3>
              <div style={{ color: 'var(--clr-gold-light)', fontSize: '2.5rem', fontWeight: '900' }}>₹{stats.totalFamily?.toLocaleString()}</div>
            </motion.div>

            <motion.div 
              className="card" 
              whileHover={{ y: -5 }}
              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255, 77, 77, 0.4)', textAlign: 'center', padding: '2.5rem' }}
            >
              <Coins size={40} color="#ff4d4d" style={{ marginBottom: '1.5rem' }} />
              <h3 style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.5rem' }}>Ledger Balance</h3>
              <div style={{ color: '#ff4d4d', fontSize: '2.5rem', fontWeight: '900' }}>₹{stats.netBalance?.toLocaleString()}</div>
            </motion.div>
          </div>

          {/* Live Makalya Contributions List */}
          <motion.div 
            className="card" 
            style={{ marginTop: '4rem', background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(212,175,55,0.2)', padding: '2rem' }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 style={{ color: 'var(--clr-gold-light)', textAlign: 'center', marginBottom: '2rem', fontSize: '1.75rem' }}>Makalya Vari List 📜</h3>
            <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
              <table className="table" style={{ color: '#fff', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
                <thead style={{ position: 'sticky', top: 0, background: '#2d0a0a', zIndex: 5 }}>
                  <tr>
                    <th style={{ color: 'var(--clr-gold-light)', border: 'none' }}>S.No</th>
                    <th style={{ color: 'var(--clr-gold-light)', border: 'none' }}>Family / Couple Name</th>
                    <th style={{ color: 'var(--clr-gold-light)', border: 'none' }}>Amount (₹)</th>
                    <th style={{ color: 'var(--clr-gold-light)', border: 'none', textAlign: 'right' }}>Date Received</th>
                  </tr>
                </thead>
                <tbody>
                  {allMakalyaPayments.map((p, idx) => (
                    <tr key={idx} style={{ background: 'rgba(255,255,255,0.04)' }}>
                      <td style={{ fontWeight: 'bold', color: 'var(--clr-gold)', border: 'none' }}>{idx + 1}</td>
                      <td style={{ border: 'none', fontWeight: '500' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {p.memberName}
                        {p.memberTotal >= 2501 && (
                          <span style={{ 
                            background: 'var(--clr-gold)', 
                            color: 'white', 
                            fontSize: '0.65rem', 
                            padding: '2px 8px', 
                            borderRadius: '20px',
                            fontWeight: 'bold',
                            boxShadow: '0 2px 4px rgba(212,175,55,0.4)',
                            whiteSpace: 'nowrap'
                          }}>
                            🏆 Special Mark
                          </span>
                        )}
                      </div>
                    </td>
                      <td style={{ border: 'none', fontWeight: 'bold', color: 'var(--clr-gold-light)' }}>₹{p.amount?.toLocaleString()}</td>
                      <td style={{ border: 'none', textAlign: 'right', opacity: 0.7, fontSize: '0.9rem' }}>{p.date}</td>
                    </tr>
                  ))}
                  {allMakalyaPayments.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', color: '#666', padding: '3rem' }}>No records yet for this festival cycle.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .hero-text { text-align: center !important; }
          .hero-text p { margin-left: auto; margin-right: auto; }
          .hero-text div { justify-content: center; }
        }
      `}</style>


      {/* Highlights Section - Integrated into Dark Theme */}
      <section className="section" style={{ background: 'linear-gradient(to bottom, #4a0000, #300000)', position: 'relative', borderTop: '2px solid rgba(212, 175, 55, 0.2)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 className="section-title" style={{ color: 'var(--clr-gold-light)' }}>Temple Highlights</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', marginTop: '-2.5rem' }}>Experience the divine legacy and community spirit of Poomalur</p>
          </div>

          <motion.div 
            className="grid grid-cols-3"
            style={{ gap: '2.5rem' }}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div className="card" variants={itemVariants} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center', borderTop: '6px solid var(--clr-gold)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.1)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--clr-gold-light)', transform: 'rotate(-5deg)' }}>
                <Users size={36} />
              </div>
              <h3 style={{ marginBottom: '1.25rem', color: '#ffffff', fontSize: '1.5rem' }}>Our Community</h3>
              <p style={{ color: '#f5f5f5', opacity: 0.8, marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem', lineHeight: '1.8' }}>Join our growing family of devotees who actively participate in the temple's daily activities and sacred traditions.</p>
              <Link to="/about" className="btn btn-outline" style={{ alignSelf: 'center', color: '#ffffff', borderColor: '#ffffff', padding: '0.6rem 2rem' }}>Learn More</Link>
            </motion.div>

            <motion.div className="card" variants={itemVariants} style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(212,175,55,0.4)', textAlign: 'center', borderTop: '6px solid #ff4d4d', display: 'flex', flexDirection: 'column', height: '100%', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)' }}>
              <div style={{ background: 'rgba(255, 77, 77, 0.1)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: '#ff4d4d', transform: 'rotate(5deg)' }}>
                <Gift size={36} />
              </div>
              <h3 style={{ marginBottom: '1.25rem', color: '#ffffff', fontSize: '1.5rem' }}>Donations</h3>
              <p style={{ color: '#f5f5f5', opacity: 0.8, marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem', lineHeight: '1.8' }}>Support the temple's growth and community services. Every contribution helps preserve our sacred heritage for the future.</p>
              <Link to="/donations" className="btn" style={{ background: 'var(--clr-gold)', color: '#4a0000', alignSelf: 'center', padding: '0.6rem 2.5rem', fontWeight: 'bold' }}>Donate Now</Link>
            </motion.div>

            <motion.div className="card" variants={itemVariants} style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(212,175,55,0.2)', textAlign: 'center', borderTop: '6px solid var(--clr-gold)', display: 'flex', flexDirection: 'column', height: '100%' }}>
              <div style={{ background: 'rgba(212, 175, 55, 0.1)', width: '80px', height: '80px', borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 2rem', color: 'var(--clr-gold-light)', transform: 'rotate(-5deg)' }}>
                <Calendar size={36} />
              </div>
              <h3 style={{ marginBottom: '1.25rem', color: '#ffffff', fontSize: '1.5rem' }}>Events & Poojas</h3>
              <p style={{ color: '#f5f5f5', opacity: 0.8, marginBottom: '2rem', flexGrow: 1, fontSize: '1.05rem', lineHeight: '1.8' }}>Immerse yourself in spiritual bliss through our special rituals, annual festivals, and divine celebrations.</p>
              <Link to="/contact" className="btn btn-outline" style={{ alignSelf: 'center', color: '#ffffff', borderColor: '#ffffff', padding: '0.6rem 2rem' }}>Contact Us</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Video Section - Cinematic Focus */}
      <section className="section" style={{ background: '#300000', padding: '7rem 0', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container" style={{ position: 'relative' }}>
          {/* Subtle watermark in video section */}
          <div style={{ position: 'absolute', bottom: '-50px', right: '-100px', width: '300px', height: '300px', backgroundImage: 'url("https://www.transparentpng.com/download/mandala/circular-traditional-mandala-design-transparent-10.png")', backgroundSize: 'contain', opacity: 0.05, filter: 'invert(1)', zIndex: 0 }}></div>
          
          <div className="grid grid-cols-2" style={{ alignItems: 'center', gap: '5rem', position: 'relative', zIndex: 1 }}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 style={{ fontSize: '2.8rem', color: '#ffffff', marginBottom: '1.5rem', lineHeight: '1.2' }}>Relive the Divine <br /><span style={{ color: 'var(--clr-gold-light)' }}>Festival Glory</span></h2>
              <p style={{ fontSize: '1.2rem', color: '#f5f5f5', opacity: 0.8, marginBottom: '2.5rem', lineHeight: '1.9' }}>
                Experience the spiritual grandeur and vibrant celebrations of our annual temple festival. Watch the coverage and witness the devotion of thousands.
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', color: 'var(--clr-gold-light)', fontWeight: 'bold', letterSpacing: '2px' }}>
                <div style={{ width: '60px', height: '2px', background: 'var(--clr-gold)' }}></div>
                OFFICIAL FESTIVAL COVERAGE
              </div>
            </motion.div>

            <motion.div 
              style={{ position: 'relative' }}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div style={{ 
                position: 'absolute', 
                inset: '-25px', 
                background: 'var(--clr-gold)', 
                opacity: 0.15, 
                borderRadius: '40px', 
                zIndex: 0,
                transform: 'rotate(3deg)'
              }}></div>
              <div className="card" style={{ padding: '0.8rem', borderRadius: '35px', position: 'relative', zIndex: 1, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', borderRadius: '28px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.5)' }}>
                  <iframe 
                    src="https://www.youtube.com/embed/dqLSH60PNP4"
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title="Temple Festival Video"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
