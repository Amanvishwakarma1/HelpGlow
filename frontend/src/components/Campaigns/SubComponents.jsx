import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, Send, Check, Bookmark, MoreHorizontal, MessageSquare, Copy } from 'lucide-react';
import { styles } from './styles';
import { COLORS } from './config';

// ─── CAMPAIGN SKELETON LOADER CARD ───
export function CardSkeleton() {
  return (
    <motion.div 
      style={styles.cardSkeleton}
      initial={{ opacity: 0.5 }}
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="skeleton"
    />
  );
}

// ─── INSTAGRAM-STYLE CAMPAIGN CARD ───
export function CampaignCard({ post, onOpenComments, onOpenShare }) {
  const [isLiked, setIsLiked] = useState(() => {
    const saved = localStorage.getItem(`post_liked_${post.id || post._id}`);
    return saved === 'true';
  });
  const [likesCount, setLikesCount] = useState(() => {
    // Generate a beautiful, stable base likes count
    const base = Math.floor(100 + ((post.id || 1) % 7) * 154);
    const added = localStorage.getItem(`post_liked_${post.id || post._id}`) === 'true' ? 1 : 0;
    return base + added;
  });

  const [showHeartOverlay, setShowHeartOverlay] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const lastTapRef = useRef(null);

  // Staggered entry animations
  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 150, damping: 18 } }
  };

  const handleLike = () => {
    const targetState = !isLiked;
    setIsLiked(targetState);
    setLikesCount(prev => targetState ? prev + 1 : prev - 1);
    localStorage.setItem(`post_liked_${post.id || post._id}`, targetState.toString());
  };

  // Double tap to like routine (Instagram style)
  const handleDoubleTap = (e) => {
    const now = Date.now();
    const DOUBLE_PRESS_DELAY = 300;
    if (lastTapRef.current && (now - lastTapRef.current) < DOUBLE_PRESS_DELAY) {
      if (!isLiked) {
        handleLike();
      }
      setShowHeartOverlay(true);
      setTimeout(() => setShowHeartOverlay(false), 900);
    } else {
      lastTapRef.current = now;
    }
  };

  return (
    <motion.div 
      variants={itemVariants}
      layout
      style={instagramStyles.card}
      className="cause-card"
    >
      {/* 1. Header Area: Verified Profiles */}
      <div style={instagramStyles.header}>
        <div style={instagramStyles.headerLeft}>
          <img 
            src="https://i.postimg.cc/Qxfkcgsr/Whats-App-Image-2026-02-21-at-11-29-12-PM-(1).png" 
            alt="HelpGlow Avatar" 
            style={instagramStyles.avatar}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={instagramStyles.username}>helpglow_foundation</span>
              <span style={instagramStyles.verifiedBadge}>✓</span>
            </div>
            <span style={instagramStyles.location}>{post.location || "Delhi, India"}</span>
          </div>
        </div>
        <MoreHorizontal size={18} color="#94a3b8" cursor="pointer" />
      </div>

      {/* 2. Media Area: Image & Double-Tap Heart */}
      <div 
        style={instagramStyles.mediaContainer} 
        onClick={handleDoubleTap}
      >
        <motion.img 
          src={post.media_url} 
          alt={post.caption} 
          style={instagramStyles.media} 
          loading="lazy"
        />
        
        {/* Category Badge overlay */}
        <span style={{ ...instagramStyles.catTag, background: COLORS.magenta }}>
          {post.category || "General"}
        </span>

        {/* Double-Tap Heart Overlay Animation */}
        <AnimatePresence>
          {showHeartOverlay && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 0.9, 1], opacity: [0, 0.9, 0.9, 0] }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              style={instagramStyles.doubleTapHeart}
            >
              <Heart size={80} fill={COLORS.pink} stroke={COLORS.pink} style={{ filter: 'drop-shadow(0 4px 15px rgba(230,30,110,0.5))' }} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. Action Bar Area */}
      <div style={instagramStyles.actionBar}>
        <div style={instagramStyles.actionsLeft}>
          <motion.button 
            onClick={handleLike}
            whileTap={{ scale: 0.8 }}
            style={instagramStyles.actionBtn}
          >
            <Heart 
              size={24} 
              fill={isLiked ? COLORS.pink : "none"} 
              stroke={isLiked ? COLORS.pink : "#1e293b"} 
            />
          </motion.button>
          
          <motion.button 
            onClick={() => onOpenComments(post)}
            whileTap={{ scale: 0.8 }}
            style={instagramStyles.actionBtn}
          >
            <MessageCircle size={24} color="#1e293b" />
          </motion.button>

          <motion.button 
            onClick={() => onOpenShare(post)}
            whileTap={{ scale: 0.8 }}
            style={instagramStyles.actionBtn}
          >
            <Send size={22} color="#1e293b" style={{ transform: 'rotate(-20deg)' }} />
          </motion.button>
        </div>

        <motion.button 
          onClick={() => setIsBookmarked(!isBookmarked)}
          whileTap={{ scale: 0.8 }}
          style={instagramStyles.actionBtn}
        >
          <Bookmark 
            size={24} 
            fill={isBookmarked ? COLORS.gold : "none"} 
            stroke={isBookmarked ? COLORS.gold : "#1e293b"} 
          />
        </motion.button>
      </div>

      {/* 4. Captions & Info Details */}
      <div style={instagramStyles.infoSection}>
        <span style={instagramStyles.likesText}>
          Liked by <strong>helpglow_community</strong> and <strong>{likesCount.toLocaleString()}</strong> others
        </span>

        <div style={instagramStyles.captionRow}>
          <span style={instagramStyles.boldUser}>helpglow_foundation</span>
          <span style={instagramStyles.captionText}>{post.caption}</span>
        </div>

        {/* View all comments CTA */}
        <div 
          onClick={() => onOpenComments(post)}
          style={instagramStyles.commentsLink}
        >
          View all comments
        </div>
      </div>
    </motion.div>
  );
}

