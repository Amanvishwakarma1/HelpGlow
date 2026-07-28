import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CauseCard = ({ label, title, description, para, image, img, raised, target, link, variants }) => {
  const displayImage = img || image;
  const displayDesc = para || description;
  const displayLabel = label || "FEATURED CAUSE";
  const hasFundingData = raised !== undefined && target !== undefined;

  const cardMotionVariants = variants || {
    hidden: { opacity: 0, y: 70, scale: 0.93 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.1, ease: [0.22, 1, 0.36, 1] } 
    }
  };

  return (
    <motion.div 
      variants={cardMotionVariants}
      whileHover={{ y: -10, scale: 1.025 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      role="listitem" 
      className="donate-collection-item w-dyn-item"
      style={{ display: 'flex', height: '100%' }}
    >
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          height: '100%', 
          width: '100%',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid #E5EDF5',
          boxShadow: '0 10px 30px rgba(6, 103, 142, 0.08)',
          position: 'relative'
        }}
      >
        {/* Uniform Edge-to-Edge Image Header */}
        <div style={{ width: '100%', height: '240px', overflow: 'hidden', position: 'relative', backgroundColor: '#F3F4F6' }}>
          <motion.img 
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            src={displayImage} 
            loading="lazy" 
            alt={title} 
            style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'fill', 
              objectPosition: 'center',
              display: 'block'
            }} 
          />
          {/* Floating Category Pill Tag */}
          <div style={{
            position: 'absolute',
            top: '16px',
            left: '16px',
            backgroundColor: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(10px)',
            color: '#0A90B5',
            padding: '6px 16px',
            borderRadius: '50px',
            fontSize: '11px',
            fontWeight: 800,
            letterSpacing: '1.2px',
            border: '1px solid rgba(10, 144, 181, 0.4)',
            textTransform: 'uppercase'
          }}>
            ✨ {displayLabel}
          </div>
        </div>

        {/* Card Content Wrapper */}
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, padding: '28px', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ 
              fontFamily: "'Clash Display', 'Outfit', sans-serif", 
              fontSize: '22px', 
              fontWeight: 800, 
              color: '#111827', 
              margin: '0 0 12px 0',
              lineHeight: 1.3
            }}>
              {title}
            </h3>
            <p style={{ 
              fontSize: '15.5px', 
              lineHeight: '1.7', 
              color: '#4B5563', 
              margin: '0 0 24px 0' 
            }}>
              {displayDesc}
            </p>

            {hasFundingData && (
              <div style={{ marginBottom: '24px' }}>
                <div style={{ width: '100%', height: '8px', backgroundColor: '#F3F4F6', borderRadius: '50px', overflow: 'hidden', marginBottom: '10px' }}>
                  <div style={{ width: `${Math.round((raised / target) * 100)}%`, height: '100%', background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)', borderRadius: '50px' }}></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: 700, color: '#6B7280' }}>
                  <span>₹{raised} RAISED OF ₹{target}</span>
                  <span style={{ color: '#0A90B5' }}>{Math.round((raised / target) * 100)}%</span>
                </div>
              </div>
            )}
          </div>
          
          {/* Action Button Redirecting to /menu */}
          <Link 
            to="/menu" 
            style={{ 
              background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)', 
              color: '#FFFFFF', 
              padding: '14px 28px', 
              borderRadius: '50px', 
              fontSize: '15px', 
              fontWeight: 800, 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '8px',
              marginTop: 'auto',
              boxShadow: '0 6px 20px rgba(10, 144, 181, 0.25), 0 2px 8px rgba(217, 91, 40, 0.2)',
              transition: 'all 0.25s ease'
            }}
          >
            <Heart size={18} fill="#FFFFFF" />
            Sponsor Cause Now
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CauseCard;
