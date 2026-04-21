import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Heart, Users, Cake, Globe, Utensils, Play } from 'lucide-react';

const slides = [
  {
    image: "https://static.vecteezy.com/system/resources/previews/029/182/310/non_2x/indian-street-dog-on-outdoor-free-photo.JPG",
    text: "They don’t ask for much — just one meal to survive the day."
  },
  {
    image: "https://i.postimg.cc/SsYMXkch/Screenshot-2026-01-20-005258.png",
    text: "Education is their only way out. Your support can change a life."
  },
  {
    image: "https://thumbs.dreamstime.com/b/social-hunger-volunteers-provide-food-assistance-to-poor-people-who-need-164997820.jpg",
    text: "A small donation today can end someone’s hunger tonight."
  }
];

const statsData = [
  { icon: <Heart size={28} />, value: "₹10 Cr+", label: "Donations Raised" },
  { icon: <Users size={28} />, value: "1 Lakh +", label: "Active Donors" },
  { icon: <Cake size={28} />, value: "7 Lakh+", label: "Birthday Giving" },
  { icon: <Globe size={28} />, value: "20 Lakh+", label: "Lives Impacted" },
  { icon: <Utensils size={28} />, value: "35 Lakh+", label: "Meals Served" },
];

const AutoSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    deepBg: '#2d0a27'
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex(prev => prev === slides.length - 1 ? 0 : prev + 1);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={styles.mainWrapper}>
      <style>
        {`
          .stats-scroll-container::-webkit-scrollbar { display: none; }
          .stats-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
          
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.4); }
            50% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.8); }
            100% { box-shadow: 0 0 5px rgba(212, 175, 55, 0.4); }
          }
          .donate-btn-glow {
            animation: glow 2s infinite;
          }
          .slide-text-shadow {
            text-shadow: 2px 2px 10px rgba(0,0,0,0.5);
          }
        `}
      </style>

      {/* SLIDER SECTION */}
      <div style={styles.container}>
        {slides.map((slide, index) => (
          <div
            key={index}
            style={{
              ...styles.slide,
              opacity: currentIndex === index ? 1 : 0,
              zIndex: currentIndex === index ? 1 : 0,
            }}
          >
            <img src={slide.image} alt={`Slide ${index}`} style={styles.image} />
            <div style={styles.overlay} />
            <div style={styles.content}>
              <h1 style={styles.text} className="slide-text-shadow">{slide.text}</h1>
              <button
                className="donate-btn-glow"
                style={{...styles.button, backgroundColor: colors.gold}}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.08)";
                  e.target.style.filter = "brightness(1.1)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.filter = "brightness(1)";
                }}
                onClick={() => navigate("/menu")}
              >
                Donate Now
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* IMPACT STATS SECTION */}
      <div style={{...styles.statsSection, background: `linear-gradient(135deg, ${colors.deepBg} 0%, ${colors.magenta} 100%)`}}>
        <div className="stats-scroll-container" style={styles.statsGrid}>
          {statsData.map((item, idx) => (
            <div 
              key={idx} 
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px)';
                e.currentTarget.style.borderColor = colors.gold;
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <div style={{...styles.iconWrapper, color: colors.pink}}>{item.icon}</div>
              <h2 style={styles.statValue}>{item.value}</h2>
              <p style={styles.statLabel}>{item.label}</p>
            </div>
          ))}
        </div>
        
        {/* WATCH NOW STRIP */}
        <div style={{...styles.watchNowStrip, background: `linear-gradient(to right, ${colors.pink}, ${colors.orange})`}}>
          <div style={{...styles.playIcon, backgroundColor: colors.magenta}}>
            <Play size={14} fill="white" stroke="white" />
          </div>
          <span style={styles.watchText}>How to Donate? Watch Now!</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  mainWrapper: { width: '100vw', overflowX: 'hidden' },
  container: { position: 'relative', width: '100vw', height: '75vh', overflow: 'hidden', backgroundColor: '#000' },
  slide: { position: 'absolute', inset: 0, transition: 'opacity 1.2s ease-in-out' },
  image: { width: '100%', height: '100%', objectFit: 'cover' },
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.6), rgba(0,0,0,0.2))' },
  content: { position: 'absolute', left: '8%', bottom: '20%', maxWidth: '600px', color: '#fff', zIndex: 5 },
  text: { fontSize: '2.8rem', lineHeight: '1.2', marginBottom: '30px', fontWeight: '800', letterSpacing: '-0.5px' },
  
  button: { 
    padding: '16px 40px', 
    fontSize: '1.1rem', 
    fontWeight: '800', 
    border: 'none', 
    borderRadius: '50px', 
    cursor: 'pointer', 
    color: '#fff', 
    textTransform: 'uppercase',
    letterSpacing: '1px',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
  },

  /* IMPACT STATS SECTION */
  statsSection: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    borderTop: '1px solid rgba(212, 175, 55, 0.3)',
  },
  statsGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '50px 20px',
    overflowX: 'auto',
    gap: '25px',
    WebkitOverflowScrolling: 'touch',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '30px 20px',
    minWidth: '200px',
    flexShrink: 0,
    background: 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(12px)',
    borderRadius: '30px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    transition: 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
  },
  iconWrapper: { marginBottom: '15px' },
  statValue: { fontSize: '2rem', fontWeight: '900', margin: '5px 0', letterSpacing: '0.5px' },
  statLabel: { fontSize: '0.8rem', opacity: 0.85, fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1.2px' },

  watchNowStrip: {
    padding: '18px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
    cursor: 'pointer',
    boxShadow: '0 -5px 20px rgba(0,0,0,0.1)'
  },
  playIcon: {
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
  },
  watchText: { color: '#fff', fontWeight: '900', fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '0.5px' }
};

export default AutoSlider;