// ─── INSTAGRAM EXTRA INLINE STYLES ───
import { useRef } from 'react';

const instagramStyles = {
  card: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: '24px',
    border: '1.5px solid rgba(142, 35, 130, 0.08)',
    boxShadow: '0 10px 30px -5px rgba(142, 35, 130, 0.04)',
    overflow: 'hidden',
    marginBottom: '10px'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 18px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.04)'
  },
  headerLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px'
  },
  avatar: {
    width: '38px',
    height: '38px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '1.5px solid #e61e6e',
    padding: '2px'
  },
  username: {
    fontWeight: '800',
    fontSize: '13.5px',
    color: '#1e293b',
    letterSpacing: '-0.3px'
  },
  verifiedBadge: {
    width: '13px',
    height: '13px',
    backgroundColor: '#0095f6',
    borderRadius: '50%',
    color: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '8px',
    fontWeight: 'bold'
  },
  location: {
    fontSize: '10.5px',
    color: '#94a3b8',
    fontWeight: '600'
  },
  mediaContainer: {
    width: '100%',
    aspectRatio: '1/1',
    position: 'relative',
    overflow: 'hidden',
    cursor: 'pointer',
    backgroundColor: '#fafafa'
  },
  media: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  catTag: {
    position: 'absolute',
    top: '12px',
    left: '12px',
    fontSize: '9px',
    fontWeight: '900',
    color: '#fff',
    padding: '4px 10px',
    borderRadius: '50px',
    letterSpacing: '0.8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  doubleTapHeart: {
    position: 'absolute',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    zIndex: 10
  },
  actionBar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 16px 8px 16px'
  },
  actionsLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px'
  },
  actionBtn: {
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center'
  },
  infoSection: {
    padding: '0 18px 18px 18px',
    display: 'flex',
    flexDirection: 'column',
    gap: '6px'
  },
  likesText: {
    fontSize: '12.5px',
    color: '#1e293b',
    fontWeight: '600'
  },
  captionRow: {
    fontSize: '13px',
    lineHeight: '1.4',
    color: '#334155'
  },
  boldUser: {
    fontWeight: '800',
    color: '#1e293b',
    marginRight: '6px'
  },
  captionText: {
    fontWeight: '500'
  },
  commentsLink: {
    fontSize: '12px',
    color: '#94a3b8',
    cursor: 'pointer',
    fontWeight: '700',
    marginTop: '2px'
  }
};