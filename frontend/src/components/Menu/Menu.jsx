import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, useLocation } from "react-router-dom"; 
import { ShoppingCart, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import { products } from '../../config/products';
import { CartContext } from '../../context/CartContext';

const Menu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { addToCart, setIsCartOpen } = useContext(CartContext);

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fffdf9'
  };

  useEffect(() => {
    if (location.state?.addProductId) {
      const productId = location.state.addProductId;
      const product = products.find(p => p.id === productId);
      if (product) {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('user');
        if (!isLoggedIn) {
          toast.error("Please login to donate.");
          navigate('/login');
          return;
        }
        addToCart(product);
        toast.success(`${product.name} added to cart!`);
        // Clear navigation state
        navigate('/menu', { replace: true, state: null });
      }
    }
  }, [location.state, navigate, addToCart, setIsCartOpen]);

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectProduct = (product) => {
    // 1. Session verification check (evaluates standard login flags)
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('user');
    
    if (!isLoggedIn) {
      toast.error("Authentication required. Redirecting you to the login page...");
      navigate('/login');
      return;
    }

    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  return (
    <div style={{...styles.pageWrapper, backgroundColor: colors.lightBg}}>
      <div style={{...styles.heroBanner, background: `linear-gradient(135deg, ${colors.magenta} 0%, ${colors.pink} 60%, ${colors.orange} 100%)`}}>
        <div style={styles.heroOverlayContent}>
          <p style={styles.foundationTag}>Premium Donation Portal</p>
          <h1 style={styles.heroHeading}>Donation Price List</h1>
          <p style={styles.heroSubHeading}>Every small gift lights a spark of hope.</p>
        </div>
      </div>

      <header style={styles.headerArea}>
        <div style={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Search for an item..." 
            style={styles.searchInput}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search size={20} style={styles.searchIcon} color={colors.pink} />
        </div>

        <div className="no-scrollbar" style={styles.categoryNav}>
          {['All', 'Single Product', 'Combo Product'].map((cat) => (
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
              {cat}s
            </button>
          ))}
        </div>
      </header>

      <main style={styles.feedContainer}>
        <div style={styles.cardGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="donation-card" style={{...styles.donationCard, border: `1px solid rgba(212, 175, 55, 0.2)`}}>
              <div style={{overflow: 'hidden', height: '180px', position: 'relative'}}>
                <div 
                  className="card-image-bg" 
                  style={{
                    ...styles.cardImage, 
                    backgroundImage: `url("${product.img}")`,
                  }}
                >
                   <span style={{...styles.cardCatTag, background: colors.magenta}}>{product.category}</span>
                </div>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardInfoMeta}>
                    <span style={{fontSize: '24px'}}>{product.icon}</span>
                    <h3 style={{...styles.cardName, color: '#1e293b'}}>{product.name}</h3>
                </div>
                
                <p style={styles.cardDescription}>{product.desc}</p>
                
                <div style={styles.cardActionArea}>
                    <div style={{...styles.priceTag, color: colors.magenta}}>
                        <span style={{fontSize: '16px', marginRight: '2px'}}>₹</span>
                        <span style={{fontSize: '22px'}}>{product.price}</span>
                    </div>
                    <button 
                      className="donate-btn" 
                      style={{...styles.donateBtn, background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`}}
                      onClick={() => handleSelectProduct(product)}
                    >
                        <ShoppingCart size={18} /> Donate
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .donation-card { transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .donation-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(142, 35, 130, 0.15); }
        .copy-click:active { transform: scale(0.96); }
        input:focus, select:focus { border-color: ${colors.pink} !important; box-shadow: 0 0 0 3px ${colors.pink}15; }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', overflowX: 'hidden' },
  heroBanner: { width: '100%', height: '260px', display: 'flex', alignItems: 'center', padding: '0 8%', color: '#fff' },
  heroHeading: { fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '800', margin: 0, letterSpacing: '-1px' },
  heroSubHeading: { fontSize: '17px', marginTop: '10px', opacity: 0.9, fontWeight: '600' },
  foundationTag: { fontSize: '13px', fontWeight: '800', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', margin: '0 0 8px 0', letterSpacing: '1px' },
  headerArea: { textAlign: 'center', padding: '40px 20px', backgroundColor: '#fff', borderBottom: '1px solid rgba(0,0,0,0.05)' },
  searchContainer: { position: 'relative', maxWidth: '500px', margin: '0 auto 25px' },
  searchInput: { width: '100%', padding: '15px 25px', borderRadius: '50px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '15px', backgroundColor: '#f8fafc' },
  searchIcon: { position: 'absolute', right: '22px', top: '16px' },
  categoryNav: { display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '10px', maxWidth: '1000px', margin: '0 auto', justifyContent: 'center' },
  categoryPill: { padding: '10px 24px', borderRadius: '50px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', border: '2px solid', transition: '0.3s' },
  feedContainer: { maxWidth: '1250px', margin: '20px auto', padding: '0 25px 100px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' },
  donationCard: { borderRadius: '25px', overflow: 'hidden', background: '#fff' },
  cardImage: { backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%', backgroundColor: '#fafafa' },
  cardCatTag: { position: 'absolute', top: '15px', left: '15px', fontSize: '10px', padding: '5px 12px', borderRadius: '50px', color: '#fff', fontWeight: '800' },
  cardContent: { padding: '20px' },
  cardInfoMeta: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' },
  cardName: { fontSize: '17px', fontWeight: '700', margin: 0 },
  cardDescription: { fontSize: '13px', color: '#64748b', lineHeight: '1.5', marginBottom: '18px', fontWeight: '500', minHeight: '40px' },
  cardActionArea: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f1f5f9', paddingTop: '15px' },
  priceTag: { display: 'flex', alignItems: 'baseline', fontWeight: '900' },
  donateBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '11px 22px', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: '800', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(26, 32, 44, 0.7)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { backgroundColor: '#fff', padding: '35px', borderRadius: '30px', width: '100%', maxWidth: '440px', maxHeight: '90vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
  counterRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '30px', marginBottom: '25px' },
  countBtn: { width: '48px', height: '48px', borderRadius: '50%', border: 'none', backgroundColor: '#fff5f9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  quantityDisplay: { fontSize: '28px', fontWeight: '900' },
  totalBox: { backgroundColor: '#fdfcf7', padding: '18px', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', margin: '20px 0', fontSize: '16px' },
  confirmBtn: { width: '100%', padding: '16px', color: '#fff', border: 'none', borderRadius: '50px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' },
  qrContainer: { padding: '15px', background: '#fff', borderRadius: '20px', border: '2px dashed #e2e8f0', display: 'inline-block' },
  accountBox: { textAlign: 'left', padding: '18px', borderRadius: '20px', border: '2.5px solid' },
  accountTitle: { fontWeight: '900', marginBottom: '12px', textAlign: 'center', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' },
  accountDetailRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '8px', padding: '10px', borderRadius: '10px', background: '#fff', border: '1px solid #f1f5f9' },
  label: { display: 'block', fontSize: '11px', fontWeight: '900', color: '#94a3b8', marginBottom: '6px', letterSpacing: '0.5px' },
  input: { width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', marginBottom: '15px', outline: 'none', fontSize: '14px', fontWeight: '600' },
  uploadBox: { padding: '18px', border: '2px dashed', borderRadius: '15px', textAlign: 'center' },
  inputGroup: { marginBottom: '4px' },
  downloadLink: { background:'none', border:'none', display:'flex', alignItems:'center', gap:'6px', fontSize:'12px', fontWeight:'800', cursor:'pointer' },
  copiedBadge: { background: '#22c55e', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '3px' }
};

export default Menu;