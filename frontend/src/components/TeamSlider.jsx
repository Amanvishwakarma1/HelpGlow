import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamData = [
  {
    name: "Ankit Singh",
    position: "Founder & CEO",
    bio: "Visionary leader driving HelpGlow's mission to restore dignity, human connection, and sustainable welfare across communities.",
    imgsrc: "https://i.postimg.cc/J0n8wP38/Whats-App-Image-2026-01-19-at-4-59-48-PM.jpg"
  },
  {
    name: "Ganesh Singh",
    position: "Co-Founder",
    bio: "Pioneering community outreach, strategic partnerships, and transparent execution for all major foundation campaigns.",
    imgsrc: "https://i.postimg.cc/nhfHMGpW/1769146723371.png"
  },
  {
    name: "Himesh Singh",
    position: "Director & Co-Founder",
    bio: "Overseeing operational scale, financial integrity, and sustainable growth strategies across all 400+ active projects.",
    imgsrc: "https://i.postimg.cc/fWBWH070/Whats-App-Image-2026-01-19-at-10-19-12-AM.jpg"
  },
  {
    name: "Himanshu Singh",
    position: "Onfield Operations Manager",
    bio: "Leading ground teams, emergency relief distribution, food packet drives, and direct volunteer coordination in Varanasi.",
    imgsrc: "https://i.postimg.cc/Px6GMYg9/Whats-App-Image-2026-01-19-at-5-04-53-PM.jpg"
  }
];

const TeamSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);

  // Auto-slide unless user is hovering over the slider
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % teamData.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered]);

  const slideNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % teamData.length);
  };

  const slidePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + teamData.length) % teamData.length);
  };

  // Ultra-Smooth 3D Depth Motion Variants
  const sliderVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 550 : -550,
      opacity: 0,
      scale: 0.92,
      rotateY: direction > 0 ? 12 : -12
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0
    },
    exit: (direction) => ({
      x: direction < 0 ? 550 : -550,
      opacity: 0,
      scale: 0.92,
      rotateY: direction < 0 ? 12 : -12
    })
  };

  const contentChildVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  const currentMember = teamData[currentIndex];

  return (
    <div 
      className="testimonial-container" 
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ 
        position: 'relative', 
        width: '100%', 
        maxWidth: '100%',
        overflow: 'hidden', 
        paddingBottom: '20px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center' 
      }}
    >
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentIndex}
          custom={direction}
          variants={sliderVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 240, damping: 26 },
            opacity: { duration: 0.4 },
            scale: { duration: 0.4 }
          }}
          className="testimonial-wrapper"
          style={{ 
            display: 'flex', 
            width: '100%', 
            maxWidth: '100%', 
            height: '490px', 
            backgroundColor: '#10182E', 
            margin: '0 auto', 
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)', 
            borderRadius: '28px', 
            overflow: 'hidden',
            border: '1px solid rgba(10, 144, 181, 0.35)',
            flexDirection: 'row',
            position: 'relative'
          }}
        >
          {/* Left Image Showcase */}
          <div style={{ 
            flex: '1 1 45%', 
            height: '100%', 
            backgroundColor: '#0A0A0E', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            overflow: 'hidden',
            padding: '16px',
            position: 'relative'
          }}>
            <motion.img 
              initial={{ scale: 1.08 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              src={currentMember.imgsrc} 
              alt={currentMember.name} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'contain', 
                objectPosition: 'center',
                borderRadius: '20px'
              }} 
            />
          </div>

          {/* Right Member Content with Staggered Text Animations */}
          <div style={{ 
            flex: '1 1 55%', 
            padding: '52px 52px 80px 52px', 
            display: 'flex', 
            flexDirection: 'column', 
            justifyContent: 'center', 
            position: 'relative',
            background: 'linear-gradient(135deg, #10182E 0%, #22222E 100%)'
          }}>
            <motion.div initial="hidden" animate="visible" transition={{ staggerChildren: 0.12 }}>
              <motion.div variants={contentChildVariants} style={{ marginBottom: '14px' }}>
                <span 
                  className="team-position-badge"
                  style={{ 
                    color: '#0A90B5', 
                    fontSize: '13px', 
                    textTransform: 'uppercase', 
                    letterSpacing: '1.2px', 
                    fontWeight: 800,
                    backgroundColor: 'rgba(10, 144, 181, 0.15)',
                    padding: '6px 16px',
                    borderRadius: '50px',
                    border: '1px solid rgba(10, 144, 181, 0.4)',
                    whiteSpace: 'nowrap',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 'fit-content',
                    maxWidth: '100%'
                  }}
                >
                  {currentMember.position}
                </span>
              </motion.div>

              <motion.h3 
                variants={contentChildVariants}
                className="team-member-name"
                style={{ 
                  color: '#FFFFFF', 
                  fontSize: '48px', 
                  marginBottom: '14px', 
                  fontWeight: 800, 
                  fontFamily: "'Clash Display', 'Outfit', sans-serif", 
                  lineHeight: 1.1 
                }}
              >
                {currentMember.name}
              </motion.h3>

              <motion.div variants={contentChildVariants} style={{ width: '70px', height: '4px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', marginBottom: '18px', borderRadius: '2px' }}></motion.div>

              <motion.p 
                variants={contentChildVariants}
                className="team-member-bio"
                style={{ 
                  color: 'rgba(255, 255, 255, 0.88)', 
                  fontSize: '20px', 
                  lineHeight: '1.75',
                  maxWidth: '720px' 
                }}
              >
                {currentMember.bio}
              </motion.p>
            </motion.div>

            {/* Glowing Orange Navigation Control Buttons */}
            <div style={{ position: 'absolute', bottom: '36px', right: '40px', display: 'flex', gap: '14px', zIndex: 10 }}>
              <motion.button 
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                onClick={slidePrev} 
                aria-label="Previous Team Member"
                style={{ 
                  width: '52px', 
                  height: '52px', 
                  backgroundColor: '#0A90B5', 
                  border: 'none', 
                  borderRadius: '14px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 6px 18px rgba(10, 144, 181, 0.4)' 
                }}
              >
                <span style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 'bold' }}>&lt;</span>
              </motion.button>
              <motion.button 
                type="button"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.94 }}
                onClick={slideNext} 
                aria-label="Next Team Member"
                style={{ 
                  width: '52px', 
                  height: '52px', 
                  backgroundColor: '#0A90B5', 
                  border: 'none', 
                  borderRadius: '14px', 
                  cursor: 'pointer', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 6px 18px rgba(10, 144, 181, 0.4)' 
                }}
              >
                <span style={{ color: '#FFFFFF', fontSize: '22px', fontWeight: 'bold' }}>&gt;</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Interactive Dot Selector Navigation Indicator */}
      <div style={{ display: 'flex', gap: '10px', marginTop: '24px', justifyContent: 'center', alignItems: 'center' }}>
        {teamData.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            aria-label={`Go to slide ${idx + 1}`}
            style={{
              width: currentIndex === idx ? '36px' : '12px',
              height: '10px',
              borderRadius: '50px',
              backgroundColor: currentIndex === idx ? '#0A90B5' : 'rgba(255, 255, 255, 0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default TeamSlider;
