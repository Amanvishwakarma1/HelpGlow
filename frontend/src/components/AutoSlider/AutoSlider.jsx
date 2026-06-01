import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Users, Cake, Globe, Utensils, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { COLORS, VIDEO_SLIDES, STATS_DATA } from './config';
import { styles } from './styles';
import { StatCard } from './SubComponents';

const ICONS = [
  <Heart size={24} />,
  <Users size={24} />,
  <Cake size={24} />,
  <Globe size={24} />,
  <Utensils size={24} />
];

export default function AutoSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timerProgress, setTimerProgress] = useState(0);
  const [isTvHovered, setIsTvHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const SLIDE_DURATION = 5500;
  const TIMER_STEP = 50;

  // 💡 Robust helper to extract premium accents dynamically if not defined in config
  const getPreHeader = (slide) => {
    if (slide.preHeader) return slide.preHeader;
    switch (slide.id) {
      case 1: return "URGENT HUNGER RELIEF";
      case 2: return "EMPOWERING FUTURE GENERATIONS";
      case 3: return "MAKE AN IMMEDIATE IMPACT";
      default: return "SUPPORT OUR CAUSE";
    }
  };

  const getAccentColor = (slide) => {
    if (slide.accentColor) return slide.accentColor;
    switch (slide.id) {
      case 1: return COLORS.orange;
      case 2: return COLORS.pink;
      case 3: return COLORS.gold;
      default: return COLORS.pink;
    }
  };

  // Dynamic Google Font Injection Engine
  useEffect(() => {
    const linkId = 'premium-google-fonts-tv-slider';
    if (!document.getElementById(linkId)) {
      const link = document.createElement('link');
      link.id = linkId;
      link.rel = 'stylesheet';
      link.href = 'https://fonts.googleapis.com/css2?family=Outfit:wght@600;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Slide loop scheduler with precise manual reset capability
  useEffect(() => {
    setTimerProgress(0);
    
    const progressInterval = setInterval(() => {
      setTimerProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((current) => (current === VIDEO_SLIDES.length - 1 ? 0 : current + 1));
          return 0;
        }
        return prev + (TIMER_STEP / SLIDE_DURATION) * 100;
      });
    }, TIMER_STEP);

    return () => clearInterval(progressInterval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === VIDEO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? VIDEO_SLIDES.length - 1 : prev - 1));
  };

  const handleDotClick = (idx) => {
    setCurrentIndex(idx);
  };

  // Parallax TV hover tilt tracking routines
  const handleMouseMove = (e) => {
    if (!isTvHovered || isMobile) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePosition({ x, y });
  };

  const handleMouseLeave = () => {
    setIsTvHovered(false);
    setMousePosition({ x: 0, y: 0 });
  };

  const activeSlide = VIDEO_SLIDES[currentIndex];

  return (
    <div style={{ ...styles.mainWrapper, backgroundColor: COLORS.deepBg }}>
      {/* ── KEYFRAME INJECTIONS ── */}
      <style>
        {`
          .stats-scroll-container::-webkit-scrollbar { display: none; }
          .stats-scroll-container { -ms-overflow-style: none; scrollbar-width: none; }
          
          @keyframes borderGlowLoop {
            0%, 100% { 
              box-shadow: 0 0 10px rgba(212, 175, 55, 0.4), 0 0 20px rgba(243, 112, 33, 0.2); 
              border-color: rgba(212, 175, 55, 0.5);
            }
            50% { 
              box-shadow: 0 0 30px rgba(212, 175, 55, 0.95), 0 0 45px rgba(243, 112, 33, 0.45); 
              border-color: rgba(212, 175, 55, 1);
            }
          }
          .donate-btn-glow {
            animation: borderGlowLoop 2s infinite ease-in-out;
          }
          
          @keyframes ambilightPulse {
            0%, 100% { filter: blur(75px) brightness(0.9); }
            50% { filter: blur(85px) brightness(1.2); }
          }
          .ambilight-active {
            animation: ambilightPulse 4s infinite ease-in-out;
          }

          @keyframes playRipple {
            0% { transform: scale(1); opacity: 0.9; }
            100% { transform: scale(2.2); opacity: 0; }
          }
          .play-ripple-1 {
            animation: playRipple 2s infinite cubic-bezier(0.1, 0.8, 0.3, 1);
          }
          .play-ripple-2 {
            animation: playRipple 2s infinite cubic-bezier(0.1, 0.8, 0.3, 1);
            animation-delay: 0.6s;
          }
          .play-ripple-3 {
            animation: playRipple 2s infinite cubic-bezier(0.1, 0.8, 0.3, 1);
            animation-delay: 1.2s;
          }

          @media (max-width: 768px) {
            .slider-container {
              height: auto !important;
              overflow: visible !important;
            }
            .slider-slide {
              position: relative !important;
              flex-direction: column !important;
              padding: 40px 6% 60px 6% !important;
              gap: 30px !important;
              justify-content: center !important;
              align-items: center !important;
              height: auto !important;
            }
            .slider-left-column {
              max-width: 100% !important;
              padding-right: 0 !important;
              align-items: center !important;
              text-align: center !important;
            }
            .slider-pre-header {
              justify-content: center !important;
              font-size: 0.8rem !important;
              margin-bottom: 10px !important;
            }
            .slider-heading-text {
              font-size: 2.1rem !important;
              text-align: center !important;
              margin-bottom: 25px !important;
              line-height: 1.25 !important;
              letter-spacing: -0.8px !important;
            }
            .slider-donate-btn {
              padding: 14px 35px !important;
              font-size: 0.95rem !important;
            }
            .slider-right-column {
              width: 100% !important;
              justify-content: center !important;
            }
            .slider-tv-container {
              max-width: 100% !important;
              padding-top: 10px !important;
            }
            .slider-tv-stand-neck,
            .slider-tv-stand-base,
            .slider-tv-reflection {
              display: none !important;
            }
            .slider-tv-frame {
              border-width: 6px !important;
              border-bottom-width: 6px !important;
              border-radius: 12px !important;
            }
            .slider-stats-grid {
              padding: 20px 3% 20px 3% !important;
              gap: 6px !important;
              overflow-x: hidden !important;
              justify-content: space-between !important;
            }
            .slider-stat-card {
              min-width: 0 !important;
              flex: 1 1 0% !important;
              padding: 10px 4px !important;
              border-radius: 10px !important;
              box-shadow: none !important;
              background: rgba(255, 255, 255, 0.03) !important;
              border-color: rgba(255, 255, 255, 0.04) !important;
            }
            .slider-stat-card:hover {
              transform: none !important;
            }
            .slider-stat-icon-wrapper {
              margin-bottom: 6px !important;
              padding: 5px !important;
              border-radius: 6px !important;
              border: none !important;
              background: rgba(255, 255, 255, 0.02) !important;
            }
            .slider-stat-icon-wrapper svg {
              width: 14px !important;
              height: 14px !important;
            }
            .slider-stat-value {
              font-size: 0.8rem !important;
              margin: 4px 0 !important;
              letter-spacing: -0.3px !important;
            }
            .slider-stat-label {
              font-size: 0.45rem !important;
              letter-spacing: 0.5px !important;
              line-height: 1.1 !important;
              margin-top: 2px !important;
              text-align: center !important;
              display: block !important;
            }
            .slider-watch-now-strip {
              padding: 16px 10px !important;
            }
            .slider-watch-text {
              font-size: 0.95rem !important;
              letter-spacing: 1px !important;
            }
          }
        `}
      </style>

      {/* ── TWO-COLUMN HERO SLIDER ── */}
      <div className="slider-container" style={styles.container}>
        <AnimatePresence mode="wait">
          {VIDEO_SLIDES.map((slide, index) => index === currentIndex && (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
              className="slider-slide"
              style={styles.slide}
            >
              {/* LEFT SIDE: Typography */}
              <div className="slider-left-column" style={styles.leftColumn}>
                
                <motion.div
                  initial={{ opacity: 0, x: -25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 120 }}
                  className="slider-pre-header"
                  style={{ ...styles.preHeader, color: getAccentColor(slide) }}
                >
                  <span style={{ ...styles.preHeaderDot, backgroundColor: getAccentColor(slide) }} />
                  {getPreHeader(slide)}
                </motion.div>

                <motion.h1 
                  initial={{ opacity: 0, y: 35 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35, duration: 0.6, type: "spring", stiffness: 80 }}
                  className="slider-heading-text"
                  style={styles.text} 
                >
                  {slide.text}
                </motion.h1>

                <motion.button
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, type: "spring", stiffness: 150 }}
                  className="slider-donate-btn donate-btn-glow"
                  style={{ 
                    ...styles.button, 
                    backgroundColor: COLORS.gold,
                    margin: 0
                  }}
                  whileHover={{ 
                    scale: 1.05, 
                    backgroundColor: '#f7e7c4',
                    color: COLORS.deepBg,
                    boxShadow: `0 12px 35px rgba(212, 175, 55, 0.45)`
                  }}
                  whileTap={{ scale: 0.96 }}
                  onClick={() => navigate("/menu")}
                >
                  Donate Now
                </motion.button>
              </div>

              {/* RIGHT SIDE: Hyper-realistic 3D TV Chassis */}
              <div className="slider-right-column" style={styles.rightColumn}>
                <div 
                  className="slider-tv-container"
                  style={{
                    ...styles.tvContainer,
                    transform: isMobile 
                      ? 'none' 
                      : `perspective(1000px) rotateY(${mousePosition.x * 12}deg) rotateX(${-mousePosition.y * 12}deg) scale(${isTvHovered ? 1.02 : 1})`,
                    transition: isTvHovered ? 'none' : 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                  }}
                  onMouseMove={handleMouseMove}
                  onMouseEnter={() => setIsTvHovered(true)}
                  onMouseLeave={handleMouseLeave}
                >
                  
                  {/* Ambilight Backlight */}
                  <div 
                    className="ambilight-active"
                    style={{
                      ...styles.tvAmbilight,
                      background: `radial-gradient(circle, ${getAccentColor(slide)} 0%, ${COLORS.magenta}50 40%, rgba(0,0,0,0) 70%)`,
                      boxShadow: `0 0 100px ${getAccentColor(slide)}40`
                    }}
                  />

                  {/* Television Bezel Frame */}
                  <div className="slider-tv-frame" style={styles.tvFrame}>
                    <div style={styles.tvScreen}>
                      
                      <video
                        key={slide.id}
                        src={slide.videoUrl}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          zIndex: 2,
                          transform: 'scale(1.02)'
                        }}
                        autoPlay muted loop playsInline
                      />

                      <div style={styles.tvGlare} />
                      <div style={styles.tvScanlines} />

                      {/* Manual Chevrons */}
                      <motion.button 
                        style={{ ...styles.navButton, left: '15px' }}
                        animate={{ 
                          opacity: isMobile ? 0.85 : (isTvHovered ? 1 : 0), 
                          x: isMobile ? 0 : (isTvHovered ? 0 : -10) 
                        }}
                        whileHover={isMobile ? {} : { scale: 1.1, backgroundColor: COLORS.gold, color: COLORS.deepBg }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePrev();
                        }}
                      >
                        <ChevronLeft size={22} />
                      </motion.button>

                      <motion.button 
                        style={{ ...styles.navButton, right: '15px' }}
                        animate={{ 
                          opacity: isMobile ? 0.85 : (isTvHovered ? 1 : 0), 
                          x: isMobile ? 0 : (isTvHovered ? 0 : 10) 
                        }}
                        whileHover={isMobile ? {} : { scale: 1.1, backgroundColor: COLORS.gold, color: COLORS.deepBg }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNext();
                        }}
                      >
                        <ChevronRight size={22} />
                      </motion.button>

                      {/* Slide Indicator Dots */}
                      <div style={styles.dotsContainer}>
                        {VIDEO_SLIDES.map((_, idx) => (
                          <div
                            key={idx}
                            style={{
                              ...styles.dot,
                              backgroundColor: idx === currentIndex ? COLORS.gold : 'rgba(255, 255, 255, 0.4)',
                              width: idx === currentIndex ? '24px' : '8px',
                              borderRadius: idx === currentIndex ? '4px' : '50%',
                              boxShadow: idx === currentIndex ? `0 0 10px ${COLORS.gold}` : 'none'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDotClick(idx);
                            }}
                          />
                        ))}
                      </div>

                      {/* Loading loader indicator bar */}
                      <div style={styles.timerBarWrapper}>
                        <div style={{ ...styles.timerBarFill, width: `${timerProgress}%` }} />
                      </div>

                    </div>
                  </div>

                  {/* 3D Metal TV Stand structures */}
                  <div className="slider-tv-stand-neck" style={styles.tvStandNeck} />
                  <div className="slider-tv-stand-base" style={styles.tvStandBase} />
                  
                  {/* Stand mirror desk reflection underlay */}
                  <div 
                    className="slider-tv-reflection"
                    style={{
                      ...styles.tvStandReflection,
                      background: `radial-gradient(ellipse at center, ${getAccentColor(slide)}30 0%, ${COLORS.deepBg}00 70%)`
                    }} 
                  />

                  {/* pulsing standby TV LED */}
                  <div 
                    style={{
                      ...styles.tvLED,
                      backgroundColor: timerProgress > 90 ? COLORS.pink : COLORS.gold,
                      boxShadow: timerProgress > 90 
                        ? `0 0 8px 3px ${COLORS.pink}` 
                        : `0 0 8px 3px ${COLORS.gold}`
                    }} 
                  />

                </div>
              </div>

            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ── LIVE INTERACTION IMPACT STATS SECTION ── */}
      <div 
        className="slider-stats-section"
        style={{ 
          ...styles.statsSection, 
          background: `linear-gradient(180deg, ${COLORS.deepBg} 0%, rgba(142, 35, 130, 0.15) 100%)`, 
          borderTop: `1px solid rgba(212, 175, 55, 0.15)` 
        }}
      >
        <div className="slider-stats-scroll-wrapper" style={styles.statsScrollWrapper}>
          <div style={styles.statsScrollFadeLeft} />
          <div style={styles.statsScrollFadeRight} />
          
          <div className="stats-scroll-container slider-stats-grid" style={styles.statsGrid}>
            {STATS_DATA.map((item, idx) => (
              <StatCard 
                key={idx}
                item={item}
                icon={ICONS[idx]}
              />
            ))}
          </div>
        </div>
        
        {/* Watch Now Video Strip */}
        <motion.div 
          className="slider-watch-now-strip"
          style={{ 
            ...styles.watchNowStrip, 
            background: `linear-gradient(90deg, ${COLORS.pink} 0%, ${COLORS.orange} 100%)` 
          }}
          whileHover={{ filter: "brightness(1.12)" }}
          onClick={() => navigate("/watch")}
        >
          <div style={{ position: 'relative', width: '44px', height: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className="play-ripple-1" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.3)', zIndex: 0 }} />
            <div className="play-ripple-2" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.25)', zIndex: 0 }} />
            <div className="play-ripple-3" style={{ position: 'absolute', width: '100%', height: '100%', borderRadius: '50%', backgroundColor: 'rgba(255, 255, 255, 0.15)', zIndex: 0 }} />

            <motion.div 
              style={{ ...styles.playIcon, backgroundColor: COLORS.magenta }}
              whileHover={{ scale: 1.15 }}
            >
              <Play size={15} fill="white" stroke="white" />
            </motion.div>
          </div>
          <span className="slider-watch-text" style={styles.watchText}>How to Donate? Watch Now!</span>
        </motion.div>
      </div>
    </div>
  );
}