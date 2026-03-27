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
    { id: 4, category: 'Single Product', name: 'Grocery Kit', price: 550, icon: '🧺', img: 'https://i.postimg.cc/NM4STN4y/Whats-App-Image-2026-01-20-at-9-21-49-PM.jpg' },
    { id: 5, category: 'Single Product', name: 'Celebration Cake', price: 600, icon: '🎂', img: 'https://i.postimg.cc/TP24xjGd/Whats-App-Image-2026-02-23-at-3-36-28-PM.jpg' },
    { id: 6, category: 'Combo Product', name: 'Food & Cake Combo', price: 850, icon: '🎁', img: 'https://i.postimg.cc/3RYJYcNp/Whats-App-Image-2026-01-20-at-9-24-33-PM.jpg' },
    { id: 7, category: 'Combo Product', name: 'Mini Party', price: 1500, icon: '🎉', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=600' },
    { id: 8, category: 'Combo Product', name: 'Special Party', price: 2000, icon: '✨', img: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=600' },
    { id: 9, category: 'Combo Product', name: 'Golden Celebration', price: 3000, icon: '🥇', img: 'https://images.unsplash.com/photo-1511795409834-432f7b3027a0?q=80&w=600' },
    { id: 10, category: 'Combo Product', name: 'Grand Party', price: 4500, icon: '👑', img: 'https://i.postimg.cc/zX44YHPZ/Whats-App-Image-2026-02-23-at-3-36-29-PM-(1).jpg' }
  ];

  const getMinQty = (price) => Math.ceil(600 / price);

  // Validations
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
    
    // Updated to use the specific business WhatsApp link
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
              <div style={{overflow: 'hidden', height: '180px', position: 'relative'}}>
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
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <div style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
                {(showForm || showQR) && (
                   <ChevronLeft 
                    cursor="pointer" 
                    size={20} 
                    onClick={() => showQR ? setShowQR(false) : setShowForm(false)} 
                    style={{color: '#64748b'}}
                   />
                )}
                <h3 style={{fontSize: '18px', margin: 0, fontWeight: '800'}}>
                  {showQR ? "Payment" : showForm ? "Information" : "Quantity"}
                </h3>
              </div>
              <X cursor="pointer" onClick={closeModal} />
            </div>

            {!showForm && !showQR ? (
              <div style={{ textAlign: 'center' }}>
                <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '4px' }}>Select Units</p>
                <div style={styles.counterRow}>
                  <button style={styles.countBtn} onClick={() => setQuantity(q => Math.max(getMinQty(selectedProduct.price), q - 1))}><Minus size={20} /></button>
                  <div style={{display:'flex', flexDirection:'column'}}>
                    <span style={styles.quantityDisplay}>{quantity}</span>
                    <span style={{fontSize:'10px', color:'#94a3b8'}}>Units</span>
                  </div>
                  <button style={styles.countBtn} onClick={() => setQuantity(q => q + 1)}><Plus size={20} /></button>
                </div>
                <div style={styles.totalBox}>
                  <span>Total Amount:</span>
                  <span style={{ fontWeight: '800', color: '#0ea5e9' }}>₹{selectedProduct.price * quantity}</span>
                </div>
                <button style={styles.confirmBtn} onClick={() => setShowForm(true)}>Continue</button>
              </div>
            ) : showForm && !showQR ? (
              <div style={{ textAlign: 'left' }}>
                <div style={styles.inputGroup}><label style={styles.label}>Name:</label><input style={styles.input} type="text" name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Full Name" /></div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>WhatsApp Number:</label>
                  <input style={{...styles.input, borderColor: formData.whatsapp && !isPhoneValid ? '#ef4444' : '#e2e8f0'}} type="number" name="whatsapp" value={formData.whatsapp} onChange={handleInputChange} placeholder="10 Digits" />
                </div>

                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email ID (optional):</label>
                  <input style={{...styles.input, borderColor: !isEmailValid ? '#ef4444' : '#e2e8f0'}} type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                </div>

                <div style={styles.inputGroup}><label style={styles.label}>Print Name:</label><input style={styles.input} type="text" name="printName" value={formData.printName} onChange={handleInputChange} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>Kids Wishing:</label><input style={styles.input} type="text" name="kidsWishing" value={formData.kidsWishing} onChange={handleInputChange} /></div>
                <div style={styles.inputGroup}><label style={styles.label}>Video Date:</label><input style={styles.input} type="date" name="videoDate" value={formData.videoDate} onChange={handleInputChange} /></div>
                
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Photo Needed:</label>
                  <select style={styles.input} name="photoNeeded" value={formData.photoNeeded} onChange={handleInputChange}>
                    <option value="No">No</option>
                    <option value="Yes">Yes</option>
                  </select>
                </div>

                {formData.photoNeeded === 'Yes' && (
                  <div style={{...styles.uploadBox, background: '#f0f9ff', borderColor: '#0ea5e9', marginBottom: '10px'}}>
                    <label style={{cursor: 'pointer', color: '#0ea5e9', fontSize: '13px', fontWeight: 'bold'}}>
                      <Upload size={14}/> {formData.selectedImage ? "Photo Selected" : "Upload Photo"}
                      <input type="file" hidden onChange={(e) => handleFileChange(e, 'selectedImage')} accept="image/*" />
                    </label>
                  </div>
                )}

                <button 
                  style={{...styles.confirmBtn, opacity: isFormValid ? 1 : 0.5}} 
                  disabled={!isFormValid} 
                  onClick={() => setShowQR(true)}
                >
                  Confirm & Pay ₹{selectedProduct.price * quantity}
                </button>
              </div>
            ) : (
              <div style={{ textAlign: 'center' }}>
                <div style={styles.accountBox}>
                    <p style={styles.accountTitle}>Uco Bank Details (Tap to Copy)</p>
                    <div 
                      className="copy-click" 
                      onClick={() => handleCopyText("22040210005699", "acc")}
                      style={{...styles.accountDetailRow, cursor: 'pointer'}}
                    >
                      <span>A/C: <strong>22040210005699</strong></span>
                      {copiedAcc ? <span style={styles.copiedBadge}><Check size={12}/> Copied</span> : <Copy size={14} color="#0ea5e9" />}
                    </div>
                    <div 
                      className="copy-click" 
                      onClick={() => handleCopyText("UCBA0002204", "ifsc")}
                      style={{...styles.accountDetailRow, border: 0, cursor: 'pointer'}}
                    >
                      <span>IFSC: <strong>UCBA0002204</strong></span>
                      {copiedIfsc ? <span style={styles.copiedBadge}><Check size={12}/> Copied</span> : <Copy size={14} color="#0ea5e9" />}
                    </div>
                    <div style={{fontSize: '11px', textAlign: 'center', color: '#64748b', marginTop: '4px'}}>Name: <strong>Helpglow Foundation</strong></div>
                </div>
                
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', margin: '15px 0 10px'}}>
                  <p style={{fontSize: '13px', fontWeight: '700', color: '#64748b'}}>Scan QR Code</p>
                  <button onClick={handleDownloadQR} style={styles.downloadLink}>
                    <Download size={14}/> Save QR
                  </button>
                </div>

                <div style={styles.qrContainer}>
                  <img src={upiQRCode} alt="QR" style={{ width: '150px', borderRadius: '15px' }} />
                </div>

                <div style={{...styles.uploadBox, marginTop: '15px', borderColor: formData.paymentScreenshot ? '#22c55e' : '#ef4444'}}>
                   <label style={{cursor: 'pointer', color: formData.paymentScreenshot ? '#22c55e' : '#ef4444', fontSize: '13px', fontWeight: 'bold'}}>
                      <ImageIcon size={14}/> {formData.paymentScreenshot ? "Screenshot Ready" : "Upload Screenshot *"}
                      <input type="file" hidden onChange={(e) => handleFileChange(e, 'paymentScreenshot')} accept="image/*" />
                   </label>
                </div>

                <div style={{display: 'flex', gap: '10px', marginTop: '15px'}}>
                    <button 
                      style={{...styles.confirmBtn, backgroundColor: '#25D366', flex: 1, opacity: formData.paymentScreenshot ? 1 : 0.5}} 
                      onClick={handleWhatsAppNotify}
                      disabled={!formData.paymentScreenshot}
                    >
                        <Send size={18}/> Send WhatsApp
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
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; transition: all 0.2s ease; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .donation-card:hover { transform: translateY(-10px); box-shadow: 0 20px 40px rgba(14, 165, 233, 0.2); }
        .copy-click:active { transform: scale(0.96); background: #e0f2fe; }
      `}</style>
    </div>
  );
};

const styles = {
  pageWrapper: { minHeight: '100vh', backgroundColor: '#fcfdfe', overflowX: 'hidden' },
  heroBanner: { width: '100%', height: '280px', background: 'linear-gradient(135deg, #0ea5e9 0%, #38bdf8 60%, #bae6fd 100%)', display: 'flex', alignItems: 'center', padding: '0 8%', color: '#fff', marginBottom: '20px' },
  heroHeading: { fontSize: 'clamp(32px, 5vw, 48px)', fontWeight: '800', margin: 0 },
  heroSubHeading: { fontSize: '18px', marginTop: '12px', opacity: 0.9 },
  foundationTag: { fontSize: '14px', fontWeight: '600', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', margin: '0 0 10px 0' },
  headerArea: { textAlign: 'center', padding: '30px 20px', backgroundColor: '#fff', borderBottom: '1px solid #f1f5f9' },
  searchContainer: { position: 'relative', maxWidth: '500px', margin: '0 auto 25px', boxShadow: '0 8px 25px rgba(14, 165, 233, 0.08)', borderRadius: '50px' },
  searchInput: { width: '100%', padding: '16px 25px', borderRadius: '50px', border: '1px solid #e2e8f0', outline: 'none', fontSize: '15px' },
  searchIcon: { position: 'absolute', right: '22px', top: '18px' },
  categoryNav: { display: 'flex', gap: '12px', overflowX: 'auto', paddingBottom: '15px', maxWidth: '1000px', margin: '0 auto' },
  categoryPill: { padding: '10px 24px', borderRadius: '50px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', border: '1px solid' },
  feedContainer: { maxWidth: '1300px', margin: '30px auto', padding: '0 20px 80px' },
  cardGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '25px' },
  donationCard: { borderRadius: '20px', overflow: 'hidden', background: '#fff', border: '1px solid #f1f5f9' },
  cardImage: { backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', height: '100%' },
  cardCatTag: { position: 'absolute', top: '12px', left: '12px', fontSize: '10px', background: 'rgba(15, 23, 42, 0.8)', padding: '4px 10px', borderRadius: '5px', color: '#fff' },
  cardContent: { padding: '20px' },
  cardInfoMeta: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px', borderBottom: '1px solid #f1f5f9', paddingBottom: '15px' },
  cardName: { fontSize: '16px', fontWeight: '600', margin: 0 },
  cardActionArea: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  priceTag: { display: 'flex', alignItems: 'baseline', color: '#0ea5e9', fontWeight: '800' },
  donateBtn: { display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '10px', fontWeight: 'bold', cursor: 'pointer' },
  modalOverlay: { position: 'fixed', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' },
  modalContent: { backgroundColor: '#fff', padding: '30px', borderRadius: '28px', width: '100%', maxWidth: '420px', maxHeight: '95vh', overflowY: 'auto' },
  modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' },
  counterRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '25px', marginBottom: '20px' },
  countBtn: { width: '45px', height: '45px', borderRadius: '50%', border: 'none', backgroundColor: '#f0f9ff', color: '#0ea5e9', cursor: 'pointer' },
  quantityDisplay: { fontSize: '24px', fontWeight: '800' },
  totalBox: { backgroundColor: '#f8fafc', padding: '15px', borderRadius: '15px', display: 'flex', justifyContent: 'space-between', margin: '20px 0' },
  confirmBtn: { width: '100%', padding: '14px', background: '#0ea5e9', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer' },
  qrContainer: { padding: '10px', background: '#f8fafc', borderRadius: '20px', border: '1px dashed #cbd5e1' },
  accountBox: { textAlign: 'left', background: '#f0f9ff', padding: '15px', borderRadius: '15px', border: '1px solid #bae6fd' },
  accountTitle: { fontWeight: '800', color: '#0ea5e9', marginBottom: '8px', textAlign: 'center', fontSize: '12px' },
  accountDetailRow: { display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '5px', padding: '8px', borderRadius: '8px' },
  label: { display: 'block', fontSize: '12px', fontWeight: '800', color: '#64748b', marginBottom: '5px' },
  input: { width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '12px', outline: 'none' },
  uploadBox: { padding: '15px', border: '1px dashed', borderRadius: '12px', textAlign: 'center' },
  inputGroup: { marginBottom: '5px' },
  downloadLink: { background:'none', border:'none', color:'#0ea5e9', display:'flex', alignItems:'center', gap:'4px', fontSize:'12px', fontWeight:'700', cursor:'pointer' },
  copiedBadge: { background: '#22c55e', color: '#fff', fontSize: '10px', padding: '2px 6px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '2px' }
};

export default Menu;