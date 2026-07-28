import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const images = [
  "https://i.postimg.cc/x8h7s8Kv/Whats-App-Image-2026-06-24-at-10-39-22-AM.jpg",
  "https://i.postimg.cc/tgTtK5BM/gn-(2).jpg",
  "https://i.postimg.cc/NM4STN4y/Whats-App-Image-2026-01-20-at-9-21-49-PM.jpg"
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000); // Change image every 4 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', borderRadius: 'var(--radius-xl)', minHeight: '400px', boxShadow: 'var(--shadow-floating)' }}>
      <AnimatePresence mode="popLayout">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          initial={{ opacity: 0, x: 50, scale: 1.05 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          alt={`Slider image ${currentIndex + 1}`}
        />
      </AnimatePresence>
      
      {/* Optional: Add little navigation dots at the bottom */}
      <div style={{ position: 'absolute', bottom: '20px', left: '0', right: '0', display: 'flex', justifyContent: 'center', gap: '8px', zIndex: 10 }}>
        {images.map((_, idx) => (
          <div 
            key={idx}
            style={{
              width: currentIndex === idx ? '24px' : '8px',
              height: '8px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: currentIndex === idx ? 'var(--primary)' : 'var(--bg-main)',
              opacity: currentIndex === idx ? 1 : 0.5,
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
            onClick={() => setCurrentIndex(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
