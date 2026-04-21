import React, { useState } from 'react';
import { ShoppingCart, Search, X, Plus, Minus, Send, Download, Copy, Check, Upload, Image as ImageIcon, ChevronLeft } from 'lucide-react';

// Import your local QR image correctly for Vite
import upiQRCode from '../../assets/donation-qr.jpeg';

const Menu = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);

  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fffdf9'
  };

  // Form State
  const [formData, setFormData] = useState({
    userName: '',
    whatsapp: '',
    email: '',
    printName: '',
    kidsWishing: '',
    videoDate: '',
    photoNeeded: 'No',
    selectedImage: null,
    paymentScreenshot: null
  });

  const products = [
    { id: 1, category: 'Single Product', name: 'Food Packet', price: 30, icon: '🍲', img: 'https://i.postimg.cc/GpbC6sH2/Whats-App-Image-2026-02-23-at-12-27-10-PM.jpg' },
    { id: 2, category: 'Single Product', name: 'Dog Foods', price: 40, icon: '🐶', img: 'https://i.postimg.cc/MZ18ZDRP/Whats-App-Image-2026-01-20-at-9-24-31-PM.jpg' },
    { id: 3, category: 'Single Product', name: 'Basic Education Kit', price: 50, icon: '📚', img: 'https://i.postimg.cc/8kXL5RSY/Whats-App-Image-2026-01-20-at-9-15-45-PM.jpg' },
    { id: 4, category: 'Single Product', name: 'Grocery Kit', price: 650, icon: '🧺', img: 'https://i.postimg.cc/NM4STN4y/Whats-App-Image-2026-01-20-at-9-21-49-PM.jpg' },
    { id: 5, category: 'Single Product', name: 'Celebration Cake', price: 600, icon: '🎂', img: 'https://i.postimg.cc/TP24xjGd/Whats-App-Image-2026-02-23-at-3-36-28-PM.jpg' },
    { id: 6, category: 'Combo Product', name: 'Food & Cake Combo', price: 850, icon: '🎁', img: 'https://i.postimg.cc/3RYJYcNp/Whats-App-Image-2026-01-20-at-9-24-33-PM.jpg' },
    { id: 7, category: 'Combo Product', name: 'Mini Party', price: 1500, icon: '🎉', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600' },
    { id: 8, category: 'Combo Product', name: 'Special Party', price: 2000, icon: '✨', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600' },
    { id: 9, category: 'Combo Product', name: 'Golden Celebration', price: 3000, icon: '🥇', img: 'https://i.postimg.cc/VNfF6vQF/20260411-175139-jpg.jpg' },
    { id: 10, category: 'Combo Product', name: 'Grand Party', price: 4500, icon: '👑', img: 'https://i.postimg.cc/zX44YHPZ/Whats-App-Image-2026-02-23-at-3-36-29-PM-(1).jpg' }
  ];

  const getMinQty = (price) => Math.ceil(600 / price);
  const isPhoneValid = /^\d{10}$/.test(formData.whatsapp);
  const isEmailValid = formData.email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email);
  const isFormValid = formData.userName && isPhoneValid && isEmailValid;

  const filteredProducts = products.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSelectProduct = (product) => {
    setSelectedProduct(product);
    setQuantity(getMinQty(product.price));
    setShowForm(false);
    setShowQR(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsapp' && value.length > 10) return;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, [field]: e.target.files[0] }));
    }
  };

  const handleCopyText = (text, type) => {
    navigator.clipboard.writeText(text);
    if (type === 'acc') {
      setCopiedAcc(true);
      setTimeout(() => setCopiedAcc(false), 2000);
    } else {
      setCopiedIfsc(true);
      setTimeout(() => setCopiedIfsc(false), 2000);
    }
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = upiQRCode;
    link.download = 'HelpGlow_Donation_QR.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleWhatsAppNotify = () => {
    const total = selectedProduct.price * quantity;
    const message = `*NEW DONATION VERIFICATION*%0A%0A` +
      `*Donor:* ${formData.userName}%0A` +
      `*WhatsApp:* ${formData.whatsapp}%0A` +
      `*Email:* ${formData.email || 'N/A'}%0A` +
      `*Print Name:* ${formData.printName}%0A` +
      `*Wishing:* ${formData.kidsWishing}%0A%0A` +
      `*Product:* ${selectedProduct.name}%0A` +
      `*Quantity:* ${quantity}%0A` +
      `*Total Amount:* ₹${total}%0A` +
      `*Video Date:* ${formData.videoDate}%0A%0A` +
      `I have uploaded the payment screenshot. Please verify.`;
    
    const whatsappUrl = `https://wa.me/message/ZMTBXKUYV7MWB1?text=${message}`;
    window.open(whatsappUrl, '_blank');
  };

  const closeModal = () => {
    setSelectedProduct(null);
    setShowQR(false);
    setShowForm(false);
    setFormData({ ...formData, selectedImage: null, paymentScreenshot: null });
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

      {selectedProduct && (
        <div style={styles.modalOverlay}>
          <div style={{...styles.modalContent, border: `2px solid ${colors.gold}`}}>
            <div style={styles.modalHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {(showForm || showQR) && (
                   <ChevronLeft 
                    cursor="pointer" 
                    size={20} 
                    onClick={() => showQR ? setShowQR(false) : setShowForm(false)} 
                    style={{color: colors.magenta}}
                   />
                )}
                <h3 style={{fontSize: '18px', margin: 0, fontWeight: '800', color: colors.magenta}}>
                  {showQR ? "Secure Payment" : showForm ? "Details" : "Quantity"}
                </h3>
              </div>
              <X cursor="pointer" onClick={closeModal} color="#94a3b8" />
            </div>

            {!showForm && !showQR ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '15px' }}>How many units would you like to sponsor?</p>
                <div style={styles.counterRow}>
                  <button style={{...styles.countBtn, color: colors.magenta}} onClick={() => setQuantity(q => Math.max(getMinQty(selectedProduct.price), q - 1))}><Minus size={20} /></button>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={{...styles.quantityDisplay, color: colors.magenta}}>{quantity}</span>
                    <span style={{fontSize:'10px', color:'#94a3b8', fontWeight: '800'}}>UNITS</span>
                  </div>
                  <button style={{...styles.countBtn, color: colors.magenta}} onClick={() => setQuantity(q => q + 1)}><Plus size={20} /></button>
                </div>
                <div style={{...styles.totalBox, border: `1px solid ${colors.gold}40`}}>
                  <span style={{fontWeight: '700'}}>Total Donation:</span>
                  <span style={{ fontWeight: '800', color: colors.pink }}>₹{selectedProduct.price * quantity}</span>
                </div>
                <button style={{...styles.confirmBtn, background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`}} onClick={() => setShowForm(true)}>Continue</button>
              </div>
            ) : showForm && !showQR ? (
              <div style={{ textAlign: 'left' }}>
                <div style={styles.inputGroup}><label style={styles.label}>FULL NAME</label><input style={styles.input} type="text" name="userName" value={formData.userName} onChange={handleInputChange} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>WHATSAPP NUMBER</label><input style={styles.input} type="number" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>PRINT NAME (ON VIDEO)</label><input style={styles.input} type="text" name="printName" value={formData.printName} onChange={handleInputChange} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>VIDEO DATE</label><input style={styles.input} type="date" name="videoDate" value={formData.videoDate} onChange={handleInputChange} /></div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>WANT TO UPLOAD PHOTO?</label>
                  <select style={styles.input} name="photoNeeded" value={formData.photoNeeded} onChange={handleInputChange}>
                    <option value="No">No, thanks</option>
                    <option value="Yes">Yes, upload photo</option>
                  </select>
                </div>

                {formData.photoNeeded === 'Yes' && (
                  <div style={{...styles.uploadBox, background: '#fff5f8', borderColor: colors.pink, marginBottom: '15px'}}>
                    <label style={{cursor: 'pointer', color: colors.pink, fontSize: '13px', fontWeight: 'bold'}}>
                      <Upload size={14}/> {formData.selectedImage ? "Photo Ready" : "Select Photo"}
                      <input type="file" hidden onChange={(e) => handleFileChange(e, 'selectedImage')} accept="image/*" />
                    </label>
                  </div>
                )}

                <button 
                  style={{...styles.confirmBtn, background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`, opacity: isFormValid ? 1 : 0.5}} 
                  disabled={!isFormValid} 
                  onClick={() => setShowQR(true)}
                >
                  Pay ₹{selectedProduct.price * quantity}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={{...styles.accountBox, background: '#fffdf5', borderColor: colors.gold}}>
                    <p style={{...styles.accountTitle, color: colors.magenta}}>Bank Transfer Details</p>
                    <div onClick={() => handleCopyText("22040210005699", "acc")} style={styles.accountDetailRow}>
                      <span style={{fontSize: '12px'}}>A/C: <strong>22040210005699</strong></span>
                      {copiedAcc ? <span style={styles.copiedBadge}><Check size={12}/> Copied</span> : <Copy size={14} color={colors.gold} />}
                    </div>
                    <div onClick={() => handleCopyText("UCBA0002204", "ifsc")} style={{...styles.accountDetailRow, border: 0}}>
                      <span style={{fontSize: '12px'}}>IFSC: <strong>UCBA0002204</strong></span>
                      {copiedIfsc ? <span style={styles.copiedBadge}><Check size={12}/> Copied</span> : <Copy size={14} color={colors.gold} />}
                    </div>
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin: '20px 0 10px'}}>
                  <p style={{fontSize: '13px', fontWeight: '800', color: colors.magenta}}>Scan to Donate</p>
                  <button onClick={handleDownloadQR} style={{...styles.downloadLink, color: colors.pink}}>
                    <Download size={14}/> Save QR
                  </button>
                </div>

                <div style={{...styles.qrContainer, borderColor: colors.gold}}>
                  <img src={upiQRCode} alt="QR" style={{ width: '160px', borderRadius: '12px' }} />
                </div>

                <div style={{...styles.uploadBox, marginTop: '20px', borderColor: formData.paymentScreenshot ? '#22c55e' : colors.magenta}}>
                   <label style={{cursor: 'pointer', color: formData.paymentScreenshot ? '#22c55e' : colors.magenta, fontSize: '13px', fontWeight: 'bold'}}>
                      <ImageIcon size={14}/> {formData.paymentScreenshot ? "Ready to Verify" : "Upload Payment Screenshot *"}
                      <input type="file" hidden onChange={(e) => handleFileChange(e, 'paymentScreenshot')} accept="image/*" />
                   </label>
                </div>

                <div style={{display: 'flex', gap: '10px', marginTop: '20px'}}>
                    <button 
                      style={{...styles.confirmBtn, backgroundColor: '#25D366', flex: 1, opacity: formData.paymentScreenshot ? 1 : 0.5}} 
                      onClick={handleWhatsAppNotify}
                      disabled={!formData.paymentScreenshot}
                    >
                        <Send size={18}/> Verify on WhatsApp
                    </button>
                    <button style={{...styles.confirmBtn, backgroundColor: '#475569', flex: 1}} onClick={closeModal}>Done</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

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
  cardInfoMeta: { display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '18px' },
  cardName: { fontSize: '17px', fontWeight: '700', margin: 0 },
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