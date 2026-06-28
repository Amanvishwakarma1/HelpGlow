import React, { useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  ShoppingCart, X, Plus, Minus, Trash2, ChevronLeft, 
  Copy, Check, Download, Image as ImageIcon, Send, Upload 
} from 'lucide-react';
import { CartContext } from '../../context/CartContext';
import { AuthContext } from '../../context/AuthContext';
import { getMinQty, isSingleEntity } from '../../config/products';
import upiQRCode from '../../assets/donation-qr.jpeg';
import toast from 'react-hot-toast';

export default function CartDrawer() {
  const navigate = useNavigate();
  const location = useLocation();
  const { 
    cartItems, isCartOpen, setIsCartOpen, removeFromCart, 
    updateQuantity, clearCart, checkoutDetails, setCheckoutDetails 
  } = useContext(CartContext);
  const { user } = useContext(AuthContext);

  // Close cart drawer on route changes (e.g. clicking headers)
  useEffect(() => {
    setIsCartOpen(false);
  }, [location.pathname, setIsCartOpen]);

  // Handle mobile back button to close the drawer
  useEffect(() => {
    if (isCartOpen) {
      if (!window.history.state?.cartOpen) {
        window.history.pushState({ cartOpen: true }, "");
      }
    }
  }, [isCartOpen]);

  useEffect(() => {
    const handlePopState = (e) => {
      if (isCartOpen) {
        setIsCartOpen(false);
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isCartOpen, setIsCartOpen]);

  const closeCart = () => {
    setIsCartOpen(false);
    if (window.history.state?.cartOpen) {
      window.history.back();
    }
  };

  const [step, setStep] = useState('cart'); // 'cart' | 'details' | 'payment'
  const [copiedAcc, setCopiedAcc] = useState(false);
  const [copiedIfsc, setCopiedIfsc] = useState(false);

  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fffdf9',
    lightPink: '#fff5f8'
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity, 
    0
  );

  const isPhoneValid = /^\d{10}$/.test(checkoutDetails.whatsapp);
  const isEmailValid = checkoutDetails.email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(checkoutDetails.email);
  const isFormValid = checkoutDetails.userName && isPhoneValid && isEmailValid;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'whatsapp' && value.length > 10) return;
    setCheckoutDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e, field) => {
    if (e.target.files && e.target.files[0]) {
      setCheckoutDetails(prev => ({ ...prev, [field]: e.target.files[0] }));
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
    toast.success("Copied to clipboard!");
  };

  const handleDownloadQR = () => {
    const link = document.createElement('a');
    link.href = upiQRCode;
    link.download = 'HelpGlow_Donation_QR.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleProceedToDetails = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true' || !!localStorage.getItem('user') || !!user;
    if (!isLoggedIn) {
      toast.error("Authentication required. Please login to proceed.");
      navigate('/login');
      closeCart();
      return;
    }
    setStep('details');
  };

  const handleWhatsAppNotify = () => {
    let itemsText = "";
    cartItems.forEach((item) => {
      itemsText += `- ${item.product.name} x ${item.quantity} (₹${item.product.price * item.quantity})%0A`;
    });

    const message = `*NEW DONATION VERIFICATION*%0A%0A` +
      `*Donor:* ${checkoutDetails.userName}%0A` +
      `*WhatsApp:* ${checkoutDetails.whatsapp}%0A` +
      `*Email:* ${checkoutDetails.email || 'N/A'}%0A` +
      `*Print Name:* ${checkoutDetails.printName}%0A` +
      `*Wishing:* ${checkoutDetails.kidsWishing}%0A%0A` +
      `*Donation Items:*%0A${itemsText}%0A` +
      `*Total Amount:* ₹${totalAmount}%0A` +
      `*Video Date:* ${checkoutDetails.videoDate}%0A%0A` +
      `I have uploaded the payment screenshot. Please verify.`;
    
    const whatsappUrl = `https://wa.me/message/ZMTBXKUYV7MWB1?text=${message}`;
    window.open(whatsappUrl, '_blank');
    
    // Clear and close
    clearCart();
    setStep('cart');
    closeCart();
    toast.success("Thank you for your donation!");
  };

  const handleDone = () => {
    clearCart();
    setStep('cart');
    closeCart();
    toast.success("Thank you for your support!");
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(26, 32, 44, 0.6)',
              backdropFilter: 'blur(6px)',
              zIndex: 1000
            }}
          />

          {/* Cart Panel Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100vh',
              width: '100%',
              maxWidth: '460px',
              backgroundColor: '#fff',
              boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.1)',
              zIndex: 1050,
              display: 'flex',
              flexDirection: 'column',
              borderLeft: `2.5px solid ${colors.gold}30`,
              boxSizing: 'border-box'
            }}
          >
            {/* Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '20px 25px',
              borderBottom: '1px solid #f1f5f9',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {step !== 'cart' && (
                  <ChevronLeft 
                    cursor="pointer" 
                    size={22} 
                    onClick={() => setStep(step === 'payment' ? 'details' : 'cart')} 
                    style={{ color: colors.magenta, marginRight: '4px' }}
                  />
                )}
                <h3 style={{ 
                  fontSize: '20px', 
                  margin: 0, 
                  fontWeight: '800', 
                  color: colors.magenta,
                  textTransform: 'capitalize'
                }}>
                  {step === 'cart' ? 'Your Cart' : step === 'details' ? 'Donor Details' : 'Secure Donation'}
                </h3>
              </div>
              <button 
                onClick={closeCart}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#94a3b8',
                  padding: '5px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f1f5f9'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Container */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '25px', boxSizing: 'border-box' }}>
              
              {/* STEP 1: CART ITEMS */}
              {step === 'cart' && (
                <>
                  {cartItems.length === 0 ? (
                    <div style={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      height: '60%',
                      textAlign: 'center'
                    }}>
                      <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: colors.lightPink,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginBottom: '20px',
                        color: colors.pink
                      }}>
                        <ShoppingCart size={36} />
                      </div>
                      <h4 style={{ color: '#1e293b', fontSize: '18px', fontWeight: '800', margin: '0 0 10px' }}>Your cart is empty</h4>
                      <p style={{ color: '#64748b', fontSize: '14px', margin: '0 0 25px', maxWidth: '280px', lineHeight: 1.5 }}>
                        Every contribution lights a spark of hope. Sponser meals, kits or parties.
                      </p>
                      <button 
                        onClick={() => {
                          closeCart();
                          navigate('/menu');
                        }}
                        style={{
                          background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`,
                          color: '#fff',
                          border: 'none',
                          padding: '12px 30px',
                          borderRadius: '50px',
                          fontWeight: '800',
                          cursor: 'pointer',
                          boxShadow: `0 8px 20px ${colors.pink}30`
                        }}
                      >
                        Browse Donation Menu
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      {cartItems.map((item) => {
                        const minQty = isSingleEntity(item.product) ? 1 : getMinQty(item.product.price);
                        return (
                          <div 
                            key={item.product.id} 
                            style={{
                              display: 'flex',
                              gap: '15px',
                              padding: '15px',
                              borderRadius: '20px',
                              backgroundColor: '#fff',
                              border: '1.5px solid rgba(142, 35, 130, 0.06)',
                              boxShadow: '0 4px 15px rgba(142, 35, 130, 0.02)',
                              position: 'relative'
                            }}
                          >
                            <img 
                              src={item.product.img} 
                              alt={item.product.name} 
                              style={{
                                width: '80px',
                                height: '80px',
                                borderRadius: '15px',
                                objectFit: 'cover',
                                border: '1px solid #edf2f7'
                              }}
                            />
                            
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                              <div>
                                <h4 style={{ fontSize: '15px', fontWeight: '800', color: '#1e293b', margin: '0 0 4px' }}>
                                  {item.product.name}
                                </h4>
                                <span style={{ fontSize: '13px', fontWeight: '700', color: colors.pink }}>
                                  ₹{item.product.price} <span style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '600' }}>/ unit</span>
                                </span>
                              </div>

                              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px' }}>
                                <div style={{ 
                                  display: 'flex', 
                                  alignItems: 'center', 
                                  background: '#f8fafc', 
                                  borderRadius: '50px', 
                                  padding: '4px 10px',
                                  border: '1px solid #e2e8f0'
                                }}>
                                  <button 
                                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                    disabled={item.quantity <= minQty}
                                    style={{
                                      border: 'none', background: 'none', cursor: 'pointer', display: 'flex', 
                                      alignItems: 'center', justifyContent: 'center', padding: '2px', color: item.quantity <= minQty ? '#cbd5e1' : colors.magenta
                                    }}
                                  >
                                    <Minus size={14} />
                                  </button>
                                  <span style={{ fontSize: '13px', fontWeight: '800', width: '32px', textAlign: 'center', color: '#1e293b' }}>
                                    {item.quantity}
                                  </span>
                                  <button 
                                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                    style={{
                                      border: 'none', background: 'none', cursor: 'pointer', display: 'flex', 
                                      alignItems: 'center', justifyContent: 'center', padding: '2px', color: colors.magenta
                                    }}
                                  >
                                    <Plus size={14} />
                                  </button>
                                </div>

                                <button 
                                  onClick={() => removeFromCart(item.product.id)}
                                  style={{
                                    border: 'none', background: 'none', cursor: 'pointer', color: '#ef4444',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '5px', borderRadius: '50%'
                                  }}
                                  onMouseEnter={(e) => e.target.style.backgroundColor = '#fef2f2'}
                                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            {/* Subtotal right top */}
                            <div style={{
                              position: 'absolute',
                              top: '15px',
                              right: '15px',
                              fontWeight: '900',
                              fontSize: '14px',
                              color: colors.magenta
                            }}>
                              ₹{item.product.price * item.quantity}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </>
              )}

              {/* STEP 2: DONOR DETAILS FORM */}
              {step === 'details' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '10px', lineHeight: 1.5 }}>
                    Please fill out the donor information. This is used for video wishes and receipts.
                  </p>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>FULL NAME *</label>
                    <input 
                      type="text" 
                      name="userName" 
                      value={checkoutDetails.userName} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600' }}
                      placeholder="Enter your name"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>WHATSAPP NUMBER (10 DIGITS) *</label>
                    <input 
                      type="number" 
                      name="whatsapp" 
                      value={checkoutDetails.whatsapp} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600' }}
                      placeholder="e.g. 9876543210"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>EMAIL ADDRESS (OPTIONAL)</label>
                    <input 
                      type="email" 
                      name="email" 
                      value={checkoutDetails.email} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600' }}
                      placeholder="e.g. name@example.com"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>PRINT NAME (ON WISH VIDEO) *</label>
                    <input 
                      type="text" 
                      name="printName" 
                      value={checkoutDetails.printName} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600' }}
                      placeholder="e.g. Sandeep Weds Priya"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>WISHING / OCCASION DETAILS</label>
                    <input 
                      type="text" 
                      name="kidsWishing" 
                      value={checkoutDetails.kidsWishing} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600' }}
                      placeholder="e.g. Happy 1st Anniversary!"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>VIDEO / CELEBRATION DATE *</label>
                    <input 
                      type="date" 
                      name="videoDate" 
                      value={checkoutDetails.videoDate} 
                      onChange={handleInputChange} 
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600' }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', fontWeight: '900', color: '#94a3b8', letterSpacing: '0.5px' }}>WANT TO UPLOAD PHOTO?</label>
                    <select 
                      name="photoNeeded" 
                      value={checkoutDetails.photoNeeded} 
                      onChange={handleInputChange}
                      style={{ width: '100%', padding: '12px 15px', borderRadius: '12px', border: '1.5px solid #edf2f7', outline: 'none', fontSize: '14px', fontWeight: '600', backgroundColor: '#fff' }}
                    >
                      <option value="No">No, thanks</option>
                      <option value="Yes">Yes, upload photo</option>
                    </select>
                  </div>

                  {checkoutDetails.photoNeeded === 'Yes' && (
                    <div style={{
                      padding: '18px',
                      border: '2px dashed',
                      borderRadius: '15px',
                      textAlign: 'center',
                      background: '#fff5f8',
                      borderColor: colors.pink,
                      marginTop: '5px'
                    }}>
                      <label style={{ cursor: 'pointer', color: colors.pink, fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                        <Upload size={16}/> {checkoutDetails.selectedImage ? "Photo Ready" : "Select Photo"}
                        <input type="file" hidden onChange={(e) => handleFileChange(e, 'selectedImage')} accept="image/*" />
                      </label>
                      {checkoutDetails.selectedImage && (
                        <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#64748b' }}>{checkoutDetails.selectedImage.name}</p>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* STEP 3: SECURE PAYMENT */}
              {step === 'payment' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'center' }}>
                  <div style={{
                    textAlign: 'left',
                    padding: '18px',
                    borderRadius: '20px',
                    border: `2px solid ${colors.gold}`,
                    background: '#fffdf5'
                  }}>
                    <p style={{
                      fontWeight: '900',
                      marginBottom: '12px',
                      textAlign: 'center',
                      fontSize: '13px',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      color: colors.magenta,
                      margin: '0 0 10px'
                    }}>Bank Transfer Details</p>
                    
                    <div 
                      onClick={() => handleCopyText("22040210005699", "acc")} 
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', marginBottom: '8px', 
                        padding: '10px', borderRadius: '10px', background: '#fff', border: '1px solid #f1f5f9', cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#475569' }}>A/C: <strong>22040210005699</strong></span>
                      {copiedAcc ? (
                        <span style={{ background: '#22c55e', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Check size={12}/> Copied
                        </span>
                      ) : <Copy size={14} color={colors.gold} />}
                    </div>

                    <div 
                      onClick={() => handleCopyText("UCBA0002204", "ifsc")} 
                      style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', 
                        padding: '10px', borderRadius: '10px', background: '#fff', border: '1px solid #f1f5f9', cursor: 'pointer'
                      }}
                    >
                      <span style={{ fontSize: '12px', color: '#475569' }}>IFSC: <strong>UCBA0002204</strong></span>
                      {copiedIfsc ? (
                        <span style={{ background: '#22c55e', color: '#fff', fontSize: '10px', padding: '3px 8px', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Check size={12}/> Copied
                        </span>
                      ) : <Copy size={14} color={colors.gold} />}
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '10px 0 5px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '800', color: colors.magenta, margin: 0 }}>Scan to Donate</p>
                    <button 
                      onClick={handleDownloadQR} 
                      style={{ background: 'none', border: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', color: colors.pink }}
                    >
                      <Download size={14}/> Save QR Code
                    </button>
                  </div>

                  <div style={{
                    padding: '15px',
                    background: '#fff',
                    borderRadius: '20px',
                    border: '2px dashed #e2e8f0',
                    display: 'inline-block',
                    alignSelf: 'center'
                  }}>
                    <img src={upiQRCode} alt="QR Code" style={{ width: '160px', borderRadius: '12px', display: 'block' }} />
                  </div>

                  <div style={{
                    padding: '18px',
                    border: '2px dashed',
                    borderRadius: '15px',
                    textAlign: 'center',
                    background: checkoutDetails.paymentScreenshot ? '#f0fdf4' : '#fff',
                    borderColor: checkoutDetails.paymentScreenshot ? '#22c55e' : colors.magenta,
                    marginTop: '10px'
                  }}>
                    <label style={{ cursor: 'pointer', color: checkoutDetails.paymentScreenshot ? '#22c55e' : colors.magenta, fontSize: '13px', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                      <ImageIcon size={16}/> {checkoutDetails.paymentScreenshot ? "Screenshot Attached" : "Upload Payment Screenshot *"}
                      <input type="file" hidden onChange={(e) => handleFileChange(e, 'paymentScreenshot')} accept="image/*" />
                    </label>
                    {checkoutDetails.paymentScreenshot && (
                      <p style={{ margin: '5px 0 0', fontSize: '11px', color: '#64748b' }}>{checkoutDetails.paymentScreenshot.name}</p>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Footer Container */}
            {cartItems.length > 0 && (
              <div style={{
                padding: '20px 25px 30px',
                borderTop: '1px solid #f1f5f9',
                backgroundColor: '#f8fafc',
                borderBottomLeftRadius: '0',
                borderBottomRightRadius: '0'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <span style={{ fontSize: '15px', fontWeight: '700', color: '#64748b' }}>Total Donation Amount:</span>
                  <span style={{ fontSize: '24px', fontWeight: '900', color: colors.pink }}>₹{totalAmount}</span>
                </div>

                {step === 'cart' && (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={clearCart}
                      style={{
                        padding: '14px 20px',
                        border: '1.5px solid #cbd5e1',
                        borderRadius: '50px',
                        backgroundColor: '#fff',
                        color: '#64748b',
                        fontWeight: '700',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={(e) => { e.target.style.backgroundColor = '#f1f5f9'; e.target.style.color = '#1e293b'; }}
                      onMouseLeave={(e) => { e.target.style.backgroundColor = '#fff'; e.target.style.color = '#64748b'; }}
                    >
                      Clear
                    </button>
                    <button
                      onClick={handleProceedToDetails}
                      style={{
                        flex: 1,
                        padding: '14px 25px',
                        background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`,
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: '800',
                        fontSize: '15px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        boxShadow: `0 8px 20px ${colors.pink}25`
                      }}
                    >
                      <ShoppingCart size={18} /> Sponser Now
                    </button>
                  </div>
                )}

                {step === 'details' && (
                  <button
                    disabled={!isFormValid}
                    onClick={() => setStep('payment')}
                    style={{
                      width: '100%',
                      padding: '15px 25px',
                      background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`,
                      color: '#fff',
                      border: 'none',
                      borderRadius: '50px',
                      fontWeight: '800',
                      fontSize: '15px',
                      cursor: isFormValid ? 'pointer' : 'not-allowed',
                      opacity: isFormValid ? 1 : 0.6,
                      boxShadow: isFormValid ? `0 8px 20px ${colors.pink}25` : 'none'
                    }}
                  >
                    Proceed to Payment (₹{totalAmount})
                  </button>
                )}

                {step === 'payment' && (
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      disabled={!checkoutDetails.paymentScreenshot}
                      onClick={handleWhatsAppNotify}
                      style={{
                        flex: 1.2,
                        padding: '15px 20px',
                        backgroundColor: '#25D366',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: '800',
                        fontSize: '14px',
                        cursor: checkoutDetails.paymentScreenshot ? 'pointer' : 'not-allowed',
                        opacity: checkoutDetails.paymentScreenshot ? 1 : 0.6,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '6px'
                      }}
                    >
                      <Send size={16} /> WhatsApp Verify
                    </button>
                    <button
                      onClick={handleDone}
                      style={{
                        flex: 0.8,
                        padding: '15px 20px',
                        backgroundColor: '#475569',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '50px',
                        fontWeight: '800',
                        fontSize: '14px',
                        cursor: 'pointer'
                      }}
                    >
                      Done
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
