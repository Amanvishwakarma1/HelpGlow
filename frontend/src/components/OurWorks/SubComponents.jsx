import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { COLORS, WORKS } from './config';
import { styles } from './styles';

// ─── BACKGROUND FLOATING PARTICLES ───
export function FloatingParticles() {
  const points = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 4,
    dur: Math.random() * 15 + 10,
    bg: [COLORS.magenta, COLORS.pink, COLORS.orange][i % 3]
  }));

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {points.map((pt) => (
        <motion.div
          key={pt.id}
          style={{
            position: 'absolute', left: `${pt.x}%`, top: `${pt.y}%`,
            width: pt.size, height: pt.size, borderRadius: '50%',
            backgroundColor: pt.bg, opacity: 0.12
          }}
          animate={{
            y: [0, -60, 0],
            x: [0, 20, -20, 0],
            scale: [1, 1.2, 0.9, 1]
          }}
          transition={{ duration: pt.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

// ─── HIGH PERFORMANCE ADVANCED MAGNETIC TARGET BUTTON ───
export function MagneticButton({ children, style, onClick, onMouseEnter, onMouseLeave, className }) {
  const buttonRef = useRef(null);
  const transformX = useMotionValue(0);
  const transformY = useMotionValue(0);

  const springConfig = { stiffness: 180, damping: 15, mass: 0.8 };
  const smoothX = useSpring(transformX, springConfig);
  const smoothY = useSpring(transformY, springConfig);

  const handlePointerMove = (e) => {
    if (!buttonRef.current) return;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const centerPointX = left + width / 2;
    const centerPointY = top + height / 2;
    
    // Magnetic pull limits computed vector mapping
    transformX.set((e.clientX - centerPointX) * 0.35);
    transformY.set((e.clientY - centerPointY) * 0.35);
  };

  const resetTargetTracking = () => {
    transformX.set(0);
    transformY.set(0);
  };

  return (
    <motion.button
      ref={buttonRef}
      className={className}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onPointerMove={handlePointerMove}
      onPointerLeave={resetTargetTracking}
      style={{ ...style, x: smoothX, y: smoothY }}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

// ─── PERSPECTIVE CAROUSEL CARD BLOCK ───
export function WorkCard({ work, idx, activeIndex, onSelectCard, onOpenVideo }) {
  const isCurrent = idx === activeIndex;
  const isPrevious = idx === (activeIndex - 1 + WORKS.length) % WORKS.length;
  const isNext = idx === (activeIndex + 1) % WORKS.length;

  const motionVariants = {
    active: { x: '-50%', y: '-50%', scale: 1, rotateY: 0, opacity: 1, zIndex: 10 },
    prev: { x: '-125%', y: '-50%', scale: 0.8, rotateY: 20, opacity: 0.5, zIndex: 5 },
    next: { x: '25%', y: '-50%', scale: 0.8, rotateY: -20, opacity: 0.5, zIndex: 5 },
    hidden: { x: '100%', y: '-50%', scale: 0.6, opacity: 0, zIndex: 1 }
  };

  let animationState = "hidden";
  if (isCurrent) animationState = "active";
  else if (isPrevious) animationState = "prev";
  else if (isNext) animationState = "next";

  return (
    <motion.div
      variants={motionVariants}
      animate={animationState}
      transition={{ type: "spring", stiffness: 220, damping: 26 }}
      onClick={() => !isCurrent && onSelectCard(idx)}
      className={isCurrent ? "work-card-active" : ""}
      style={{
        ...styles.card,
        border: isCurrent ? `2px solid ${COLORS.gold}` : '1px solid rgba(0,0,0,0.03)',
        cursor: isCurrent ? 'default' : 'pointer'
      }}
    >
      <div style={styles.imageWrapper}>
        <div style={{ ...styles.priceBadge, background: `linear-gradient(135deg, ${COLORS.magenta} 0%, ${COLORS.pink} 100%)`, border: `1px solid ${COLORS.gold}` }}>
          <span style={styles.priceVal}>{work.price}</span>
          <span style={styles.priceUnit}>{work.unit}</span>
        </div>
        <motion.img 
          src={work.img} 
          alt={work.title} 
          style={styles.image}
          whileHover={isCurrent ? { scale: 1.05, y: -2 } : {}}
          transition={{ duration: 0.4 }}
        />
        <div style={styles.imgOverlay}></div>
      </div>
      
      <div style={styles.cardContent}>
        <h3 style={{ ...styles.cardTitle, color: COLORS.magenta }}>{work.title}</h3>
        <p style={styles.cardDesc}>{work.desc}</p>
        <div style={styles.buttonGroup}>
          <MagneticButton 
            style={{ ...styles.btnDonate, background: `linear-gradient(135deg, ${COLORS.magenta} 0%, ${COLORS.pink} 100%)` }}
            onMouseEnter={(e) => e.target.style.filter = 'brightness(1.1)'}
            onMouseLeave={(e) => e.target.style.filter = 'none'}
          >
            Donate {work.price}
          </MagneticButton>
          <MagneticButton 
            style={{ ...styles.btnDemo, color: COLORS.magenta, borderColor: COLORS.gold }} 
            onClick={() => isCurrent && onOpenVideo(work.videoUrl)}
          >
            Watch Demo
          </MagneticButton>
        </div>
      </div>
    </motion.div>
  );
}