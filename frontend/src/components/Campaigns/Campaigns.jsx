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
    <div style={styles.pageWrapper}>
      {/* 1. HERO SECTION (Sky Blue Theme) */}
      <div style={styles.heroBanner}>
        <div style={styles.heroOverlayContent}>
          <h1 style={styles.heroHeading}>Explore Campaigns</h1>
          <p style={styles.heroSubHeading}>Every life matters. Extend your support to save a life!</p>
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
        <h1 style={styles.mainTitle}>Causes That Matter</h1>
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search for a cause..." 
            style={styles.searchInput}
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <Search size={20} style={styles.searchIcon} color="#0ea5e9" />
        </div>

        <div className="no-scrollbar" style={styles.categoryNav}>
          {categories.map((cat) => (
            <button 
              key={cat} 
              className="category-pill"
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.categoryPill, 
                backgroundColor: activeCategory === cat ? '#0ea5e9' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#0ea5e9',
                borderColor: '#0ea5e9'
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
              <div key={post.id} className="cause-card" style={styles.causeCard}>
                <div className="card-image-bg" style={{...styles.cardImage, backgroundImage: `url(${post.media_url})`}}>
                  <div style={styles.whatsappBadge} onClick={() => window.open('https://wa.me/message/ZMTBXKUYV7MWB1')}>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" width="20" alt="WA" />
                  </div>
                  <div style={styles.cardOverlay}>
                    <span style={styles.cardCatTag}>{post.category}</span>
                    <p style={styles.cardCaption}>{post.caption}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>
      </main>

      <button className="fab-btn" style={styles.fab} onClick={() => setShowCreateModal(true)}>
        <PlusSquare size={28} />
      </button>

      {/* MODAL SECTION */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
              <h3 style={{color: '#0f172a'}}>New Campaign Post</h3>
              <X onClick={() => setShowCreateModal(false)} cursor="pointer" color="#64748b" />
            </div>
            <div style={styles.uploadBox} onClick={() => fileInputRef.current.click()}>
              {formData.media_url ? <img src={formData.media_url} style={styles.preview} alt="" /> : <Camera color="#0ea5e9" size={40} />}
              <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setFormData({ ...formData, media_url: reader.result, is_video: file.type.startsWith('video') });
                reader.readAsDataURL(file);
              }} />
            </div>
            <button className="submit-btn" style={styles.submitBtn} onClick={handleCreatePost} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Post Campaign'}
            </button>
          </div>
        </div>
      )}

      {/* RESTORED CSS EFFECTS */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; transition: all 0.3s ease; }
        
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        /* Restore Card Zoom Effect */
        .cause-card { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease; cursor: pointer; }
        .cause-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2); }
        .card-image-bg { transition: transform 0.6s ease; }
        .cause-card:hover .card-image-bg { transform: scale(1.1); }

        /* Category Pill Hover */
        .category-pill:hover { transform: scale(1.05); filter: brightness(1.1); }

        /* FAB Button Effect */
        .fab-btn { transition: transform 0.3s ease, background-color 0.3s ease; }
        .fab-btn:hover { transform: rotate(90deg) scale(1.1); background-color: #0284c7 !important; }

        /* Submit Button Effect */
        .submit-btn:hover { background-color: #0284c7 !important; transform: translateY(-2px); }

        .skeleton { animation: pulse 1.5s infinite ease-in-out; background: #f0f9ff; border-radius: 20px; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', backgroundColor: '#f8fafc', overflowX: 'hidden' },
  
  heroBanner: {
    width: '100%',
    height: '400px',
    background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 60%, #bae6fd 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 10%',
    position: 'relative',
    color: '#fff',
    marginBottom: '20px'
  },
  heroOverlayContent: { zIndex: 2, flex: 1 },
  heroHeading: { fontSize: '64px', fontWeight: '800', margin: 0, lineHeight: '1.1', textShadow: '0 4px 10px rgba(0,0,0,0.1)' },
  heroSubHeading: { fontSize: '22px', fontWeight: '400', marginTop: '18px', maxWidth: '500px', opacity: 0.95 },
  heroImageContainer: { height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', flex: 1 },
  heroImg: { height: '100%', objectFit: 'contain', filter: 'drop-shadow(0 15px 35px rgba(0,0,0,0.1))' },

  headerArea: { textAlign: 'center', padding: '40px 20px 20px', backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' },
  mainTitle: { fontSize: '36px', color: '#0f172a', fontWeight: '800', marginBottom: '25px' },
  
  searchContainer: { 
    position: 'relative', maxWidth: '600px', margin: '0 auto 30px',
    boxShadow: '0 10px 30px rgba(14, 165, 233, 0.1)', borderRadius: '50px'
  },
  searchInput: { 
    width: '100%', padding: '18px 30px', borderRadius: '50px', 
    border: '2px solid transparent', outline: 'none', fontSize: '16px',
    backgroundColor: '#f8fafc'
  },
  searchIcon: { position: 'absolute', right: '25px', top: '20px' },

  categoryNav: { 
    display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0 20px', 
    maxWidth: '1200px', margin: '0 auto', scrollBehavior: 'smooth'
  },
  categoryPill: { 
    padding: '12px 28px', borderRadius: '50px', whiteSpace: 'nowrap', 
    fontSize: '14px', fontWeight: '600', cursor: 'pointer',
    border: '2px solid transparent'
  },

  feedContainer: { maxWidth: '1400px', margin: '40px auto', padding: '0 20px 100px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '40px' },
  causeCard: { borderRadius: '28px', overflow: 'hidden', height: '450px', position: 'relative', backgroundColor: '#fff' },
  cardImage: { height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' },
  
  cardOverlay: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '30px', 
    background: 'linear-gradient(transparent, rgba(15, 23, 42, 0.95))', color: '#fff' 
  },
  cardCatTag: { fontSize: '11px', background: '#0ea5e9', padding: '6px 14px', borderRadius: '8px', fontWeight: 'bold' },
  cardCaption: { marginTop: '15px', fontSize: '16px', fontWeight: '500', lineHeight: '1.5' },

  whatsappBadge: {
    position: 'absolute', top: '20px', right: '20px', backgroundColor: '#25D366', 
    width: '45px', height: '45px', borderRadius: '50%', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5,
    boxShadow: '0 8px 15px rgba(0,0,0,0.2)'
  },

  fab: {
    position: 'fixed', bottom: '50px', right: '50px', width: '70px', height: '70px',
    borderRadius: '50%', backgroundColor: '#0ea5e9', color: '#fff', border: 'none',
    boxShadow: '0 10px 30px rgba(14, 165, 233, 0.4)', cursor: 'pointer', zIndex: 100,
    display: 'flex', alignItems: 'center', justifyContent: 'center'
  },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.7)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000, backdropFilter: 'blur(8px)' },
  modalContent: { background: '#fff', padding: '35px', borderRadius: '32px', width: '90%', maxWidth: '500px' },
  uploadBox: { height: '250px', border: '2px dashed #0ea5e9', background: '#f0f9ff', borderRadius: '24px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', overflow: 'hidden' },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  submitBtn: { width: '100%', padding: '18px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '16px', marginTop: '25px', fontWeight: 'bold', fontSize: '16px' },
  cardSkeleton: { height: '450px', width: '100%' }
};

export default Menu;