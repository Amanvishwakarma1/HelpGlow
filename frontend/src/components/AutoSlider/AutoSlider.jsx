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
          
          /* Button Glow Animation */
          @keyframes glow {
            0% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.4); }
            50% { box-shadow: 0 0 20px rgba(255, 204, 0, 0.8); }
            100% { box-shadow: 0 0 5px rgba(255, 204, 0, 0.4); }
          }
          .donate-btn-glow {
            animation: glow 2s infinite;
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
              <h1 style={styles.text}>{slide.text}</h1>
              <button
                className="donate-btn-glow"
                style={styles.button}
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.1)";
                  e.target.style.backgroundColor = "#ffd633";
                  e.target.style.boxShadow = "0 12px 30px rgba(255, 204, 0, 0.6)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                  e.target.style.backgroundColor = "#ffcc00";
                  e.target.style.boxShadow = "none";
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
      <div style={styles.statsSection}>
        <div className="stats-scroll-container" style={styles.statsGrid}>
          {statsData.map((item, idx) => (
            <div 
              key={idx} 
              style={styles.statCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-10px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 20px 40px rgba(2, 132, 199, 0.4)';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              }}
            >
              <div style={styles.iconWrapper}>{item.icon}</div>
              <h2 style={styles.statValue}>{item.value}</h2>
              <p style={styles.statLabel}>{item.label}</p>
            </div>
          ))}
        </div>
        
        {/* WATCH NOW STRIP */}
        <div style={styles.watchNowStrip}>
          <div style={styles.playIcon}>
            <Play size={14} fill="white" />
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
  overlay: { position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))' },
  content: { position: 'absolute', left: '8%', bottom: '20%', maxWidth: '520px', color: '#fff', zIndex: 5 },
  text: { fontSize: '2.6rem', lineHeight: '1.3', marginBottom: '25px', fontWeight: '700' },
  
  button: { 
    padding: '14px 34px', 
    fontSize: '1.1rem', 
    fontWeight: '600', 
    border: 'none', 
    borderRadius: '30px', 
    cursor: 'pointer', 
    backgroundColor: '#ffcc00', 
    color: '#000', 
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)' 
  },

  /* IMPACT STATS SECTION */
  statsSection: {
    width: '100%',
    background: 'linear-gradient(90deg, #034d75 0%, #0284c7 100%)',
    display: 'flex',
    flexDirection: 'column',
  },
  statsGrid: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '40px 20px',
    overflowX: 'auto',
    gap: '20px',
    WebkitOverflowScrolling: 'touch',
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '25px 15px',
    minWidth: '180px',
    flexShrink: 0,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    borderRadius: '24px',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    cursor: 'pointer',
  },
  iconWrapper: { marginBottom: '12px', color: '#fff' },
  statValue: { fontSize: '1.8rem', fontWeight: '900', margin: '5px 0' },
  statLabel: { fontSize: '0.85rem', opacity: 0.9, fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' },

  watchNowStrip: {
    backgroundColor: '#ffcc00',
    padding: '15px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '12px',
    cursor: 'pointer',
  },
  playIcon: {
    width: '32px',
    height: '32px',
    backgroundColor: '#034d75',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  watchText: { color: '#034d75', fontWeight: '800', fontSize: '1.1rem', textTransform: 'uppercase' }
};

export default AutoSlider;