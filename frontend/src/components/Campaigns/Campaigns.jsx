import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  PlusSquare, X, Camera, Search 
} from 'lucide-react';

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  const [activeCategory, setActiveCategory] = useState('All Causes');
  const [searchQuery, setSearchQuery] = useState('');
  
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ 
    caption: '', location: '', media_url: '', is_video: false, category: 'General' 
  });

  // Branded Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightPink: '#fff5f8'
  };

  const categories = [
    "All Causes", "Birthday Giving", "Anniversary Giving", "Animal", 
    "Giving To The Needy", "Nature", "Valentine's Day Giving", 
    "Memorial Giving", "Women Care", "Education"
  ];

  useEffect(() => { loadContent(); }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://helpglow.onrender.com/api/campaigns');
      setPosts(res.data.filter(item => !item.is_video));
      setTimeout(() => setLoading(false), 1000);
    } catch (err) { 
      console.error(err); 
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
    const matchedCat = categories.find(cat => 
      cat.toLowerCase().startsWith(value.toLowerCase()) && value.length > 2
    );
    if (matchedCat) setActiveCategory(matchedCat);
  };

  const handleCreatePost = async () => {
    setIsUploading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('https://helpglow.onrender.com/api/campaigns', formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (p) => setUploadProgress(Math.round((p.loaded * 100) / p.total))
      });
      loadContent();
      setIsUploading(false);
      setShowCreateModal(false);
      setUploadProgress(0);
    } catch (err) { 
      setIsUploading(false); 
      alert("Upload Failed"); 
    }
  };

  return (
    <div style={{...styles.pageWrapper, backgroundColor: colors.lightPink}}>
      {/* 1. HERO SECTION (Branded Theme) */}
      <div style={{...styles.heroBanner, background: `linear-gradient(135deg, ${colors.magenta} 0%, ${colors.pink} 60%, ${colors.orange} 100%)`}}>
        <div style={styles.heroOverlayContent}>
          <h1 style={styles.heroHeading}>Explore Campaigns</h1>
          <p style={styles.heroSubHeading}>Every life matters. Extend your support and ignite a spark of hope today!</p>
        </div>
        <div style={styles.heroImageContainer}>
          <img 
            src="https://i.postimg.cc/Qxfkcgsr/Whats-App-Image-2026-02-21-at-11-29-12-PM-(1).png" 
            alt="Campaign Hero" 
            style={styles.heroImg}
          />
        </div>
      </div>

      <header style={styles.headerArea}>
        <h1 style={{...styles.mainTitle, color: colors.magenta}}>Causes That Matter</h1>
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search for a cause..." 
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search size={20} style={styles.searchIcon} color={colors.pink} />
        </div>

        <div className="no-scrollbar" style={styles.categoryNav}>
          {categories.map((cat) => (
            <button 
              key={cat} 
              className="category-pill"
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.categoryPill, 
                backgroundColor: activeCategory === cat ? colors.magenta : 'transparent',
                color: activeCategory === cat ? '#fff' : colors.magenta,
                borderColor: colors.magenta
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <main style={styles.feedContainer}>
        <div style={styles.cardGrid}>
          {loading ? [1,2,3,4].map(i => <div key={i} className="skeleton" style={styles.cardSkeleton} />) : 
            filteredPosts.map((post) => (
              <div key={post.id} className="cause-card" style={{...styles.causeCard, border: `1px solid ${colors.gold}40`}}>
                <div className="card-image-bg" style={{...styles.cardImage, backgroundImage: `url(${post.media_url})`}}>
                  <div style={styles.whatsappBadge} onClick={() => window.open('https://wa.me/message/ZMTBXKUYV7MWB1')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" alt="WA" />
                  </div>
                  <div style={styles.cardOverlay}>
                    <span style={{...styles.cardCatTag, background: colors.gold}}>{post.category}</span>
                    <p style={styles.cardCaption}>{post.caption}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </main>

      <button className="fab-btn" style={{...styles.fab, background: colors.magenta}} onClick={() => setShowCreateModal(true)}>
        <PlusSquare size={28} />
      </button>

      {/* MODAL SECTION */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div className="modal-content-branded" style={{...styles.modalContent, border: `2px solid ${colors.gold}`}}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'20px'}}>
              <h3 style={{color: colors.magenta, fontWeight: '800'}}>New Campaign Update</h3>
              <X onClick={() => setShowCreateModal(false)} cursor="pointer" color="#94a3b8" />
            </div>
            <div style={{...styles.uploadBox, borderColor: colors.gold, background: colors.lightPink}} onClick={() => fileInputRef.current.click()}>
              {formData.media_url ? <img src={formData.media_url} style={styles.preview} alt="" /> : <Camera color={colors.magenta} size={40} />}
              <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                const file = e.target.files[0];
                if (!file) return;
                const reader = new FileReader();
                reader.onloadend = () => setFormData({ ...formData, media_url: reader.result, is_video: file.type.startsWith('video') });
                reader.readAsDataURL(file);
              }} />
            </div>
            <button className="submit-btn" style={{...styles.submitBtn, background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`}} onClick={handleCreatePost} disabled={isUploading}>
              {isUploading ? 'Spreading Hope...' : 'Post Campaign'}
            </button>
          </div>
        </div>
      )}

      {/* RESTORED CSS EFFECTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; transition: all 0.3s ease; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .cause-card { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease; cursor: pointer; }
        .cause-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(142, 35, 130, 0.2); }
        .card-image-bg { transition: transform 0.6s ease; }
        .cause-card:hover .card-image-bg { transform: scale(1.1); }

        .category-pill:hover { transform: scale(1.05); filter: brightness(1.1); }

        .fab-btn { transition: transform 0.4s ease, background-color 0.3s ease; }
        .fab-btn:hover { transform: rotate(90deg) scale(1.15); filter: brightness(1.2); }

        .submit-btn:hover { filter: brightness(1.1); transform: translateY(-2px); }

        .skeleton { animation: pulse 1.5s infinite ease-in-out; background: #fff; border-radius: 28px; border: 1px solid #fce4ec; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', overflowX: 'hidden' },
  
  heroBanner: {
    width: '100%',
    height: '400px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10%',
    position: 'relative',
    color: '#fff',
    marginBottom: '20px'
  },
  heroOverlayContent: { zIndex: 2, flex: 1 },
  heroHeading: { fontSize: 'clamp(40px, 6vw, 64px)', fontWeight: '900', margin: 0, lineHeight: '1.1', letterSpacing: '-2px' },
  heroSubHeading: { fontSize: '20px', fontWeight: '500', marginTop: '18px', maxWidth: '500px', opacity: 0.95 },
  heroImageContainer: { height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 },
  heroImg: { height: '90%', objectFit: 'contain', filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.2))' },

  headerArea: { textAlign: 'center', padding: '50px 20px 30px', backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)' },
  mainTitle: { fontSize: '38px', fontWeight: '900', marginBottom: '25px', letterSpacing: '-1px' },
  
  searchContainer: { 
    position: 'relative', maxWidth: '600px', margin: '0 auto 35px',
    boxShadow: '0 15px 35px rgba(142, 35, 130, 0.1)', borderRadius: '50px'
  },
  searchInput: { 
    width: '100%', padding: '20px 35px', borderRadius: '50px', 
    border: '1.5px solid transparent', outline: 'none', fontSize: '16px',
    backgroundColor: '#fdfcfd'
  },
  searchIcon: { position: 'absolute', right: '25px', top: '22px' },

  categoryNav: { 
    display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0 20px', 
    maxWidth: '1200px', margin: '0 auto', scrollBehavior: 'smooth'
  },
  categoryPill: { 
    padding: '14px 32px', borderRadius: '50px', whiteSpace: 'nowrap', 
    fontSize: '14px', fontWeight: '800', cursor: 'pointer',
    border: '2.5px solid', transition: '0.3s'
  },

  feedContainer: { maxWidth: '1400px', margin: '40px auto', padding: '0 20px 100px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' },
  causeCard: { borderRadius: '32px', overflow: 'hidden', height: '480px', position: 'relative', backgroundColor: '#fff' },
  cardImage: { height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' },
  
  cardOverlay: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '35px', 
    background: 'linear-gradient(transparent, rgba(142, 35, 130, 0.95))', color: '#fff' 
  },
  cardCatTag: { fontSize: '11px', padding: '6px 16px', borderRadius: '50px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '1px' },
  cardCaption: { marginTop: '18px', fontSize: '17px', fontWeight: '700', lineHeight: '1.4' },

  whatsappBadge: {
    position: 'absolute', top: '25px', right: '25px', backgroundColor: '#25D366', 
    width: '50px', height: '50px', borderRadius: '50%', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5,
    boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
  },

  fab: {
    position: 'fixed', bottom: '50px', right: '50px', width: '75px', height: '75px',
    borderRadius: '50%', color: '#fff', border: 'none',
    boxShadow: '0 15px 35px rgba(142, 35, 130, 0.3)', cursor: 'pointer', zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(26, 10, 24, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(10px)' },
  modalContent: { background: '#fff', padding: '40px', borderRadius: '35px', width: '90%', maxWidth: '500px' },
  uploadBox: { height: '260px', border: '2.5px dashed', borderRadius: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', overflow: 'hidden' },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  submitBtn: { width: '100%', padding: '20px', color: '#fff', border: 'none', borderRadius: '50px', marginTop: '30px', fontWeight: '900', fontSize: '16px', letterSpacing: '1px' },
  cardSkeleton: { height: '480px', width: '100%' }
};

export default Menu;