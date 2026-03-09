import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Home, Compass, Film, PlusSquare, Heart, MessageCircle, 
  Send, Bookmark, MoreHorizontal, X, Camera, Sparkles, Search 
} from 'lucide-react';

const Menu = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  
  // Filtering States
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

  // Logic: Filter cards based on Category AND Search Query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === 'All Causes' || post.category === activeCategory;
    const matchesSearch = post.caption?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Logic: Shift category pill based on typing
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    
    // Find matching category while typing to auto-shift filter
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
      <header style={styles.headerArea}>
        <h1 style={styles.mainTitle}>Causes That Matter</h1>
        <p style={styles.subTitle}>Choose a cause and make a difference today</p>
        
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search for a cause or product..." 
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
              onClick={() => setActiveCategory(cat)}
              style={{
                ...styles.categoryPill, 
                backgroundColor: activeCategory === cat ? '#0ea5e9' : 'transparent',
                color: activeCategory === cat ? '#fff' : '#0ea5e9',
                border: `1px solid #0ea5e9`
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
              <div key={post.id} style={styles.causeCard}>
                <div style={{...styles.cardImage, backgroundImage: `url(${post.media_url})`}}>
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
        {!loading && filteredPosts.length === 0 && (
          <div style={{textAlign: 'center', color: '#64748b', marginTop: '40px'}}>
            No campaigns found for "{searchQuery}" in {activeCategory}
          </div>
        )}
      </main>

      <button style={styles.fab} onClick={() => setShowCreateModal(true)}>
        <PlusSquare size={24} />
      </button>

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px'}}>
              <h3>New Campaign Post</h3>
              <X onClick={() => setShowCreateModal(false)} cursor="pointer" />
            </div>
            {isUploading && (
              <div style={styles.progressWrapper}>
                <div style={{...styles.progressBar, width: `${uploadProgress}%`}} />
              </div>
            )}
            <div style={styles.uploadBox} onClick={() => fileInputRef.current.click()}>
              {formData.media_url ? <img src={formData.media_url} style={styles.preview} alt="" /> : <Camera color="#ccc" />}
              <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onloadend = () => setFormData({ ...formData, media_url: reader.result, is_video: file.type.startsWith('video') });
                reader.readAsDataURL(file);
              }} />
            </div>
            <button style={styles.submitBtn} onClick={handleCreatePost} disabled={isUploading}>
              {isUploading ? 'Uploading...' : 'Post Campaign'}
            </button>
          </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .skeleton { animation: pulse 1.5s infinite ease-in-out; background: #f0f9ff; border-radius: 15px; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', backgroundColor: '#f8fafc' },
  headerArea: { textAlign: 'center', padding: '60px 20px 20px', backgroundColor: '#fff' },
  mainTitle: { fontSize: '42px', color: '#0f172a', fontWeight: '800', marginBottom: '10px' },
  subTitle: { color: '#64748b', fontSize: '18px', marginBottom: '30px' },
  
  searchContainer: { 
    position: 'relative', maxWidth: '600px', margin: '0 auto 40px',
    boxShadow: '0 4px 20px rgba(14, 165, 233, 0.1)', borderRadius: '50px'
  },
  searchInput: { 
    width: '100%', padding: '15px 25px', borderRadius: '50px', 
    border: '1px solid #e2e8f0', outline: 'none', fontSize: '16px' 
  },
  searchIcon: { position: 'absolute', right: '25px', top: '18px' },

  categoryNav: { 
    display: 'flex', gap: '12px', overflowX: 'auto', padding: '15px 0', 
    maxWidth: '1200px', margin: '0 auto', scrollBehavior: 'smooth'
  },
  categoryPill: { 
    padding: '10px 24px', borderRadius: '50px', whiteSpace: 'nowrap', 
    fontSize: '14px', fontWeight: '600', cursor: 'pointer', transition: '0.3s ease' 
  },

  feedContainer: { maxWidth: '1400px', margin: '20px auto', padding: '0 20px 100px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' },
  causeCard: { borderRadius: '20px', overflow: 'hidden', height: '420px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', position: 'relative' },
  cardImage: { height: '100%', width: '100%', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' },
  
  cardOverlay: { 
    position: 'absolute', bottom: 0, left: 0, right: 0, padding: '20px', 
    background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: '#fff' 
  },
  cardCatTag: { fontSize: '12px', background: '#0ea5e9', padding: '4px 10px', borderRadius: '5px', fontWeight: 'bold' },
  cardCaption: { marginTop: '10px', fontSize: '14px', fontWeight: '500' },

  whatsappBadge: {
    position: 'absolute', top: '15px', right: '15px', backgroundColor: '#25D366', 
    width: '40px', height: '40px', borderRadius: '50%', display: 'flex', 
    alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 5
  },

  fab: {
    position: 'fixed', bottom: '40px', right: '40px', width: '65px', height: '65px',
    borderRadius: '50%', backgroundColor: '#0ea5e9', color: '#fff', border: 'none',
    boxShadow: '0 8px 20px rgba(14, 165, 233, 0.4)', cursor: 'pointer', zIndex: 100
  },

  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(15, 23, 42, 0.8)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 },
  modalContent: { background: '#fff', padding: '30px', borderRadius: '24px', width: '90%', maxWidth: '500px' },
  uploadBox: { height: '220px', border: '2px dashed #0ea5e9', borderRadius: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center', cursor: 'pointer', overflow: 'hidden' },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  submitBtn: { width: '100%', padding: '16px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '12px', marginTop: '20px', fontWeight: 'bold' },
  progressWrapper: { width: '100%', height: '8px', background: '#f0f9ff', borderRadius: '10px', marginBottom: '20px', overflow: 'hidden' },
  progressBar: { height: '100%', background: '#0ea5e9', transition: 'width 0.3s' },
  cardSkeleton: { height: '420px', width: '100%' }
};

export default Menu;