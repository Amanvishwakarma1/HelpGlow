import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, useInView } from 'framer-motion';
import { COLORS, WORKS, IMPACT_STORIES, coreValuesData } from './config';
import { styles } from './styles';
import { FloatingParticles, WorkCard } from './SubComponents';

export default function OurWorks() {
  const [index, setIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  
  const [displayText, setDisplayText] = useState("");
  const fullText = "Our core values";

  // Intersection View Tracking Hooks for clean staggered scroll animations
  const headerRef = useRef(null);
  const valueSectionRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });
  const valuesInView = useInView(valueSectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Text Typewriter Track Trigger
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  // Carousel Frame Timer Track
  useEffect(() => {
    if (!activeVideo) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % WORKS.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [activeVideo]);

  // Global Multi-Story Interval System
  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % IMPACT_STORIES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={{ ...styles.section, backgroundColor: COLORS.lightPink }}>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor-blink {
            animation: blink 0.8s infinite;
          }
          .work-card-active:hover {
            transform: translate(-50%, -54%) scale(1.02) !important;
            box-shadow: 0 40px 80px rgba(142, 35, 130, 0.22) !important;
          }
        `}
      </style>

      {/* Dynamic Background Layout Canvas Component */}
      <FloatingParticles />

      {/* ── VIDEO INTERACTIVE PORTAL LAYOUT MODAL ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay} 
            onClick={() => setActiveVideo(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 15 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              style={{ ...styles.modalContent, border: `2px solid ${COLORS.gold}` }} 
              onClick={(e) => e.stopPropagation()}
            >
              <button style={{ ...styles.closeBtn, color: COLORS.magenta }} onClick={() => setActiveVideo(null)}>✕</button>
              <div style={styles.videoWrapper}>
                <iframe 
                  style={styles.iframe} 
                  src={`${activeVideo}?autoplay=1`} 
                  title="Impact Video" 
                  frameBorder="0" 
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── HEADING DISPLAY ENGINE MODULE ── */}
      <motion.div 
        ref={headerRef}
        initial={{ opacity: 0, y: 35 }}
        animate={headerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={styles.header}
      >
        <h2 style={{ ...styles.heading, color: COLORS.magenta }}>Our Impactful Works</h2>
        <motion.div 
          initial={{ scaleX: 0 }}
          animate={headerInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{ ...styles.underline, background: `linear-gradient(to right, ${COLORS.magenta}, ${COLORS.pink}, ${COLORS.orange})`, transformOrigin: "center" }}
        ></motion.div>
        <p style={styles.subText}>Your kindness, their future. Explore our journey.</p>
      </motion.div>

      {/* ── CORE COMPONENT SLIDER DISPLAY SECTION ── */}
      <div style={styles.sliderContainer}>
        <div style={styles.sliderWrapper}>
          <div style={styles.cardsContainer}>
            {WORKS.map((work, i) => (
              <WorkCard 
                key={work.id}
                work={work}
                idx={i}
                activeIndex={index}
                onSelectCard={setIndex}
                onOpenVideo={setActiveVideo}
              />
            ))}
          </div>
        </div>

        {/* Slideline Dot Array Pagination Blocks */}
        <div style={styles.dotContainer}>
          {WORKS.map((_, i) => (
            <motion.button 
              key={i} 
              onClick={() => setIndex(i)} 
              animate={{ 
                width: index === i ? 35 : 10,
                backgroundColor: index === i ? COLORS.magenta : '#cbd5e1'
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              style={styles.dot} 
            />
          ))}
        </div>
      </div>
      
      <hr style={styles.divider} />

      {/* ── STORIES TRANSITION LAYOUT CONTAINER SECTION ── */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.8 }}
        style={{ ...styles.impactSection, maxWidth: isMobile ? '95%' : '1200px', border: `1px solid ${COLORS.gold}50` }}
      >
        <div style={{ ...styles.impactGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
          <div style={{ ...styles.impactImageContainer, height: isMobile ? '300px' : 'auto' }}>
            <AnimatePresence mode="wait">
              <motion.img 
                key={`img-${storyIndex}`}
                src={IMPACT_STORIES[storyIndex].img} 
                alt="Our mission" 
                style={styles.impactImg}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.6 }}
              />
            </AnimatePresence>
          </div>

          <div style={{ ...styles.impactTextContainer, padding: isMobile ? '40px 20px' : '70px' }}>
            <h4 style={{ ...styles.storyLabel, color: COLORS.magenta }}>Why Donate?</h4>
            <h5 style={styles.impactCategory}>{IMPACT_STORIES[storyIndex].label}</h5>
            
            <div style={{ minHeight: isMobile ? '140px' : '220px' }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={`text-block-${storyIndex}`}
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 style={{ ...styles.impactTitle, fontSize: isMobile ? '2.2rem' : '3.2rem', color: COLORS.magenta }}>
                    {IMPACT_STORIES[storyIndex].title}
                  </h2>
                  <p style={{ ...styles.impactPara, fontSize: isMobile ? '1.1rem' : '1.4rem' }}>
                    {IMPACT_STORIES[storyIndex].para}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
            
            <div style={styles.miniDotContainer}>
              {IMPACT_STORIES.map((_, i) => (
                <motion.div 
                  key={i} 
                  onClick={() => setStoryIndex(i)}
                  animate={{ scale: storyIndex === i ? 1.25 : 1 }}
                  style={{ ...styles.miniDot, backgroundColor: storyIndex === i ? COLORS.pink : '#cbd5e1' }} 
                />
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── CORE VALUE INTERACTION GRID DISPLAY SECTION ── */}
      <div ref={valueSectionRef} style={styles.valuesContainer}>
        <h2 style={{ ...styles.writingHeading, color: COLORS.magenta }}>
          {displayText}
          <span className="cursor-blink" style={{ ...styles.cursor, backgroundColor: COLORS.pink }}>|</span>
        </h2>
        
        <motion.div style={styles.valuesGrid}>
          {coreValuesData.map((val, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 30 }}
              animate={valuesInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: idx * 0.08, duration: 0.6 }}
              whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px rgba(230, 30, 110, 0.15)",
                borderColor: COLORS.gold
              }}
              style={styles.valueCard}
            >
              <div style={styles.valueIcon}>{val.icon}</div>
              <h3 style={{ ...styles.valueTitle, color: COLORS.magenta }}>{val.title}</h3>
              <p style={styles.valueDesc}>{val.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}