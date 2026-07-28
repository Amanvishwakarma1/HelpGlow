import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const AnimatedMascot = ({ isPasswordFocused, isRegistering, inputValueLength = 0 }) => {
  const mascotRef = useRef(null);
  const [eyePos, setEyePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!mascotRef.current) return;
      
      const rect = mascotRef.current.getBoundingClientRect();
      const mascotCenterX = rect.left + rect.width / 2;
      const mascotCenterY = rect.top + rect.height / 2;

      const deltaX = e.clientX - mascotCenterX;
      const deltaY = e.clientY - mascotCenterY;
      
      const angle = Math.atan2(deltaY, deltaX);
      const distance = Math.min(Math.hypot(deltaX, deltaY) / 25, 12); // max 12px displacement

      setEyePos({
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      ref={mascotRef}
      style={{ position: 'relative', width: '160px', height: '160px', margin: '0 auto -20px auto', zIndex: 10 }}
    >
      <svg 
        viewBox="0 0 200 200" 
        style={{ width: '100%', height: '100%', overflow: 'visible' }}
      >
        
        {/* Soft Shadow Base */}
        <ellipse cx="100" cy="188" rx="65" ry="10" fill="rgba(0,0,0,0.15)" />

        {/* Head Group Motion: Whole Head Shift (X, Y, Rotate) following user cursor */}
        <motion.g
          animate={{
            x: isPasswordFocused ? 0 : eyePos.x * 1.5,
            y: isPasswordFocused ? 0 : eyePos.y * 1.5,
            rotate: isPasswordFocused ? 0 : eyePos.x * 1.2
          }}
          transition={{ type: "spring", stiffness: 220, damping: 20 }}
          style={{ transformOrigin: '100px 105px' }}
        >
          {/* Outer Ears */}
          <motion.circle 
            cx="45" cy="45" r="28" fill="#10182E" 
            animate={{ scale: isPasswordFocused ? 1.05 : 1 }} 
          />
          <circle cx="45" cy="45" r="14" fill="#0A90B5" opacity="0.8" />

          <motion.circle 
            cx="155" cy="45" r="28" fill="#10182E" 
            animate={{ scale: isPasswordFocused ? 1.05 : 1 }} 
          />
          <circle cx="155" cy="45" r="14" fill="#0A90B5" opacity="0.8" />

          {/* Head Base */}
          <circle cx="100" cy="105" r="68" fill="#FFFFFF" stroke="#10182E" strokeWidth="6" />

          {/* Blush Cheeks */}
          <circle cx="60" cy="120" r="12" fill="#0A90B5" opacity="0.25" />
          <circle cx="140" cy="120" r="12" fill="#0A90B5" opacity="0.25" />

          {/* Dark Eye Patches */}
          <ellipse cx="68" cy="94" rx="20" ry="24" fill="#10182E" transform="rotate(-12 68 94)" />
          <ellipse cx="132" cy="94" rx="20" ry="24" fill="#10182E" transform="rotate(12 132 94)" />

          {/* Eye Balls & Pupils (Tracking Mouse Cursor across Screen) */}
          {!isPasswordFocused && (
            <g>
              {/* White Cornea */}
              <circle cx="68" cy="94" r="9" fill="#FFFFFF" />
              <circle cx="132" cy="94" r="9" fill="#FFFFFF" />

              {/* Pupils Dynamically Following Mouse Cursor */}
              <motion.circle 
                cx={68} cy={94} r="5" fill="#10182E"
                animate={{ cx: 68 + eyePos.x, cy: 94 + eyePos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
              <motion.circle 
                cx={132} cy={94} r="5" fill="#10182E"
                animate={{ cx: 132 + eyePos.x, cy: 94 + eyePos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />

              {/* Sparkle Glints Following Pupils */}
              <motion.circle 
                cx={70} cy={92} r="2" fill="#FFFFFF" 
                animate={{ cx: 70 + eyePos.x, cy: 92 + eyePos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
              <motion.circle 
                cx={134} cy={92} r="2" fill="#FFFFFF" 
                animate={{ cx: 134 + eyePos.x, cy: 92 + eyePos.y }}
                transition={{ type: "spring", stiffness: 350, damping: 25 }}
              />
            </g>
          )}

          {/* Closed Eyes (When Password Field Focused) */}
          {isPasswordFocused && (
            <g>
              <path d="M 58 94 Q 68 88 78 94" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M 122 94 Q 132 88 142 94" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
            </g>
          )}

          {/* Nose */}
          <ellipse cx="100" cy="115" rx="9" ry="6" fill="#10182E" />
          <ellipse cx="98" cy="113" rx="3" ry="1.5" fill="#FFFFFF" opacity="0.6" />

          {/* Mouth */}
          <path d="M 100 121 L 100 126" fill="none" stroke="#10182E" strokeWidth="3.5" strokeLinecap="round" />
          <path 
            d={isPasswordFocused ? "M 90 128 Q 100 138 110 128" : "M 88 127 Q 100 136 112 127"} 
            fill={isPasswordFocused ? "#0A90B5" : "none"} 
            stroke="#10182E" 
            strokeWidth="3.5" 
            strokeLinecap="round" 
          />
        </motion.g>

        {/* Interactive Paws (Covering Eyes when Password Focused) */}
        {/* Left Paw */}
        <motion.g
          initial={false}
          animate={{
            x: isPasswordFocused ? 18 : -14 + (isPasswordFocused ? 0 : eyePos.x * 1.2),
            y: isPasswordFocused ? -32 : 36 + (isPasswordFocused ? 0 : eyePos.y * 1.2),
            rotate: isPasswordFocused ? 22 : -15
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <ellipse cx="50" cy="148" rx="22" ry="26" fill="#10182E" stroke="#FFFFFF" strokeWidth="3" />
          {/* Pink Paw Pads */}
          <ellipse cx="50" cy="148" rx="10" ry="12" fill="#0A90B5" opacity="0.85" />
          <circle cx="42" cy="132" r="3.5" fill="#0A90B5" opacity="0.85" />
          <circle cx="50" cy="130" r="3.5" fill="#0A90B5" opacity="0.85" />
          <circle cx="58" cy="132" r="3.5" fill="#0A90B5" opacity="0.85" />
        </motion.g>

        {/* Right Paw */}
        <motion.g
          initial={false}
          animate={{
            x: isPasswordFocused ? -18 : 14 + (isPasswordFocused ? 0 : eyePos.x * 1.2),
            y: isPasswordFocused ? -32 : 36 + (isPasswordFocused ? 0 : eyePos.y * 1.2),
            rotate: isPasswordFocused ? -22 : 15
          }}
          transition={{ type: "spring", stiffness: 220, damping: 18 }}
        >
          <ellipse cx="150" cy="148" rx="22" ry="26" fill="#10182E" stroke="#FFFFFF" strokeWidth="3" />
          {/* Pink Paw Pads */}
          <ellipse cx="150" cy="148" rx="10" ry="12" fill="#0A90B5" opacity="0.85" />
          <circle cx="142" cy="132" r="3.5" fill="#0A90B5" opacity="0.85" />
          <circle cx="150" cy="130" r="3.5" fill="#0A90B5" opacity="0.85" />
          <circle cx="158" cy="132" r="3.5" fill="#0A90B5" opacity="0.85" />
        </motion.g>

      </svg>
    </div>
  );
};

export default AnimatedMascot;
