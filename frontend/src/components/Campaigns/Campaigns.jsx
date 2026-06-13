import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusSquare, X, Camera, Search, MessageSquare, Copy, Send, Heart } from 'lucide-react';
import { COLORS, CATEGORIES } from './config';
import { styles } from './styles';
import { CardSkeleton, CampaignCard } from './SubComponents';

export default function Menu() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Modals & Drawers States
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [commentDrawerPost, setCommentDrawerPost] = useState(null);
  const [shareDrawerPost, setShareDrawerPost] = useState(null);
  const [newCommentText, setNewCommentText] = useState('');
  
  // Localized comment stores fallback caching
  const [localComments, setLocalComments] = useState({});
  const [copiedLink, setCopiedLink] = useState(false);

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('All Causes');
  const [searchQuery, setSearchQuery] = useState('');
  
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formData, setFormData] = useState({ 
    caption: '', location: '', media_url: '', is_video: false, category: 'General' 
  });

  // 🛡️ ADMIN-ONLY GATING: Checks standard role configurations
  const isAdmin = localStorage.getItem('isAdmin') === 'true' || 
                  localStorage.getItem('role') === 'admin' || 
                  localStorage.getItem('userEmail') === 'admin@helpglow.org';

  useEffect(() => { 
    loadContent(); 
  }, []);

  const getApiUrl = (path) => {
    const hostname = window.location.hostname;
    const isLocal = 
      hostname === 'localhost' || 
      hostname === '127.0.0.1' || 
      hostname === '[::1]' || 
      hostname.startsWith('192.168.') || 
      hostname.startsWith('10.') || 
      hostname.startsWith('172.') || 
      hostname.endsWith('.local');
      
    const baseUrl = isLocal ? `http://${hostname}:5000` : 'https://helpglow.onrender.com';
    return `${baseUrl}${path}`;
  };

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get(getApiUrl('/api/campaigns'));
      setPosts(res.data);
    } catch (err) { 
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All Causes' || post.category === activeCategory;
    const matchesSearch = post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    const matchedCat = CATEGORIES.find(cat => 
      cat.toLowerCase().startsWith(value.toLowerCase()) && value.length > 2
    );
    if (matchedCat) setActiveCategory(matchedCat);
  };

  const handleCreatePost = async () => {
    if (!selectedFile) {
      alert("Please select an image or video file first.");
      return;
    }
    setIsUploading(true);
    try {
      const token = localStorage.getItem('token');
      
      // 1. Upload file to Cloudinary via backend /api/upload
      const uploadData = new FormData();
      uploadData.append('file', selectedFile);
      
      const uploadRes = await axios.post(getApiUrl('/api/upload'), uploadData, {
        headers: { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: (p) => setUploadProgress(Math.round((p.loaded * 100) / p.total))
      });
      
      const cloudinaryUrl = uploadRes.data.url;
      const isVideo = uploadRes.data.is_video;
      
      // 2. Post campaign to backend with Cloudinary URL
      await axios.post(getApiUrl('/api/campaigns'), {
        ...formData,
        media_url: cloudinaryUrl,
        is_video: isVideo
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      loadContent();
      setIsUploading(false);
      setShowCreateModal(false);
      setUploadProgress(0);
      setSelectedFile(null);
      setFormData({ caption: '', location: '', media_url: '', is_video: false, category: 'General' });
    } catch (err) { 
      setIsUploading(false); 
      setUploadProgress(0);
      alert("Upload Failed: " + (err.response?.data?.error || err.message)); 
    }
  };

  // Add Comment Function with Local Fallbacks
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;

    const postId = commentDrawerPost.id || commentDrawerPost._id;
    const commentRecord = {
      username: localStorage.getItem('username') || 'helpglow_donor',
      text: newCommentText,
      timestamp: new Date().toLocaleDateString()
    };

    // Load active list, append new comment, and sync
    const activeList = localComments[postId] || [];
    const updatedList = [...activeList, commentRecord];
    
    setLocalComments(prev => ({ ...prev, [postId]: updatedList }));
    localStorage.setItem(`post_comments_${postId}`, JSON.stringify(updatedList));
    setNewCommentText('');
  };

  // Load comment details dynamically on click
  const handleOpenComments = (post) => {
    const postId = post.id || post._id;
    const cached = localStorage.getItem(`post_comments_${postId}`);
    if (cached) {
      setLocalComments(prev => ({ ...prev, [postId]: JSON.parse(cached) }));
    }
    setCommentDrawerPost(post);
  };

  const handleCopyShareLink = () => {
    const path = `${window.location.origin}/campaigns/${shareDrawerPost.id || shareDrawerPost._id}`;
    navigator.clipboard.writeText(path);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div style={{ ...styles.pageWrapper, backgroundColor: COLORS.lightPink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .skeleton { background: #fff; border-radius: 24px; border: 1px solid #fce4ec; }
        
        .instagram-input:focus {
          border-color: ${COLORS.pink} !important;
          box-shadow: 0 0 0 3px ${COLORS.pink}20 !important;
        }
      `}</style>

      {/* ── DESIGN HERO BANNER DISPLAY STRIP ── */}
      <div style={{ ...styles.heroBanner, background: `linear-gradient(135deg, ${COLORS.magenta} 0%, ${COLORS.pink} 60%, ${COLORS.orange} 100%)` }}>
        <div style={styles.heroOverlayContent}>
          <motion.h1 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={styles.heroHeading}
          >
            Explore Campaigns
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.95 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            style={styles.heroSubHeading}
          >
            Every life matters. Extend your support and ignite a spark of hope today!
          </motion.p>
        </div>
        <div style={styles.heroImageContainer}>
          <motion.img 
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7, type: "spring" }}
            src="https://i.postimg.cc/Qxfkcgsr/Whats-App-Image-2026-02-21-at-11-29-12-PM-(1).png" 
            alt="Campaign Hero" 
            style={styles.heroImg}
          />
        </div>
      </div>

      {/* ── FILTER ARCHITECTURE HEAD AREA ── */}
      <header style={styles.headerArea}>
        <h1 style={{ ...styles.mainTitle, color: COLORS.magenta }}>Causes That Matter</h1>
        
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search for a cause..." 
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search size={20} style={styles.searchIcon} color={COLORS.pink} />
        </div>

        {/* Swipeable Horizontal Scroll Nav Strip */}
        <motion.div className="no-scrollbar" style={styles.categoryNav}>
          {CATEGORIES.map((cat) => (
            <motion.button 
              key={cat} 
              onClick={() => setActiveCategory(cat)}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              style={{
                ...styles.categoryPill, 
                backgroundColor: activeCategory === cat ? COLORS.magenta : 'transparent',
                color: activeCategory === cat ? '#fff' : COLORS.magenta,
                borderColor: COLORS.magenta
              }}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>
      </header>

      {/* ── STAGGERED FEED GRID FRAME ── */}
      <main style={styles.feedContainer}>
        <motion.div 
          layout="position"
          style={styles.cardGrid}
          initial="hidden"
          animate="show"
          variants={{
            show: { transition: { staggerChildren: 0.05 } }
          }}
        >
          <AnimatePresence mode="popLayout">
            {loading ? 
              [1, 2, 3, 4, 5, 6].map(i => <CardSkeleton key={`skeleton-${i}`} />) : 
              filteredPosts.map((post) => (
                <CampaignCard 
                  key={post.id || post._id} 
                  post={post} 
                  onOpenComments={handleOpenComments}
                  onOpenShare={setShareDrawerPost}
                />
              ))
            }
          </AnimatePresence>
        </motion.div>
      </main>

      {/* ── 🛡️ ADMIN-ONLY UPLOAD FAB BUTTON ── */}
      {isAdmin && (
        <motion.button 
          className="fab-btn" 
          style={{ ...styles.fab, background: COLORS.magenta }} 
          onClick={() => setShowCreateModal(true)}
          whileHover={{ scale: 1.1, rotate: 90, filter: "brightness(1.1)" }}
          whileTap={{ scale: 0.9 }}
        >
          <PlusSquare size={28} />
        </motion.button>
      )}

      {/* ── INSTAGRAM COMMENT DRAWER MODAL ── */}
      <AnimatePresence>
        {commentDrawerPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setCommentDrawerPost(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={drawerStyles.container}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer drag chin */}
              <div style={drawerStyles.dragHandle} onClick={() => setCommentDrawerPost(null)} />
              
              <div style={drawerStyles.header}>
                <h3 style={{ margin: 0, fontWeight: '800', color: COLORS.magenta }}>Comments</h3>
                <X size={20} cursor="pointer" onClick={() => setCommentDrawerPost(null)} color="#94a3b8" />
              </div>

              {/* Comments Feed Area */}
              <div style={drawerStyles.scrollArea} className="no-scrollbar">
                {(!localComments[commentDrawerPost.id || commentDrawerPost._id] || 
                  localComments[commentDrawerPost.id || commentDrawerPost._id].length === 0) ? (
                  <div style={drawerStyles.emptyState}>
                    <MessageSquare size={40} color="#cbd5e1" style={{ marginBottom: '10px' }} />
                    <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '700' }}>No comments yet.</span>
                    <span style={{ fontSize: '11px', color: '#cbd5e1' }}>Start the conversation by typing below!</span>
                  </div>
                ) : (
                  localComments[commentDrawerPost.id || commentDrawerPost._id].map((c, i) => (
                    <div key={i} style={drawerStyles.commentRow}>
                      <div style={drawerStyles.avatarStub}>
                        {c.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div style={drawerStyles.commentBubble}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '3px' }}>
                          <strong style={{ fontSize: '12px', color: '#1e293b' }}>{c.username}</strong>
                          <span style={{ fontSize: '9px', color: '#cbd5e1' }}>{c.timestamp}</span>
                        </div>
                        <p style={{ margin: 0, fontSize: '13px', color: '#475569', lineHeight: '1.4' }}>{c.text}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Sticky Input Bar */}
              <form onSubmit={handleAddComment} style={drawerStyles.inputContainer}>
                <input 
                  type="text" 
                  placeholder="Add a comment..."
                  style={drawerStyles.input}
                  className="instagram-input"
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                />
                <button type="submit" style={{ ...drawerStyles.sendBtn, color: COLORS.pink }}>
                  Post
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INSTAGRAM SHARE SHEET DRAWER ── */}
      <AnimatePresence>
        {shareDrawerPost && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
            onClick={() => setShareDrawerPost(null)}
          >
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              style={shareStyles.container}
              onClick={(e) => e.stopPropagation()}
            >
              <div style={drawerStyles.dragHandle} onClick={() => setShareDrawerPost(null)} />
              
              <div style={drawerStyles.header}>
                <h3 style={{ margin: 0, fontWeight: '800', color: COLORS.magenta }}>Share Campaign</h3>
                <X size={20} cursor="pointer" onClick={() => setShareDrawerPost(null)} color="#94a3b8" />
              </div>

              <div style={shareStyles.body}>
                {/* Copy Link Button */}
                <div onClick={handleCopyShareLink} style={shareStyles.actionRow}>
                  <div style={shareStyles.iconCircle}>
                    <Copy size={18} color={COLORS.magenta} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>Copy Link</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Save post address to clipboard</span>
                  </div>
                  {copiedLink ? (
                    <span style={shareStyles.badge}><CheckCircle2 size={12}/> Copied</span>
                  ) : (
                    <ArrowRight size={16} color="#cbd5e1" />
                  )}
                </div>

                {/* WhatsApp Button */}
                <div 
                  onClick={() => {
                    const message = `Check out this urgent HelpGlow campaign: "${shareDrawerPost.caption}". Help us make an impact!`;
                    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
                  }} 
                  style={{ ...shareStyles.actionRow, borderBottom: 0 }}
                >
                  <div style={{ ...shareStyles.iconCircle, backgroundColor: '#e8f5e9' }}>
                    <Send size={18} color="#25D366" />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ fontSize: '14px', fontWeight: '800', color: '#1e293b' }}>Share to WhatsApp</span>
                    <span style={{ fontSize: '11px', color: '#94a3b8' }}>Send to your friends and chats</span>
                  </div>
                  <ArrowRight size={16} color="#cbd5e1" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── CAMPAIGN SUBMISSION PORTAL OVERLAY ── */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={styles.modalOverlay}
          >
            <motion.div 
              initial={{ scale: 0.92, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 15 }}
              style={{ ...styles.modalContent, border: `2px solid ${COLORS.gold}` }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <h3 style={{ color: COLORS.magenta, fontWeight: '800' }}>New Campaign Update</h3>
                <X onClick={() => setShowCreateModal(false)} cursor="pointer" color="#94a3b8" />
              </div>

              <div 
                style={{ ...styles.uploadBox, borderColor: COLORS.gold, background: COLORS.lightPink }} 
                onClick={() => fileInputRef.current.click()}
              >
                {formData.media_url ? (
                  <img src={formData.media_url} style={styles.preview} alt="Upload preview" />
                ) : (
                  <Camera color={COLORS.magenta} size={40} />
                )}
                
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  hidden 
                  accept="image/*,video/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (!file) return;
                    setSelectedFile(file);
                    const reader = new FileReader();
                    reader.onloadend = () => setFormData({ 
                      ...formData, 
                      media_url: reader.result, 
                      is_video: file.type.startsWith('video') 
                    });
                    reader.readAsDataURL(file);
                  }} 
                />
              </div>

              {/* Form Input Enhancements */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '20px' }}>
                <input 
                  type="text" 
                  placeholder="Enter Caption..." 
                  style={{ ...styles.searchInput, padding: '12px 20px', borderRadius: '12px', fontSize: '14px', border: '1px solid #edf2f7' }}
                  onChange={(e) => setFormData({ ...formData, caption: e.target.value })}
                  value={formData.caption}
                />
                <input 
                  type="text" 
                  placeholder="Enter Location (e.g. New Delhi, India)..." 
                  style={{ ...styles.searchInput, padding: '12px 20px', borderRadius: '12px', fontSize: '14px', border: '1px solid #edf2f7' }}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  value={formData.location}
                />
                <select 
                  style={{ ...styles.searchInput, padding: '12px 20px', borderRadius: '12px', fontSize: '14px', border: '1px solid #edf2f7', appearance: 'none' }}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  value={formData.category}
                >
                  {CATEGORIES.filter(c => c !== "All Causes").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <motion.button 
                whileHover={{ scale: 1.01, filter: "brightness(1.05)" }}
                whileTap={{ scale: 0.99 }}
                style={{ ...styles.submitBtn, background: `linear-gradient(to right, ${COLORS.magenta}, ${COLORS.pink})` }} 
                onClick={handleCreatePost} 
                disabled={isUploading}
              >
                {isUploading ? `Spreading Hope (${uploadProgress}%)...` : 'Post Campaign'}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── GLASSMORPHIC COMMENTS DRAWER STYLES ───
const drawerStyles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    height: '75vh',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
    boxShadow: '0 -15px 50px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '10px 25px 25px 25px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
    boxSizing: 'border-box'
  },
  dragHandle: {
    width: '40px',
    height: '5px',
    backgroundColor: '#cbd5e1',
    borderRadius: '10px',
    margin: '0 auto 15px auto',
    cursor: 'pointer'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    borderBottom: '1px solid rgba(0, 0, 0, 0.05)',
    paddingBottom: '15px'
  },
  scrollArea: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    marginBottom: '15px',
    boxSizing: 'border-box'
  },
  emptyState: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    textAlign: 'center',
    fontFamily: '"Plus Jakarta Sans", sans-serif'
  },
  commentRow: {
    display: 'flex',
    gap: '12px',
    alignItems: 'flex-start'
  },
  avatarStub: {
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: '#fce4ec',
    color: '#e61e6e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    fontWeight: '800',
    border: '1px solid #fce4ec'
  },
  commentBubble: {
    backgroundColor: '#f8fafc',
    padding: '12px 16px',
    borderRadius: '0 16px 16px 16px',
    flex: 1
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    borderTop: '1px solid rgba(0, 0, 0, 0.05)',
    paddingTop: '15px',
    marginTop: 'auto'
  },
  input: {
    flex: 1,
    padding: '14px 20px',
    borderRadius: '50px',
    border: '1.5px solid #e2e8f0',
    outline: 'none',
    fontSize: '14px',
    fontWeight: '600',
    backgroundColor: '#f8fafc',
    transition: '0.2s'
  },
  sendBtn: {
    background: 'none',
    border: 'none',
    fontWeight: '800',
    fontSize: '14px',
    cursor: 'pointer',
    padding: '0 10px'
  }
};

// ─── SHARE SHEET DRAWER STYLES ───
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const shareStyles = {
  container: {
    position: 'fixed',
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '100%',
    maxWidth: '480px',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderTopLeftRadius: '30px',
    borderTopRightRadius: '30px',
    boxShadow: '0 -15px 50px rgba(0, 0, 0, 0.15)',
    backdropFilter: 'blur(20px)',
    WebkitBackdropFilter: 'blur(20px)',
    padding: '10px 25px 35px 25px',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 1001,
    boxSizing: 'border-box'
  },
  body: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f8fafc',
    borderRadius: '20px',
    border: '1px solid #edf2f7',
    overflow: 'hidden'
  },
  actionRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px 20px',
    cursor: 'pointer',
    borderBottom: '1px solid #edf2f7',
    transition: 'background-color 0.2s',
    gap: '15px'
  },
  iconCircle: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: '#fff0f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  badge: {
    backgroundColor: '#22c55e',
    color: '#fff',
    fontSize: '10px',
    padding: '4px 10px',
    borderRadius: '50px',
    fontWeight: '700',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '3px'
  }
};