import React, { useState, useRef } from 'react';
import { ShoppingCart, Heart, Search, X, Plus, Minus, Send, Copy } from 'lucide-react';

// Import your local QR image correctly for Vite
import upiQRCode from '../../assets/WhatsApp Image 2026-02-23 at 12.51.00 PM.jpeg';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(20);
  const [showQR, setShowQR] = useState(false);

  const products = [
    { id: 1, category: 'Single Product', name: 'Food Packet', price: 30, icon: '🍲', img: 'https://i.postimg.cc/GpbC6sH2/Whats-App-Image-2026-02-23-at-12-27-10-PM.jpg' },
    { id: 2, category: 'Single Product', name: 'Dog Foods', price: 40, icon: '🐶', img: 'https://i.postimg.cc/MZ18ZDRP/Whats-App-Image-2026-01-20-at-9-24-31-PM.jpg' },
    { id: 3, category: 'Single Product', name: 'Basic Education Kit', price: 50, icon: '📚', img: 'https://i.postimg.cc/8kXL5RSY/Whats-App-Image-2026-01-20-at-9-15-45-PM.jpg' },
    { id: 4, category: 'Single Product', name: 'Grocery Kit', price: 550, icon: '🧺', img: 'https://i.postimg.cc/NM4STN4y/Whats-App-Image-2026-01-20-at-9-21-49-PM.jpg' },
    { id: 5, category: 'Single Product', name: 'Celebration Cake', price: 600, icon: '🎂', img: 'https://i.postimg.cc/TP24xjGd/Whats-App-Image-2026-02-23-at-3-36-28-PM.jpg' },
    { id: 6, category: 'Combo Product', name: 'Food & Cake Combo', price: 850, icon: '🎁', img: 'https://i.postimg.cc/3RYJYcNp/Whats-App-Image-2026-01-20-at-9-24-33-PM.jpg' },
    { id: 7, category: 'Combo Product', name: 'Mini Party', price: 1500, icon: '🎉', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600' },
    { id: 8, category: 'Combo Product', name: 'Special Party', price: 2000, icon: '✨', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600' },
    { id: 9, category: 'Combo Product', name: 'Golden Celebration', price: 3000, icon: '🥇', img: 'https://images.unsplash.com/photo-1511795409834-432f7b3027a0?q=80&w=600' },
    { id: 10, category: 'Combo Product', name: 'Grand Party', price: 4500, icon: '👑', img: 'https://i.postimg.cc/zX44YHPZ/Whats-App-Image-2026-02-23-at-3-36-29-PM-(1).jpg' }
  ];

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleWhatsAppNotify = () => {
    const total = selectedProduct.price * quantity;
    const message = `Hello Helpglow Foundation! %0AI have initiated a donation for: ${selectedProduct.name} %0AQuantity: ${quantity} packets %0ATotal Amount: ₹${total}. %0AI am sharing the screenshot now.`;
    const whatsappUrl = `https://wa.me/918528220733?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowQR(false);
    setQuantity(20);
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.heroBanner}>
        <div style={styles.heroOverlayContent}>
          <p style={styles.foundationTag}>HelpGlow Foundation</p>
          <h1 style={styles.heroHeading}>Donation Price List</h1>
          <p style={styles.heroSubHeading}>100% transparent and direct impact</p>
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
          <Search size={20} style={styles.searchIcon} color="#0ea5e9" />
        </div>

        <div className="no-scrollbar" style={styles.categoryNav}>
          {['All', 'Single Product', 'Combo Product'].map((cat) => (
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
              {cat}s
            </button>
          ))}
        </div>
      </header>

      <main style={styles.feedContainer}>
        <div style={styles.cardGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className="donation-card" style={styles.donationCard}>
              <div className="card-image-container" style={{overflow: 'hidden', height: '180px', position: 'relative'}}>
                <div 
                  className="card-image-bg" 
                  style={{
                    ...styles.cardImage, 
                    backgroundImage: `url("${product.img}")`,
                    backgroundColor: '#f1f5f9'
                  }}
                >
                   <span style={styles.cardCatTag}>{product.category}</span>
                </div>
              </div>
              <div style={styles.cardContent}>
                <div style={styles.cardInfoMeta}>
                    <span style={{fontSize: '24px'}}>{product.icon}</span>
                    <h3 style={styles.cardName}>{product.name}</h3>
                </div>
                
                <div style={styles.cardActionArea}>
                    <div style={styles.priceTag}>
                        <span style={{fontSize: '16px', marginRight: '2px'}}>₹</span>
                        <span style={{fontSize: '22px'}}>{product.price}</span>
                    </div>
                    <button 
                      className="donate-btn" 
                      style={styles.donateBtn}
                      onClick={() => setSelectedProduct(product)}
                    >
                        <ShoppingCart size={18} /> Donate
                    </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* DONATION & PAYMENT MODAL */}
      {selectedProduct && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h3 style={{fontSize: '18px', margin: 0, fontWeight: '800'}}>{showQR ? "Payment Details" : `Donate: ${selectedProduct.name}`}</h3>
              <X cursor="pointer" onClick={closeModal} />
            </div>

            {!showQR ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>Select Packets (Min 20 - Max 50)</p>
                <div style={styles.counterRow}>
                  <button style={styles.countBtn} onClick={() => setQuantity(q => Math.max(20, q - 1))}><Minus size={20} /></button>
                  <span style={styles.quantityDisplay}>{quantity}</span>
                  <button style={styles.countBtn} onClick={() => setQuantity(q => Math.min(50, q + 1))}><Plus size={20} /></button>
                </div>
                <div style={styles.totalBox}>
                  <span>Total Amount:</span>
                  <span style={{ fontWeight: '800', color: '#0ea5e9' }}>₹{selectedProduct.price * quantity}</span>
                </div>
                <button style={styles.confirmBtn} onClick={() => setShowQR(true)}>Confirm Donation</button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={styles.accountBox}>
                    <p style={styles.accountTitle}>Bank Account Details</p>
                    <div style={styles.accountDetailRow}><span>Bank:</span> <strong>SBI</strong></div>
                    <div style={styles.accountDetailRow}><span>A/C Name:</span> <strong>Helpglow Foundation</strong></div>
                    <div style={styles.accountDetailRow}><span>A/C No:</span> <strong>12345678901</strong></div>
                    <div style={styles.accountDetailRow}><span>IFSC:</span> <strong>SBIN0001234</strong></div>
                </div>
                <p style={{margin: '15px 0 10px', fontSize: '14px', fontWeight: '600', color: '#64748b'}}>OR Scan QR Code</p>
                <div style={styles.qrContainer}>
                  <img src={upiQRCode} alt="UPI QR Code" style={{ width: '100%', borderRadius: '15px' }} />
                </div>
                <p style={{ marginTop: '15px', fontWeight: '800', fontSize: '20px', color: '#0ea5e9' }}>Total: ₹{selectedProduct.price * quantity}</p>
                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <button style={{...styles.confirmBtn, backgroundColor: '#25D366', flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px'}} onClick={handleWhatsAppNotify}>
                        <Send size={18}/> WhatsApp
                    </button>
                    <button style={{...styles.confirmBtn, backgroundColor: '#64748b', flex: 1}} onClick={closeModal}>Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;600;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        
        .donation-card { transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.4s ease; cursor: pointer; }
        .donation-card:hover { transform: translateY(-10px) scale(1.02); box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2); }
        
        .card-image-bg { transition: transform 0.6s ease; background-size: cover; background-position: center; width: 100%; height: 100%; }
        .donation-card:hover .card-image-bg { transform: scale(1.15); }

        .category-pill:hover { transform: scale(1.05); filter: brightness(1.1); }
        .donate-btn:hover { background-color: #0284c7 !important; transform: translateY(-1px); }
        .confirm-btn:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', backgroundColor: '#fcfdfe', overflowX: 'hidden' },
  heroBanner: { width: '100%', height: '280px', background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 60%, #bae6fd 100%)', display: 'flex', alignItems: 'center', padding: '0 8%', color: '#fff', marginBottom: '20px' },
  heroOverlayContent: { zIndex: 2 },
  foundationTag: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: '0 0 10px 0' },
  heroHeading: { fontSize: '48px', fontWeight: '800', margin: 0, lineHeight: '1.2' },
  heroSubHeading: { fontSize: '18px', fontWeight: '400', marginTop: '12px', maxWidth: '500px', opacity: 0.9 },
  headerArea: { textAlign: 'center', padding: '30px 20px', backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' },
  searchContainer: { position: 'relative', maxWidth: '500px', margin: '0 auto 25px', boxShadow: '0 8px 25px rgba(14, 165, 233, 0.08)', borderRadius: '50px' },
  searchInput: { width: '100%', padding: '16px 25px', borderRadius: '50px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px', backgroundColor: '#f9fafb' },
  searchIcon: { position: 'absolute', right: '22px', top: '18px' },
  categoryNav: { display: 'flex', gap: '12px', overflowX: 'auto', padding: '5px 0 15px', maxWidth: '1000px', margin: '0 auto' },
  categoryPill: { padding: '10px 24px', borderRadius: '50px', whiteSpace: 'nowrap', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: '1px solid transparent' },
  feedContainer: { maxWidth: '1300px', margin: '30px auto', padding: '0 20px 80px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '25px' },
  donationCard: { borderRadius: '20px', overflow: 'hidden', backgroundColor: '#fff', border: '1px solid #f1f5f9' },
  cardImage: { height: '100%', width: '100%', position: 'relative' },
  cardCatTag: { position: 'absolute', top: '12px', left: '12px', fontSize: '9px', background: 'rgba(15, 23, 42, 0.8)', padding: '4px 10px', borderRadius: '5px', fontWeight: 'bold', textTransform: 'uppercase', color: '#fff', zIndex: 10 },
  cardContent: { padding: '20px' },
  cardInfoMeta: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' },
  cardName: { fontSize: '16px', color: '#0f172a', fontWeight: '600', margin: 0, lineHeight: '1.4' },
  cardActionArea: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  priceTag: { display: 'flex', alignItems: 'baseline', color: '#0ea5e9', fontWeight: '800' },
  donateBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' },
  
  // MODAL STYLES (Updated with Margin & Scroll)
  modalOverlay: { 
    position: 'fixed', 
    inset: 0, 
    backgroundColor: 'rgba(15, 23, 42, 0.6)', 
    backdropFilter: 'blur(4px)', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    zIndex: 1000,
    padding: '20px' // Provides a safety gap from the screen edges
  },
  modalContent: { 
    backgroundColor: '#fff', 
    padding: '30px', 
    borderRadius: '28px', 
    width: '100%', 
    maxWidth: '420px', 
    maxHeight: 'calc(100vh - 40px)', // Keeps modal height smaller than viewport height
    overflowY: 'auto', // Enables internal scrolling
    boxShadow: '0 20px 50px rgba(0,0,0,0.2)',
    position: 'relative',
    margin: 'auto' // Centers it properly
  },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', position: 'sticky', top: 0, backgroundColor: '#fff', zIndex: 5 },
  counterRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '25px', marginBottom: '20px' },
  countBtn: { width: '50px', height: '50px', borderRadius: '50%', border: 'none', backgroundColor: '#f0f9ff', color: '#0ea5e9', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  quantityDisplay: { fontSize: '28px', fontWeight: '800' },
  totalBox: { backgroundColor: '#f8fafc', padding: '20px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', margin: '20px 0' },
  confirmBtn: { width: '100%', padding: '16px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' },
  qrContainer: { padding: '10px', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #cbd5e1' },
  accountBox: { textAlign: 'left', background: '#f0f9ff', padding: '15px', borderRadius: '15px', border: '1px solid #bae6fd' },
  accountTitle: { fontWeight: '800', color: '#0ea5e9', marginBottom: '10px', textAlign: 'center', textTransform: 'uppercase', fontSize: '12px' },
  accountDetailRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px' }
};

export default Menu;