import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { 
  Home, Compass, Film, PlusSquare, Heart, MessageCircle, 
  Send, Bookmark, MoreHorizontal, X, Camera, Sparkles 
} from 'lucide-react';

const Campaigns = () => {
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStory, setSelectedStory] = useState(null);
  const [activeShareMenu, setActiveShareMenu] = useState(null);
  const [activeCommentBox, setActiveCommentBox] = useState(null);
  
  const [comments, setComments] = useState({}); 
  const [currentComment, setCurrentComment] = useState("");

  const [isUploading, setIsUploading] = useState(false);
  const [isGeneratingCaption, setIsGeneratingCaption] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({ 
    caption: '', location: '', media_url: '', is_video: false, category: 'General' 
  });

  const [likedPosts, setLikedPosts] = useState(new Set());

  useEffect(() => { loadContent(); }, []);

  const loadContent = async () => {
    setLoading(true);
    try {
      const res = await axios.get('https://helpglow.onrender.com/api/campaigns');
      setPosts(res.data.filter(item => !item.is_video));
      setStories(res.data.filter(item => item.is_video));
      setTimeout(() => setLoading(false), 1500);
    } catch (err) { console.error(err); setLoading(false); }
  };

  const generateAutoCaption = (isVideo) => {
    setIsGeneratingCaption(true);
    setTimeout(() => {
      const type = isVideo ? "video" : "photo";
      const autoText = `Check out this amazing ${type} from our latest campaign! #HelpGlow #MakingADifference`;
      setFormData(prev => ({ ...prev, caption: autoText }));
      setIsGeneratingCaption(false);
    }, 1200);
  };

  const handleCreatePost = async () => {
    setIsUploading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:5000/api/campaigns', formData, {
        headers: { Authorization: `Bearer ${token}` },
        onUploadProgress: (p) => setUploadProgress(Math.round((p.loaded * 100) / p.total))
      });
      loadContent();
      setIsUploading(false);
      setShowCreateModal(false);
      setUploadProgress(0);
      setFormData({ caption: '', location: '', media_url: '', is_video: false, category: 'General' });
    } catch (err) { 
      setIsUploading(false); 
      alert("Upload Failed"); 
    }
  };

  const handleShare = (platform, post) => {
    const url = window.location.href;
    const text = `Check this out: ${post.caption}`;
    let shareUrl = '';
    if (platform === 'whatsapp') shareUrl = `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`;
    else if (platform === 'x') shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`;
    else if (platform === 'facebook') shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(shareUrl, '_blank');
    setActiveShareMenu(null);
  };

  const StorySkeleton = () => (
    <div style={styles.storyItem}>
      <div className="skeleton" style={styles.storyImg} />
      <div className="skeleton" style={{height:'10px', width:'40px', marginTop:'8px', borderRadius:'4px'}} />
    </div>
  );

  const PostSkeleton = () => (
    <div style={styles.postCard}>
      <div style={styles.postHeader}><div className="skeleton" style={styles.avatar} /><div className="skeleton" style={{height:'12px', width:'100px'}} /></div>
      <div className="skeleton" style={{width:'100%', height:'300px'}} />
    </div>
  );

  return (
    <div style={styles.pageWrapper}>
      {/* SIDEBAR */}
      <aside className="sidebar-desktop" style={styles.sidebar}>
        <div style={styles.logo}>HelpGlow</div>
        <nav style={styles.navGroup}>
          <div style={styles.navItem}><Home size={24} /> <span>Home</span></div>
          <div style={styles.navItem}><Compass size={24} /> <span>Explore</span></div>
          <div style={styles.navItem} onClick={() => window.open('https://www.instagram.com/helpglow_foundation?igsh=MXFnZWJqaXh3NXB1MA==', '_blank')}>
            <Film size={24} /> <span>Reels</span>
          </div>
          <div style={styles.navItem} onClick={() => setShowCreateModal(true)}><PlusSquare size={24} /> <span>Create</span></div>
        </nav>
      </aside>

      {/* FEED - MIDDLE SECTION */}
      <main style={styles.middleSection} className="main-feed">
        <div style={styles.stickyStoryHeader}>
            <div className="no-scrollbar" style={styles.storyCard}>
              {loading ? [1,2,3,4,5].map(i => <StorySkeleton key={i}/>) : stories.map(story => (
                <div key={story.id} style={styles.storyItem} onClick={() => setSelectedStory(story)}>
                  <div style={styles.storyRing}>
                    <video src={story.media_url} style={styles.storyImg} muted autoPlay loop playsInline />
                  </div>
                  <span style={styles.storyLabel}>{story.category}</span>
                </div>
              ))}
            </div>
        </div>

        <div className="no-scrollbar" style={styles.scrollContainer}>
          <div style={styles.feed}>
            {loading ? [1,2].map(i => <PostSkeleton key={i}/>) : posts.map(post => (
              <article key={post.id} style={styles.postCard}>
                <div style={styles.postHeader}>
                  <div style={styles.avatar}>HG</div>
                  <div style={{flex: 1}}><span style={styles.username}>helpglow_official</span><p style={styles.location}>Agra, India</p></div>
                  <MoreHorizontal size={20} color="#8e8e8e" />
                </div>
                {post.is_video ? <video src={post.media_url} style={styles.postMedia} controls playsInline loop muted /> : <img src={post.media_url} style={styles.postMedia} alt="" />}
                <div style={styles.postActions}>
                  <Heart size={24} onClick={() => setLikedPosts(prev => { const n = new Set(prev); n.has(post.id) ? n.delete(post.id) : n.add(post.id); return n; })} fill={likedPosts.has(post.id) ? "#ff3040" : "none"} color={likedPosts.has(post.id) ? "#ff3040" : "#262626"} style={{cursor:'pointer'}} />
                  <MessageCircle size={24} style={{cursor:'pointer'}} onClick={() => setActiveCommentBox(activeCommentBox === post.id ? null : post.id)} />
                  <div style={{position: 'relative'}}>
                    <Send size={24} style={{cursor:'pointer'}} onClick={() => setActiveShareMenu(activeShareMenu === post.id ? null : post.id)} />
                    {activeShareMenu === post.id && (
                      <div style={styles.shareDropdown}>
                        {['whatsapp', 'x', 'facebook', 'insta'].map(plt => <div key={plt} style={styles.shareOpt} onClick={() => handleShare(plt, post)}>{plt.toUpperCase()}</div>)}
                      </div>
                    )}
                  </div>
                  <Bookmark size={24} style={{marginLeft: 'auto', cursor:'pointer'}} />
                </div>
                <div style={styles.postPadding}>
                  <p style={styles.likes}>{likedPosts.has(post.id) ? 1 : 0} likes</p>
                  <p style={styles.caption}><strong>helpglow_official</strong> {post.caption}</p>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* COMPACT ACTION AREA */}
        <div style={styles.actionArea}>
            <button className="mobile-create-trigger" onClick={() => setShowCreateModal(true)}>
                <PlusSquare size={28} />
            </button>
        </div>
      </main>

      {/* RIGHT SIDEBAR */}
      <aside className="sidebar-desktop" style={styles.rightSidebar}>
        <div style={styles.impactCard}>
          <h4 style={{marginTop: 0}}>Impact Tracker</h4>
          <div style={styles.statRow}>
             <div style={styles.statIcon}>💧</div>
             <div><p style={{margin:0, fontWeight:'bold'}}>50+ Wells</p><p style={{margin:0, fontSize:'12px', color:'#8e8e8e'}}>Fresh Water</p></div>
          </div>
          <button style={styles.donateBtn}>Donate Now</button>
        </div>
      </aside>

      {/* STORY OVERLAY */}
      {selectedStory && (
        <div style={styles.storyOverlay} onClick={() => setSelectedStory(null)}>
          <div style={styles.storyContent} onClick={(e) => e.stopPropagation()}>
            <X size={30} color="white" style={styles.closeStory} onClick={() => setSelectedStory(null)} />
            <video src={selectedStory.media_url} style={styles.fullStoryVideo} autoPlay playsInline controls />
          </div>
        </div>
      )}

      {/* CREATE MODAL */}
      {showCreateModal && (
        <div style={styles.modalOverlay}>
          <div className="modal-container">
            <div style={{display:'flex', justifyContent:'space-between', marginBottom:'15px', alignItems: 'center'}}>
                <h3 style={{margin:0}}>{isUploading ? `Uploading...` : 'New Post'}</h3>
                <X onClick={() => setShowCreateModal(false)} style={{cursor:'pointer'}} />
            </div>
            <div className="modal-upload-box" onClick={() => fileInputRef.current.click()}>
              {formData.media_url ? (formData.is_video ? <video src={formData.media_url} style={styles.preview} muted /> : <img src={formData.media_url} style={styles.preview} alt="" />) : <Camera size={40} color="#ccc" />}
              <input type="file" ref={fileInputRef} hidden onChange={(e) => {
                const file = e.target.files[0];
                if(!file) return;
                const reader = new FileReader();
                reader.onloadend = () => {
                  const isVideo = file.type.startsWith('video');
                  setFormData({ ...formData, media_url: reader.result, is_video: isVideo });
                  generateAutoCaption(isVideo);
                };
                reader.readAsDataURL(file);
              }} />
            </div>
            <div style={{position: 'relative'}}>
                <textarea className="modal-textarea" value={formData.caption} placeholder="Caption..." onChange={(e) => setFormData({...formData, caption: e.target.value})} />
                {isGeneratingCaption && <div style={styles.captionLoader}><Sparkles size={14} /> AI is writing...</div>}
            </div>
            <button className="modal-submit-btn" onClick={handleCreatePost} disabled={isUploading}>{isUploading ? 'Posting...' : 'Post'}</button>
          </div>
        </div>
      )}

      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes pulse { 0% { opacity: 0.5; } 50% { opacity: 1; } 100% { opacity: 0.5; } }
        .skeleton { animation: pulse 1.5s infinite ease-in-out; background-color: #f0f0f0 !important; }

        .modal-container {
            background: #fff;
            width: 90%;
            max-width: 400px;
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        }
        .modal-upload-box {
            height: 180px;
            background: #fafafa;
            border: 1px dashed #ccc;
            border-radius: 15px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            overflow: hidden;
            width: 100%;
        }
        .modal-textarea {
            width: 100%;
            height: 80px;
            margin: 15px 0;
            border: 1px solid #eee;
            padding: 10px;
            border-radius: 10px;
            resize: none;
            outline: none;
        }
        .modal-submit-btn {
            width: 100%;
            padding: 12px;
            background: #0095f6;
            color: #fff;
            border: none;
            border-radius: 10px;
            font-weight: bold;
            cursor: pointer;
        }

        @media (max-width: 768px) {
          .sidebar-desktop { display: none !important; }
          
          .main-feed { 
            width: 100% !important; 
            height: 90vh !important; 
            margin: 0 !important;
            padding-top: 0 !important;
            border-radius: 5px !important;
            overflow: hidden !important;
            display: flex !important;
            flex-direction: column !important;
          }

          .mobile-create-trigger {
            background: #0095f6;
            color: white;
            border: none;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 15px rgba(0,149,246,0.25);
            transition: transform 0.2s;
          }
          .mobile-create-trigger:active { transform: scale(0.95); }
        }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { display: 'flex', height: '100vh', width: '100vw', background: 'linear-gradient(to bottom, #e0f2fe 0%, #ffffff 100%)', overflow: 'hidden' },
  sidebar: { width: '22%', padding: '40px 50px', display: 'flex', flexDirection: 'column' },
  logo: { fontSize: '28px', fontWeight: 'bold', marginBottom: '40px', fontFamily: 'cursive' },
  navGroup: { display: 'flex', flexDirection: 'column', gap: '25px' },
  navItem: { display: 'flex', alignItems: 'center', gap: '15px', fontSize: '18px', cursor: 'pointer' },
  
  // Middle Section Logic - Height increased to 72vh to reduce bottom gap
  middleSection: { 
    width: '40%', 
    height: '92vh', 
    borderRadius: '5px', 
    background: '#fff', 
    boxShadow: '0 10px 40px rgba(0,0,0,0.06)', 
    overflow: 'hidden', 
    display: 'flex', 
    flexDirection: 'column', 
    position: 'relative' 
  },
  
  // Compact Action area
  actionArea: {
    padding: '8px 0',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'transparent',
    gap: '15px'
  },

  stickyStoryHeader: { position: 'sticky', top: 0, background: '#fff', zIndex: 10, padding: '20px 20px 10px 20px', borderBottom: '1px solid #f0f0f0' },
  scrollContainer: { overflowY: 'auto', height: '100%', padding: '10px 20px 20px 20px' },
  
  storyCard: { display: 'flex', gap: '20px', overflowX: 'auto' },
  storyItem: { textAlign: 'center', minWidth: '70px', cursor: 'pointer' },
  storyRing: { padding: '3px', background: 'linear-gradient(45deg, #f09433, #bc1888)', borderRadius: '50%' },
  storyImg: { width: '55px', height: '55px', borderRadius: '50%', border: '2px solid #fff', objectFit: 'cover' },
  storyLabel: { fontSize: '11px', marginTop: '5px' },
  
  postCard: { background: '#fff', borderRadius: '15px', border: '1px solid #f0f0f0', marginBottom: '25px' },
  postHeader: { padding: '12px 15px', display: 'flex', alignItems: 'center', gap: '12px' },
  avatar: { width: '32px', height: '32px', borderRadius: '50%', background: '#0095f6', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight:'bold' },
  username: { fontWeight: 'bold', fontSize: '14px' },
  location: { fontSize: '11px', color: '#8e8e8e', margin: 0 },
  postMedia: { width: '100%', display: 'block', maxHeight: '500px', objectFit: 'cover' },
  postActions: { padding: '12px 15px', display: 'flex', gap: '18px' },
  postPadding: { padding: '0 15px 15px 15px' },
  likes: { fontWeight: 'bold', margin: '0 0 5px 0', fontSize: '14px' },
  caption: { margin: 0, fontSize: '14px' },
  
  shareDropdown: { position: 'absolute', bottom: '35px', left: 0, background: '#fff', border: '1px solid #eee', borderRadius: '8px', width: '140px', zIndex: 100, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
  shareOpt: { padding: '10px', fontSize: '12px', cursor: 'pointer', borderBottom: '1px solid #f9f9f9' },
  
  rightSidebar: { width: '30%', padding: '40px 30px' },
  impactCard: { background: '#fff', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' },
  statRow: { display: 'flex', alignItems: 'center', gap: '15px', margin: '15px 0' },
  statIcon: { fontSize: '24px', background: '#f0f9ff', padding: '10px', borderRadius: '12px' },
  donateBtn: { width: '100%', padding: '12px', background: '#0095f6', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold' },
  
  modalOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 99999 },
  preview: { width: '100%', height: '100%', objectFit: 'cover' },
  captionLoader: { position: 'absolute', bottom: '25px', right: '10px', fontSize: '10px', color: '#0095f6', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 'bold' },
  
  storyOverlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.95)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 210000 },
  storyContent: { position: 'relative', height: '90vh' },
  fullStoryVideo: { height: '100%', borderRadius: '15px' },
  closeStory: { position: 'absolute', top: '-40px', right: '-40px', cursor: 'pointer' }
};

export default Campaigns;