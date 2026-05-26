import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { COLORS } from './config';
import { styles } from './styles';

// ─── HARDWARE ACCELERATED HOOK COUNT ENGINE ───
export function useCountUp(target, duration = 2500, startTrigger = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!startTrigger) return;
    let startTime = null;

    const runStep = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsedTime = timestamp - startTime;
      const progress = Math.min(elapsedTime / duration, 1);
      
      const easeFormula = 1 - Math.pow(1 - progress, 4);
      
      setCount(Math.floor(easeFormula * target));
      if (progress < 1) requestAnimationFrame(runStep);
    };

    requestAnimationFrame(runStep);
  }, [target, duration, startTrigger]);

  return count;
}

// ─── ANIMATED COUNT STAT CARD ───
export function StatCard({ item, icon }) {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  const liveCount = useCountUp(item.value, 2000, isInView);
  const [isHovered, setIsHovered] = useState(false);

  // Check if the label involves money/donations
  const isMoney = item.label.toLowerCase().includes('donation') || item.label.toLowerCase().includes('raised');

  // Dynamic icon micro-animations based on label category
  const getIconAnimation = () => {
    const label = item.label.toLowerCase();
    if (label.includes('donation') || label.includes('raised') || label.includes('heart')) {
      return {
        scale: isHovered ? [1, 1.25, 1.05, 1.25, 1] : 1,
        transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
      };
    } else if (label.includes('donor') || label.includes('user')) {
      return {
        y: isHovered ? -5 : 0,
        scale: isHovered ? 1.15 : 1,
        transition: { type: "spring", stiffness: 300, damping: 15 }
      };
    } else if (label.includes('birthday') || label.includes('giving') || label.includes('cake')) {
      return {
        y: isHovered ? [0, -6, 2, -3, 0] : 0,
        rotate: isHovered ? [-8, 8, -5, 5, 0] : 0,
        transition: { duration: 0.8, ease: "easeInOut" }
      };
    } else if (label.includes('live') || label.includes('impact') || label.includes('globe')) {
      return {
        rotate: isHovered ? 360 : 0,
        scale: isHovered ? 1.1 : 1,
        transition: { 
          rotate: { repeat: Infinity, duration: 6, ease: "linear" },
          scale: { type: "spring", stiffness: 200 }
        }
      };
    } else if (label.includes('meal') || label.includes('serve') || label.includes('utensil')) {
      return {
        x: isHovered ? [-3, 3, -3, 3, -1, 1, 0] : 0,
        rotate: isHovered ? [0, 4, -4, 4, 0] : 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      };
    }
    return { scale: isHovered ? 1.15 : 1 };
  };

  return (
    <motion.div 
      ref={cardRef}
      style={styles.statCard}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{
        y: -12,
        borderColor: COLORS.gold,
        boxShadow: `0 20px 40px rgba(142, 35, 130, 0.25), 0 0 1px ${COLORS.gold}`,
        backgroundColor: 'rgba(255, 255, 255, 0.12)'
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.1 }}
    >
      <div style={{ ...styles.cardGlowOverlay, opacity: isHovered ? 1 : 0 }} />

      <motion.div 
        style={{ 
          ...styles.iconWrapper, 
          color: isHovered ? COLORS.gold : COLORS.pink,
          borderColor: isHovered ? 'rgba(212, 175, 55, 0.3)' : 'rgba(255, 255, 255, 0.05)',
          background: isHovered ? 'rgba(212, 175, 55, 0.05)' : 'rgba(255, 255, 255, 0.03)'
        }}
        animate={getIconAnimation()}
      >
        {icon}
      </motion.div>

      <h2 style={styles.statValue}>
        {isMoney ? '₹' : ''}
        {liveCount}
        {item.suffix}
      </h2>

      <p style={styles.statLabel}>{item.label}</p>
    </motion.div>
  );
}