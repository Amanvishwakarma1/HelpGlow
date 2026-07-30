import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, 
  Sparkles, CheckCircle2, Heart, CreditCard, Lock, Upload, 
  Camera, FileText, Calendar, User, Phone, Mail, MessageSquare, AlertCircle, ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import PaymentQRCard from '../components/PaymentQRCard';
import { API_ENDPOINTS } from '../config/api';

const API_UPLOAD_URL = API_ENDPOINTS.UPLOAD;
const API_DONATION_URL = API_ENDPOINTS.DONATIONS;
const ADMIN_WHATSAPP_NUMBER = '8528220733';

const Cart = () => {
  const { cart, updateQty, removeFromCart, clearCart, cartTotal } = useCart();
  
  // Checkout Modal State
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [step, setStep] = useState(1); // 1 = Donor Info Form, 2 = Payment QR & Receipt Upload, 3 = Confirmation Success
  
  // Step 1: Donor Information Form Fields
  const [fullName, setFullName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [printName, setPrintName] = useState('');
  const [wishingDetails, setWishingDetails] = useState('');
  const [videoDate, setVideoDate] = useState('');
  const [wantUploadPhoto, setWantUploadPhoto] = useState('no'); // 'yes' | 'no'
  const [donorPhotoUrl, setDonorPhotoUrl] = useState('');
  const [uploadingPhoto, setUploadingPhoto] = useState(false);

  // Step 2: Payment Receipt Screenshot State
  const [paymentScreenshotUrl, setPaymentScreenshotUrl] = useState('');
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [submittingDonation, setSubmittingDonation] = useState(false);

  // Error messaging inside modal
  const [modalError, setModalError] = useState('');

  // Handle donor photo upload to Cloudinary
  const handleDonorPhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingPhoto(true);
    setModalError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('helpglow_token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(API_UPLOAD_URL, {
        method: 'POST',
        headers: headers,
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload photo');
      
      setDonorPhotoUrl(data.url);
      setUploadingPhoto(false);
    } catch (err) {
      console.error('Photo upload error:', err);
      setModalError('Failed to upload photo: ' + err.message);
      setUploadingPhoto(false);
    }
  };

  // Handle payment receipt upload to Cloudinary
  const handleReceiptUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingReceipt(true);
    setModalError('');
    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('helpglow_token');
      const headers = {};
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(API_UPLOAD_URL, {
        method: 'POST',
        headers: headers,
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload payment receipt');

      setPaymentScreenshotUrl(data.url);
      setUploadingReceipt(false);
    } catch (err) {
      console.error('Receipt upload error:', err);
      setModalError('Failed to upload payment receipt: ' + err.message);
      setUploadingReceipt(false);
    }
  };

  // Move from Step 1 -> Step 2
  const handleNextStep = (e) => {
    e.preventDefault();
    setModalError('');

    if (!fullName.trim() || !whatsapp.trim() || !printName.trim() || !videoDate.trim()) {
      setModalError('Please fill in all required fields marked with (*).');
      return;
    }

    if (whatsapp.trim().length < 10) {
      setModalError('Please enter a valid 10-digit WhatsApp number.');
      return;
    }

    if (wantUploadPhoto === 'yes' && !donorPhotoUrl && !uploadingPhoto) {
      setModalError('Please wait for your donor photo to finish uploading or choose "No".');
      return;
    }

    setStep(2);
  };

  // Final Submit Action (Saves to DB + Triggers WhatsApp + Clears Cart)
  const handleSubmitDonation = async () => {
    setModalError('');

    if (!paymentScreenshotUrl) {
      setModalError('Please upload your payment receipt screenshot before submitting.');
      return;
    }

    setSubmittingDonation(true);

    const donationData = {
      donor_name: fullName.trim(),
      whatsapp: whatsapp.trim(),
      email: email.trim() || null,
      print_name: printName.trim(),
      wishing_details: wishingDetails.trim() || null,
      video_date: videoDate,
      photo_url: donorPhotoUrl || null,
      amount: cartTotal,
      payment_screenshot_url: paymentScreenshotUrl,
      items: cart
    };

    try {
      // 1. Save to Database
      const token = localStorage.getItem('helpglow_token');
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const res = await fetch(API_DONATION_URL, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(donationData)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save donation record');

      // 2. Format WhatsApp Message for Admin (8528220733)
      const itemsListText = cart.map(i => `• ${i.name} (x${i.qty}) - ₹${i.price * i.qty}`).join('\n');
      const waText = 
`🎉 *NEW DONATION RECEIVED - HELPGLOW FOUNDATION* 🎉
----------------------------------------
👤 *Full Name:* ${fullName.trim()}
📱 *WhatsApp Number:* +91${whatsapp.trim()}
✉️ *Email Address:* ${email.trim() || 'N/A'}
📹 *Print Name (Wish Video):* ${printName.trim()}
📅 *Video / Celebration Date:* ${videoDate}
💬 *Occasion Details:* ${wishingDetails.trim() || 'General Sponsorship'}
💰 *Total Amount Paid:* ₹${cartTotal.toLocaleString()}

🛒 *Sponsored Items:*
${itemsListText}

${donorPhotoUrl ? `📷 *Donor Photo:* ${donorPhotoUrl}\n` : ''}
🧾 *Payment Receipt Screenshot:* ${paymentScreenshotUrl}
----------------------------------------
*HelpGlow NGO Direct Giving System*`;

      const whatsappUrl = `https://wa.me/91${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
      
      // Open WhatsApp window
      window.open(whatsappUrl, '_blank');

      // 3. Update UI state
      setSubmittingDonation(false);
      setStep(3); // Success step
      clearCart();

    } catch (err) {
      console.error('Submission error:', err);
      setModalError('Failed to complete submission: ' + err.message);
      setSubmittingDonation(false);
    }
  };

  const closeCheckoutModal = () => {
    setIsCheckoutOpen(false);
    setStep(1);
    setModalError('');
    setPaymentScreenshotUrl('');
    setDonorPhotoUrl('');
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111827', backgroundColor: '#F8F9FA', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* 1. Hero Header Unit */}
      <section style={{ 
        position: 'relative', 
        backgroundColor: '#16203A', 
        color: '#FFFFFF', 
        padding: '130px 24px 70px 24px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Glow Orbs */}
        <motion.div 
          animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-10%',
            left: '20%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(10, 144, 181, 0.28) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span style={{ 
              background: 'linear-gradient(135deg, rgba(10, 144, 181, 0.15), rgba(10, 144, 181, 0.05))', 
              color: '#0A90B5', 
              border: '1px solid rgba(10, 144, 181, 0.4)',
              padding: '8px 22px', 
              borderRadius: '50px', 
              fontSize: '13px', 
              fontWeight: 800, 
              letterSpacing: '1.8px',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '16px'
            }}>
              <ShoppingBag size={16} color="#0A90B5" />
              YOUR SPONSORSHIP CART
            </span>

            <h1 
              style={{ 
                fontFamily: "'Clash Display', 'Outfit', sans-serif", 
                fontSize: 'clamp(36px, 5vw, 54px)', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #FFFFFF 40%, #FCDCB5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 16px 0',
                lineHeight: 1.15
              }}
            >
              Review Your Direct Giving Package
            </h1>

            <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.85)', margin: 0 }}>
              100% of your contributions go directly toward food packets, kits, and ground celebrations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Main Cart Content Area */}
      <section style={{ padding: '60px 24px 100px 24px' }}>
        <div style={{ maxWidth: '1280px', width: '95%', margin: '0 auto' }}>

          {cart.length === 0 ? (
            /* Empty Cart View */
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ 
                textAlign: 'center', 
                backgroundColor: '#FFFFFF', 
                borderRadius: '28px', 
                padding: '80px 30px', 
                maxWidth: '650px', 
                margin: '0 auto',
                border: '1px solid #E5E7EB',
                boxShadow: '0 20px 40px rgba(0,0,0,0.04)'
              }}
            >
              <div style={{ backgroundColor: 'rgba(10, 144, 181, 0.08)', padding: '24px', borderRadius: '50%', display: 'inline-flex', marginBottom: '24px' }}>
                <ShoppingBag size={56} color="#0A90B5" />
              </div>
              <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '32px', fontWeight: 800, color: '#16203A', margin: '0 0 12px 0' }}>
                Your Sponsorship Cart is Empty
              </h2>
              <p style={{ fontSize: '16px', color: '#6B7280', marginBottom: '32px', lineHeight: 1.6 }}>
                You haven't selected any celebration meal kits or sponsorship packages yet. Explore our cause items to sponsor meals and smiles today!
              </p>
              <Link 
                to="/menu" 
                style={{
                  background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                  color: '#FFFFFF',
                  padding: '16px 36px',
                  borderRadius: '50px',
                  fontSize: '16px',
                  fontWeight: 800,
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '10px',
                  boxShadow: '0 6px 20px rgba(10, 144, 181, 0.25), 0 2px 8px rgba(217, 91, 40, 0.2)'
                }}
              >
                Browse Sponsorship Menu
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          ) : (
            /* Active Cart Items View */
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '36px', alignItems: 'flex-start' }}>

              {/* Left Column: Cart Items List */}
              <div style={{ flex: '1 1 650px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
                  <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '26px', fontWeight: 800, color: '#16203A', margin: 0 }}>
                    Selected Cause Packets ({cart.length})
                  </h2>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <AnimatePresence>
                    {cart.map((item) => {
                      const itemKey = item.cartItemId || item.id;
                      return (
                      <motion.div
                        key={itemKey}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        style={{
                          backgroundColor: '#FFFFFF',
                          borderRadius: '20px',
                          padding: '24px',
                          border: '1px solid #E5E7EB',
                          boxShadow: '0 8px 24px rgba(0,0,0,0.03)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '20px',
                          flexWrap: 'wrap'
                        }}
                      >
                        <img 
                          src={item.img || item.image} 
                          alt={item.name} 
                          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '14px', flexShrink: 0 }}
                        />
                        <div style={{ flex: 1, minWidth: '200px' }}>
                          <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A90B5', textTransform: 'uppercase', letterSpacing: '1px' }}>
                            {item.category || 'Direct Giving'}
                          </span>
                          <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '4px 0 6px 0' }}>
                            {item.name}
                          </h3>
                          <div style={{ fontSize: '18px', fontWeight: 800, color: '#0A90B5' }}>
                            ₹{item.price.toLocaleString()} <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 500 }}>/ {item.unit || 'packet'}</span>
                          </div>
                        </div>

                        {/* Quantity controls */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#F3F4F6', borderRadius: '12px', padding: '4px' }}>
                            <button
                              type="button"
                              onClick={() => updateQty(itemKey, item.qty - 1)}
                              style={{ backgroundColor: '#FFFFFF', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Minus size={14} color="#111827" />
                            </button>
                            <span style={{ padding: '0 16px', fontWeight: 800, fontSize: '16px', color: '#111827' }}>
                              {item.qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(itemKey, item.qty + 1)}
                              style={{ backgroundColor: '#FFFFFF', border: 'none', width: '32px', height: '32px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                            >
                              <Plus size={14} color="#111827" />
                            </button>
                          </div>

                          <div style={{ fontSize: '18px', fontWeight: 800, color: '#16203A', minWidth: '80px', textAlign: 'right' }}>
                            ₹{(item.price * item.qty).toLocaleString()}
                          </div>

                          <button
                            type="button"
                            onClick={() => removeFromCart(itemKey)}
                            style={{
                              backgroundColor: 'rgba(239, 68, 68, 0.1)',
                              color: '#EF4444',
                              border: 'none',
                              padding: '10px',
                              borderRadius: '12px',
                              cursor: 'pointer'
                            }}
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </motion.div>
                    );
                    })}
                  </AnimatePresence>
                </div>
              </div>

              {/* Right Column: Grand Total Summary & Checkout Button */}
              <div style={{ flex: '1 1 380px', maxWidth: '440px', width: '100%', position: 'sticky', top: '100px' }}>
                <div style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '24px',
                  padding: '32px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.06)'
                }}>
                  <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#16203A', margin: '0 0 20px 0' }}>
                    Sponsorship Summary
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', borderBottom: '1px solid #E5E7EB', paddingBottom: '20px' }}>
                    {cart.map((item) => (
                      <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14.5px', color: '#4B5563' }}>
                        <span>{item.name} ({item.qty} packets)</span>
                        <strong style={{ color: '#111827' }}>₹{(item.price * item.qty).toLocaleString()}</strong>
                      </div>
                    ))}
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#6B7280', paddingTop: '10px' }}>
                      <span>Platform & Execution Fee</span>
                      <strong style={{ color: '#16A34A' }}>FREE (₹0)</strong>
                    </div>
                  </div>

                  {/* Grand Total Row */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: '#16203A' }}>Total Donation Amount</span>
                    <span style={{ fontSize: '32px', fontWeight: 800, color: '#0A90B5' }}>
                      ₹{cartTotal.toLocaleString()}
                    </span>
                  </div>

                  {/* Proceed to Pay Button */}
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckoutOpen(true);
                      setStep(1);
                      setModalError('');
                    }}
                    style={{
                      background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '18px 28px',
                      borderRadius: '50px',
                      fontSize: '18px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '12px',
                      width: '100%',
                      boxShadow: '0 6px 20px rgba(10, 144, 181, 0.25), 0 2px 8px rgba(217, 91, 40, 0.2)'
                    }}
                  >
                    <CreditCard size={22} />
                    Proceed to Pay (₹{cartTotal.toLocaleString()})
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: '#9CA3AF', fontSize: '13px', marginTop: '16px', fontWeight: 600 }}>
                    <Lock size={14} color="#16A34A" />
                    <span>256-Bit Secure NGO Payment Gateway</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>
      </section>

      {/* 3. STEP-BY-STEP CHECKOUT & PAYMENT MODAL */}
      <AnimatePresence>
        {isCheckoutOpen && (
          <div style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(11, 11, 14, 0.85)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            zIndex: 2000,
            overflowY: 'auto'
          }}>
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                maxWidth: '560px',
                width: '100%',
                maxHeight: '90vh',
                overflowY: 'auto',
                padding: '36px 32px',
                boxShadow: '0 24px 60px rgba(0,0,0,0.3)',
                position: 'relative'
              }}
            >
              {/* Close Modal Button */}
              <button
                type="button"
                onClick={closeCheckoutModal}
                style={{
                  position: 'absolute',
                  right: '24px',
                  top: '24px',
                  backgroundColor: '#F3F4F6',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  fontSize: '18px',
                  fontWeight: 800,
                  color: '#6B7280',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>

              {/* Modal Error Alert */}
              {modalError && (
                <div style={{
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  color: '#991B1B',
                  padding: '12px 16px',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontWeight: 600,
                  marginBottom: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <AlertCircle size={18} color="#991B1B" />
                  {modalError}
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 1: DONOR INFORMATION FORM */}
              {/* ==================================================== */}
              {step === 1 && (
                <div>
                  <div style={{ marginBottom: '20px' }}>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A90B5', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Step 1 of 2 • Donor Details
                    </span>
                    <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#16203A', margin: '4px 0 6px 0' }}>
                      Please fill out the donor information.
                    </h3>
                    <p style={{ fontSize: '13.5px', color: '#6B7280', margin: 0 }}>
                      This is used for video wishes and official donation receipts.
                    </p>
                  </div>

                  <form onSubmit={handleNextStep} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    
                    {/* FULL NAME * */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                        FULL NAME <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <User size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Ankit Singh"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '14.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* WHATSAPP NUMBER (10 DIGITS) * */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                        WHATSAPP NUMBER (10 DIGITS) <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Phone size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="tel"
                          required
                          maxLength={10}
                          placeholder="e.g. 8528220733"
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, ''))}
                          style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '14.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* EMAIL ADDRESS (OPTIONAL) */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                        EMAIL ADDRESS (OPTIONAL)
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Mail size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="email"
                          placeholder="name@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '14.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* PRINT NAME (ON WISH VIDEO) * */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                        PRINT NAME (ON WISH VIDEO) <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <FileText size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="text"
                          required
                          placeholder="e.g. Aarav's 5th Birthday"
                          value={printName}
                          onChange={(e) => setPrintName(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '14.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* WISHING / OCCASION DETAILS */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                        WISHING / OCCASION DETAILS
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. Wishing happy birthday to my son Aarav! May God bless him."
                        value={wishingDetails}
                        onChange={(e) => setWishingDetails(e.target.value)}
                        style={{ width: '100%', padding: '12px 14px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '14px', outline: 'none', resize: 'vertical' }}
                      />
                    </div>

                    {/* VIDEO / CELEBRATION DATE * */}
                    <div>
                      <label style={{ display: 'block', fontSize: '13px', fontWeight: 700, color: '#374151', marginBottom: '6px' }}>
                        VIDEO / CELEBRATION DATE <span style={{ color: '#EF4444' }}>*</span>
                      </label>
                      <div style={{ position: 'relative' }}>
                        <Calendar size={18} color="#9CA3AF" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                        <input
                          type="date"
                          required
                          value={videoDate}
                          onChange={(e) => setVideoDate(e.target.value)}
                          style={{ width: '100%', padding: '12px 14px 12px 42px', border: '1px solid #D1D5DB', borderRadius: '12px', fontSize: '14.5px', outline: 'none' }}
                        />
                      </div>
                    </div>

                    {/* WANT TO UPLOAD PHOTO? (Radio Toggle) */}
                    <div style={{ backgroundColor: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '14px', padding: '16px' }}>
                      <label style={{ display: 'block', fontSize: '13.5px', fontWeight: 700, color: '#111827', marginBottom: '10px' }}>
                        WANT TO UPLOAD PHOTO?
                      </label>
                      <div style={{ display: 'flex', gap: '20px', marginBottom: wantUploadPhoto === 'yes' ? '14px' : '0' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
                          <input
                            type="radio"
                            name="uploadPhotoToggle"
                            value="yes"
                            checked={wantUploadPhoto === 'yes'}
                            onChange={() => setWantUploadPhoto('yes')}
                            style={{ accentColor: '#0A90B5' }}
                          />
                          Yes, upload photo
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '14px', fontWeight: 700, color: '#374151' }}>
                          <input
                            type="radio"
                            name="uploadPhotoToggle"
                            value="no"
                            checked={wantUploadPhoto === 'no'}
                            onChange={() => {
                              setWantUploadPhoto('no');
                              setDonorPhotoUrl('');
                            }}
                            style={{ accentColor: '#0A90B5' }}
                          />
                          No
                        </label>
                      </div>

                      {/* Photo File Uploader if Yes */}
                      {wantUploadPhoto === 'yes' && (
                        <div>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleDonorPhotoUpload}
                            style={{ display: 'none' }}
                            id="donor-photo-input"
                          />
                          <label
                            htmlFor="donor-photo-input"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '8px',
                              backgroundColor: '#FFFFFF',
                              border: '1.5px dashed #0A90B5',
                              borderRadius: '12px',
                              padding: '14px',
                              cursor: 'pointer',
                              color: '#0A90B5',
                              fontWeight: 700,
                              fontSize: '14px'
                            }}
                          >
                            <Camera size={18} />
                            {uploadingPhoto ? 'Uploading to Cloudinary...' : donorPhotoUrl ? 'Photo Uploaded! Click to change' : 'Choose Photo File'}
                          </label>

                          {donorPhotoUrl && (
                            <div style={{ marginTop: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                              <img src={donorPhotoUrl} alt="Donor Photo" style={{ width: '40px', height: '40px', borderRadius: '8px', objectFit: 'cover' }} />
                              <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: 700 }}>✓ Uploaded to Cloudinary</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Total Donation Amount Display */}
                    <div style={{ backgroundColor: 'rgba(10, 144, 181, 0.08)', borderRadius: '14px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid rgba(10, 144, 181, 0.3)' }}>
                      <span style={{ fontSize: '15px', fontWeight: 800, color: '#16203A' }}>Total Donation Amount:</span>
                      <span style={{ fontSize: '24px', fontWeight: 800, color: '#0A90B5' }}>₹{cartTotal.toLocaleString()}</span>
                    </div>

                    {/* Next Button */}
                    <button
                      type="submit"
                      style={{
                        background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '50px',
                        padding: '16px',
                        fontSize: '16px',
                        fontWeight: 800,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        boxShadow: '0 6px 20px rgba(10, 144, 181, 0.25), 0 2px 8px rgba(217, 91, 40, 0.2)'
                      }}
                    >
                      Next: View Payment QR & Upload Receipt
                      <ArrowRight size={20} />
                    </button>

                  </form>
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 2: BANK DETAILS, QR CODE & PAYMENT RECEIPT */}
              {/* ==================================================== */}
              {step === 2 && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      style={{ backgroundColor: 'transparent', border: 'none', color: '#6B7280', fontSize: '13px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                    >
                      <ArrowLeft size={16} /> Back to Donor Details
                    </button>
                    <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A90B5', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      Step 2 of 2 • Payment Verification
                    </span>
                  </div>

                  <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, color: '#16203A', margin: '0 0 16px 0' }}>
                    Scan QR Code & Bank Transfer
                  </h3>

                  {/* QR Code Card */}
                  <div style={{ marginBottom: '20px' }}>
                    <PaymentQRCard amount={cartTotal} />
                  </div>

                  {/* Detailed Bank Information Table */}
                  <div style={{ backgroundColor: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '16px', padding: '16px', marginBottom: '20px', fontSize: '13.5px' }}>
                    <div style={{ fontWeight: 800, color: '#1E293B', marginBottom: '10px', textTransform: 'uppercase', letterSpacing: '0.8px', fontSize: '12px' }}>
                      Official Bank Account Details
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', color: '#334155' }}>
                      <div><strong>Bank Name:</strong> UCO Bank</div>
                      <div><strong>Account Name:</strong> HELPGLOW FOUNDATION</div>
                      <div><strong>Account No:</strong> <span style={{ userSelect: 'all', fontWeight: 700 }}>22040210005699</span></div>
                      <div><strong>IFSC Code:</strong> <span style={{ userSelect: 'all', fontWeight: 700 }}>UCBA0002204</span></div>
                      <div style={{ gridColumn: 'span 2' }}><strong>UPI ID:</strong> <span style={{ userSelect: 'all', fontWeight: 700, color: '#00529C' }}>8528220733@ucobank</span></div>
                    </div>
                  </div>

                  {/* Upload Payment Receipt Section */}
                  <div style={{ backgroundColor: '#FFF7ED', border: '1.5px solid #FDBA74', borderRadius: '16px', padding: '18px', marginBottom: '24px' }}>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: 800, color: '#9A3412', marginBottom: '6px' }}>
                      UPLOAD PAYMENT RECEIPT SCREENSHOT <span style={{ color: '#EF4444' }}>*</span>
                    </label>
                    <p style={{ fontSize: '12.5px', color: '#C2410C', margin: '0 0 12px 0' }}>
                      Please attach your UPI / bank payment screenshot to make the submit button actionable.
                    </p>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleReceiptUpload}
                      style={{ display: 'none' }}
                      id="receipt-screenshot-input"
                    />
                    
                    <label
                      htmlFor="receipt-screenshot-input"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '10px',
                        backgroundColor: '#FFFFFF',
                        border: '2px dashed #EA580C',
                        borderRadius: '12px',
                        padding: '16px',
                        cursor: 'pointer',
                        color: '#EA580C',
                        fontWeight: 800,
                        fontSize: '15px'
                      }}
                    >
                      <Upload size={20} />
                      {uploadingReceipt ? 'Uploading Receipt to Cloudinary...' : paymentScreenshotUrl ? 'Receipt Uploaded! Click to Replace' : 'Upload Payment Receipt Screenshot (*)'}
                    </label>

                    {paymentScreenshotUrl && (
                      <div style={{ marginTop: '12px', display: 'flex', alignItems: 'center', gap: '12px', backgroundColor: '#FFFFFF', padding: '10px 14px', borderRadius: '10px', border: '1px solid #86EFAC' }}>
                        <img src={paymentScreenshotUrl} alt="Receipt Screenshot" style={{ width: '45px', height: '45px', borderRadius: '8px', objectFit: 'cover' }} />
                        <div>
                          <div style={{ fontSize: '13px', color: '#15803D', fontWeight: 800 }}>✓ Receipt Screenshot Uploaded</div>
                          <a href={paymentScreenshotUrl} target="_blank" rel="noreferrer" style={{ fontSize: '11px', color: '#2563EB', textDecoration: 'underline' }}>View uploaded image</a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Submit Button (Only actionable when payment screenshot is uploaded) */}
                  <button
                    type="button"
                    disabled={!paymentScreenshotUrl || submittingDonation || uploadingReceipt}
                    onClick={handleSubmitDonation}
                    style={{
                      backgroundColor: paymentScreenshotUrl ? '#16A34A' : '#9CA3AF',
                      color: '#FFFFFF',
                      border: 'none',
                      borderRadius: '14px',
                      padding: '18px',
                      fontSize: '17px',
                      fontWeight: 800,
                      cursor: paymentScreenshotUrl ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px',
                      width: '100%',
                      boxShadow: paymentScreenshotUrl ? '0 8px 24px rgba(22, 163, 74, 0.4)' : 'none',
                      transition: 'all 0.25s ease'
                    }}
                  >
                    {submittingDonation ? 'Submitting & Opening WhatsApp...' : paymentScreenshotUrl ? `Submit Sponsorship (₹${cartTotal.toLocaleString()}) & Send to WhatsApp` : 'Upload Receipt Screenshot to Enable Submit'}
                    <ArrowRight size={20} />
                  </button>
                </div>
              )}

              {/* ==================================================== */}
              {/* STEP 3: CONFIRMATION & SUCCESS VIEW */}
              {/* ==================================================== */}
              {step === 3 && (
                <div style={{ textAlign: 'center', padding: '20px 0' }}>
                  <div style={{ backgroundColor: 'rgba(22, 163, 74, 0.12)', padding: '24px', borderRadius: '50%', display: 'inline-flex', marginBottom: '20px' }}>
                    <CheckCircle2 size={56} color="#16A34A" />
                  </div>
                  <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#16203A', margin: '0 0 12px 0' }}>
                    Sponsorship Submitted!
                  </h3>
                  <p style={{ fontSize: '15.5px', color: '#4B5563', lineHeight: 1.6, marginBottom: '24px' }}>
                    Your donation record has been securely saved in our database and sent to the HelpGlow Admin WhatsApp (<strong style={{ color: '#16A34A' }}>+91 8528220733</strong>).
                  </p>
                  <button
                    type="button"
                    onClick={closeCheckoutModal}
                    style={{
                      backgroundColor: '#0A90B5',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '14px 32px',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer'
                    }}
                  >
                    Done & Return to Menu
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Cart;
