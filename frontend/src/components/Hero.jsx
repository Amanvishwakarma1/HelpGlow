import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import slide1 from '../assets/slide1.mp4';
import slide2 from '../assets/slide2.mp4';
import slide3 from '../assets/slide3.mp4';

const videoList = [slide1, slide2, slide3];

const Hero = () => {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  // Auto-switch background videos every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentVideoIndex((prev) => (prev + 1) % videoList.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
  };

  return (
    <div className="home-hero-section" style={{ position: 'relative', overflow: 'hidden', minHeight: '650px', backgroundColor: '#000000' }}>
      
      {/* Background Video Slider Layer */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 1 }}>
        <AnimatePresence mode="wait">
          <motion.video
            key={currentVideoIndex}
            src={videoList[currentVideoIndex]}
            autoPlay
            loop
            muted
            playsInline
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center'
            }}
          />
        </AnimatePresence>

        {/* Dark Gradient Overlay for Contrast & Privacy */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.65) 0%, rgba(0, 0, 0, 0.55) 50%, rgba(0, 0, 0, 0.85) 100%)',
            zIndex: 2,
            pointerEvents: 'none'
          }}
        />
      </div>

      {/* Hero Content Overlay */}
      <div className="wrapper-1200px home-hero-flex" style={{ position: 'relative', zIndex: 10, paddingTop: '140px', paddingBottom: '120px' }}>
        <motion.div 
          className="home-hero-wrapper"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ textAlign: 'center', maxWidth: '850px', margin: '0 auto' }}
        >
          <h1 className="h1-heading-white margin-bottom-20px" style={{ color: '#FFFFFF', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>Be</motion.span>{' '}
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>the</motion.span>{' '}
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>change.</motion.span> <br />
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>Donate</motion.span>{' '}
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>for</motion.span>{' '}
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>a</motion.span>{' '}
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>better</motion.span>{' '}
            <motion.span variants={itemVariants} className="hero-heading-text-span" style={{ display: 'inline-block' }}>tomorrow.</motion.span>
          </h1>

          <motion.div variants={itemVariants} className="max-width-container-770px" style={{ margin: '0 auto 28px auto' }}>
            <div className="hero-paragraph-wrapper">
              <div className="text-block-20px-white" style={{ color: 'rgba(255, 255, 255, 0.9)', fontSize: '20px', lineHeight: '1.7', textShadow: '0 2px 10px rgba(0,0,0,0.6)' }}>
                Help us build a future that value all human lives. Join us on our 400+ welfare projects on education, healthcare, and livelihood.
              </div>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="button-hero-wrapper" style={{ display: 'flex', justifyContent: 'center' }}>
            <a 
              href="#donate" 
              className="primary-button-with-icon w-inline-block" 
              style={{ 
                background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)', 
                boxShadow: '0 8px 24px rgba(10, 144, 181, 0.4), 0 4px 12px rgba(217, 91, 40, 0.3)',
                borderRadius: '50px'
              }}
            >
              <div className="button-text">Donate Now</div>
              <img src="https://cdn.prod.website-files.com/61f3c8415b08f243cf83a932/61f3db66c57203a7d81cb458_arrow-left-line%201.svg" loading="lazy" alt="" className="arrow-icon" />
            </a>
          </motion.div>
        </motion.div>

        {/* Video Slider Indicators */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '36px' }}>
          {videoList.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentVideoIndex(idx)}
              aria-label={`Switch to background video ${idx + 1}`}
              style={{
                width: currentVideoIndex === idx ? '36px' : '10px',
                height: '8px',
                borderRadius: '50px',
                background: currentVideoIndex === idx ? 'linear-gradient(90deg, #0A90B5, #D95B28)' : 'rgba(255, 255, 255, 0.4)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
