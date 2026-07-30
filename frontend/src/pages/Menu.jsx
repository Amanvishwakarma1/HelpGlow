import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Sparkles, ShoppingBag, Check, Users, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { products, getMinQty, isSingleEntity } from '../config/product';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Menu = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedTiers, setSelectedTiers] = useState({});
  const [toastMessage, setToastMessage] = useState('');
  
  // Special Combo Modal State
  const [specialComboModalProduct, setSpecialComboModalProduct] = useState(null);
  const [selectedModalTier, setSelectedModalTier] = useState(null);

  const { addToCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const categories = ['All Products', 'Single Product', 'Combo Product'];

  const filteredProducts = selectedCategory === 'All Products'
    ? products
    : products.filter(p => p.category === selectedCategory);

  const handleSelectTier = (productId, tier) => {
    setSelectedTiers(prev => ({
      ...prev,
      [productId]: tier
    }));
  };

  const getProductUnit = (product, activeTier) => {
    if (product.isSpecialCombo) return 'combo';
    if (activeTier) return `${activeTier.children} kids`;
    if (product.unit) return product.unit;
    if (isSingleEntity(product)) return 'party';
    if (product.name.toLowerCase().includes('kit')) return 'kit';
    if (product.name.toLowerCase().includes('cake')) return 'cake';
    return 'packet';
  };

  const handleAddProduct = (product) => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/menu&message=Please sign in to sponsor packages and add to cart!');
      return;
    }

    const currentTier = product.tiers ? (selectedTiers[product.id] || product.tiers[0]) : null;
    const finalProduct = currentTier ? {
      ...product,
      price: currentTier.price,
      name: `${product.name} (${currentTier.children} Children)`,
      unit: `${currentTier.children} children`
    } : product;

    addToCart(finalProduct);
    setToastMessage(`Added ${finalProduct.name} to your sponsorship cart!`);
    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  const handleAddSpecialComboFromModal = () => {
    if (!isLoggedIn) {
      navigate('/login?redirect=/menu&message=Please sign in to sponsor packages and add to cart!');
      return;
    }
    if (!specialComboModalProduct || !selectedModalTier) return;

    const finalProduct = {
      ...specialComboModalProduct,
      price: selectedModalTier.price,
      name: `${specialComboModalProduct.name} (${selectedModalTier.children} Children)`,
      unit: `${selectedModalTier.children} children`,
      selectedChildren: selectedModalTier.children
    };

    addToCart(finalProduct);
    setToastMessage(`Added ${finalProduct.name} (₹${selectedModalTier.price.toLocaleString()}) to your sponsorship cart!`);
    setSpecialComboModalProduct(null);
    setSelectedModalTier(null);

    setTimeout(() => {
      setToastMessage('');
    }, 3500);
  };

  // --- Card Motion Variants ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const dealCardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111827', backgroundColor: '#FFFFFF', overflowX: 'hidden' }}>
      
      {/* 1. Hero Header Unit */}
      <section style={{ 
        position: 'relative', 
        backgroundColor: '#16203A', 
        color: '#FFFFFF', 
        padding: '140px 24px 80px 24px',
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
        <motion.div 
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '-15%',
            right: '15%',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(230, 30, 110, 0.22) 0%, transparent 70%)',
            filter: 'blur(70px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '1050px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{ marginBottom: '20px' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, rgba(10, 144, 181, 0.15), rgba(10, 144, 181, 0.05))', 
                color: '#0A90B5', 
                border: '1px solid rgba(10, 144, 181, 0.4)',
                padding: '9px 24px', 
                borderRadius: '50px', 
                fontSize: '13px', 
                fontWeight: 800, 
                letterSpacing: '1.8px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.4)'
              }}>
                <Sparkles size={16} color="#0A90B5" />
                SPONSORSHIP PACKAGES & MENU
              </span>
            </div>

            <h1 
              style={{ 
                fontFamily: "'Clash Display', 'Outfit', sans-serif", 
                fontSize: 'clamp(40px, 5.5vw, 62px)', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #FFFFFF 40%, #FCDCB5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 24px 0',
                lineHeight: 1.15
              }}
            >
              Share Joy Through Direct Sponsorship
            </h1>

            <div style={{ width: '80px', height: '5px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', margin: '0 auto 28px auto', borderRadius: '3px' }}></div>

            <p 
              style={{ 
                fontSize: '22px', 
                lineHeight: '1.8', 
                color: 'rgba(255, 255, 255, 0.9)', 
                maxWidth: '880px',
                margin: '0 auto',
                fontWeight: 400
              }}
            >
              Celebrate birthdays, anniversaries, and milestones by sponsoring food packets, education kits, or grand party celebration packages for underprivileged children across Varanasi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Category Navigation Tabs */}
      <section style={{ padding: '40px 24px 20px 24px', backgroundColor: '#F8F9FA', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <div 
            className="category-tabs-container"
            style={{ 
              display: 'flex', 
              gap: '12px', 
              backgroundColor: '#FFFFFF', 
              padding: '8px', 
              borderRadius: '50px', 
              border: '1px solid #E5E7EB',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
              flexWrap: 'wrap',
              justifyContent: 'center',
              maxWidth: '100%'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  position: 'relative',
                  background: selectedCategory === cat ? 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)' : 'transparent',
                  color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                  border: 'none',
                  padding: '12px 28px',
                  borderRadius: '50px',
                  fontSize: '15px',
                  fontWeight: 800,
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: selectedCategory === cat ? '0 6px 18px rgba(10, 144, 181, 0.35)' : 'none'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Products Catalog Grid */}
      <section style={{ padding: '80px 24px 100px 24px', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '1400px', width: '95%', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(310px, 1fr))',
                gap: '30px',
                width: '100%'
              }}
            >
              {filteredProducts.map((product, index) => {
                const minQty = getMinQty(product.price);
                const isSingle = isSingleEntity(product);

                const currentTier = product.tiers ? (selectedTiers[product.id] || product.tiers[0]) : null;
                const currentPrice = currentTier ? currentTier.price : product.price;
                const unitText = getProductUnit(product, currentTier);
                const isSpecialCombo = product.isSpecialCombo;

                return (
                  <motion.div
                    key={product.id}
                    custom={index}
                    variants={dealCardVariants}
                    whileHover={{ y: -10, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    onClick={() => {
                      if (isSpecialCombo) {
                        setSpecialComboModalProduct(product);
                        setSelectedModalTier(product.tiers[0]);
                      }
                    }}
                    style={{
                      backgroundColor: '#FFFFFF',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
                      display: 'flex',
                      flexDirection: 'column',
                      position: 'relative',
                      cursor: isSpecialCombo ? 'pointer' : 'default'
                    }}
                  >
                    {/* Image Header with Responsive Non-overlapping Pill Tags */}
                    <div style={{ width: '100%', height: '230px', overflow: 'hidden', position: 'relative', backgroundColor: '#10182E' }}>
                      <motion.img
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        src={product.img}
                        alt={product.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          objectPosition: 'center',
                          display: 'block'
                        }}
                      />

                      {/* Flex Container for Top Pill Tags (Prevents Overlap) */}
                      <div style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        right: '12px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '6px',
                        zIndex: 3
                      }}>
                        {/* Category Pill Tag */}
                        <div style={{
                          backgroundColor: 'rgba(11, 11, 14, 0.85)',
                          backdropFilter: 'blur(10px)',
                          color: '#0A90B5',
                          padding: '5px 12px',
                          borderRadius: '50px',
                          fontSize: '11px',
                          fontWeight: 800,
                          letterSpacing: '1px',
                          border: '1px solid rgba(10, 144, 181, 0.3)',
                          textTransform: 'uppercase',
                          whiteSpace: 'nowrap',
                          flexShrink: 0
                        }}>
                          {product.icon} {product.category}
                        </div>

                        {/* Price / Unit Tag */}
                        <div style={{
                          backgroundColor: 'rgba(30, 18, 59, 0.92)',
                          backdropFilter: 'blur(10px)',
                          color: '#FFFFFF',
                          padding: '5px 12px',
                          borderRadius: '50px',
                          fontSize: '12px',
                          fontWeight: 800,
                          border: '1px solid rgba(10, 144, 181, 0.5)',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          maxWidth: '58%'
                        }}>
                          {isSpecialCombo ? 'From ₹850 / combo' : `₹${currentPrice.toLocaleString()} / ${unitText}`}
                        </div>
                      </div>
                    </div>

                    {/* Product Details Content */}
                    <div style={{ padding: '28px', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                          <span style={{ fontSize: '26px' }}>{product.icon}</span>
                          <h3 style={{
                            fontFamily: "'Clash Display', 'Outfit', sans-serif",
                            fontSize: '23px',
                            fontWeight: 800,
                            color: '#16203A',
                            margin: 0,
                            lineHeight: 1.2
                          }}>
                            {product.name}
                          </h3>
                        </div>

                        <p style={{
                          fontSize: '15px',
                          lineHeight: '1.65',
                          color: '#4B5563',
                          margin: '0 0 16px 0'
                        }}>
                          {product.desc}
                        </p>

                        {/* Minimum Quantity / Package Info */}
                        {isSpecialCombo ? (
                          <div style={{ 
                            marginBottom: '24px', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            backgroundColor: 'rgba(10, 144, 181, 0.1)', 
                            color: '#0A90B5',
                            padding: '6px 14px', 
                            borderRadius: '8px',
                            fontSize: '12.5px',
                            fontWeight: 700
                          }}>
                            <Check size={14} color="#0A90B5" />
                            Choose 10 to 100 Kids (Food + Cake)
                          </div>
                        ) : product.tiers ? (
                          <div style={{ margin: '12px 0 18px 0', backgroundColor: '#F8FAFC', padding: '14px', borderRadius: '16px', border: '1px solid #E2E8F0' }}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                              <span style={{ fontSize: '11.5px', fontWeight: 800, color: '#0A90B5', textTransform: 'uppercase', letterSpacing: '0.8px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                                <Users size={14} color="#0A90B5" />
                                CHOOSE NUMBER OF KIDS:
                              </span>
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                              {product.tiers.map((t) => {
                                const isSelected = (selectedTiers[product.id]?.children || product.tiers[0].children) === t.children;
                                return (
                                  <button
                                    key={t.children}
                                    type="button"
                                    onClick={() => handleSelectTier(product.id, t)}
                                    style={{
                                      background: isSelected ? 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)' : '#FFFFFF',
                                      color: isSelected ? '#FFFFFF' : '#334155',
                                      border: isSelected ? 'none' : '1px solid #CBD5E1',
                                      borderRadius: '50px',
                                      padding: '8px 10px',
                                      fontSize: '12px',
                                      fontWeight: 800,
                                      cursor: 'pointer',
                                      display: 'flex',
                                      alignItems: 'center',
                                      justifyContent: 'center',
                                      gap: '4px',
                                      boxShadow: isSelected ? '0 4px 12px rgba(10, 144, 181, 0.25)' : 'none',
                                      transition: 'all 0.2s ease'
                                    }}
                                  >
                                    👦 {t.children} Kids — ₹{t.price.toLocaleString()}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : (
                          /* Minimum Quantity / Package Info */
                          <div style={{ 
                            marginBottom: '24px', 
                            display: 'inline-flex', 
                            alignItems: 'center', 
                            gap: '6px',
                            backgroundColor: 'rgba(10, 144, 181, 0.1)', 
                            color: '#0A90B5',
                            padding: '6px 14px', 
                            borderRadius: '8px',
                            fontSize: '12.5px',
                            fontWeight: 700
                          }}>
                            <Check size={14} color="#0A90B5" />
                            {isSingle ? 'Grand Party Package' : `Min Required: ${minQty} Packets (Total ₹${(minQty * product.price).toLocaleString()})`}
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {isSpecialCombo ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSpecialComboModalProduct(product);
                            setSelectedModalTier(product.tiers[0]);
                          }}
                          style={{
                            background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '16px 28px',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            width: '100%',
                            boxShadow: '0 6px 20px rgba(10, 144, 181, 0.25), 0 2px 8px rgba(217, 91, 40, 0.2)',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          <ShoppingBag size={20} />
                          Add to Cart (Choose Kids)
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleAddProduct(product)}
                          style={{
                            background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '16px 28px',
                            borderRadius: '50px',
                            fontSize: '16px',
                            fontWeight: 800,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '10px',
                            width: '100%',
                            boxShadow: '0 6px 20px rgba(10, 144, 181, 0.25), 0 2px 8px rgba(217, 91, 40, 0.2)',
                            transition: 'all 0.25s ease'
                          }}
                        >
                          <ShoppingBag size={20} />
                          Add to Cart ({currentTier ? `${currentTier.children} Kids — ₹${currentPrice.toLocaleString()}` : `₹${currentPrice.toLocaleString()}`})
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* 4. Special Combo Children Selector Modal Overlay */}
      <AnimatePresence>
        {specialComboModalProduct && (
          <div style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            backgroundColor: 'rgba(15, 23, 42, 0.75)',
            backdropFilter: 'blur(8px)'
          }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '28px',
                width: '100%',
                maxWidth: '560px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                border: '1px solid #E2E8F0'
              }}
            >
              {/* Modal Top Header */}
              <div style={{
                backgroundColor: '#16203A',
                color: '#FFFFFF',
                padding: '24px 28px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '32px' }}>{specialComboModalProduct.icon}</span>
                  <div>
                    <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '22px', fontWeight: 800, margin: 0 }}>
                      {specialComboModalProduct.name}
                    </h3>
                    <span style={{ fontSize: '13px', color: 'rgba(255,255,255,0.7)', fontWeight: 600 }}>
                      Choose children count for celebration
                    </span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setSpecialComboModalProduct(null)}
                  style={{
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '36px',
                    height: '36px',
                    color: '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Content Body */}
              <div style={{ padding: '28px' }}>
                {/* Description & Pricing Formula Card */}
                <div style={{
                  backgroundColor: '#F8FAFC',
                  borderRadius: '16px',
                  padding: '16px',
                  border: '1px solid #E2E8F0',
                  marginBottom: '24px'
                }}>
                  <span style={{ fontSize: '12px', fontWeight: 800, color: '#0A90B5', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Package Description & Pricing Logic
                  </span>
                  <p style={{ margin: '6px 0 0 0', fontSize: '15px', color: '#334155', fontWeight: 700 }}>
                    {specialComboModalProduct.desc}
                  </p>
                </div>

                {/* Option Selector Title */}
                <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Users size={18} color="#E61C72" />
                  <span style={{ fontSize: '14px', fontWeight: 800, color: '#0F172A', textTransform: 'uppercase', letterSpacing: '0.8px' }}>
                    Select Number of Children:
                  </span>
                </div>

                {/* Children Tiers Option Cards List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '28px' }}>
                  {specialComboModalProduct.tiers.map((t) => {
                    const isSelected = selectedModalTier?.children === t.children;
                    return (
                      <div
                        key={t.children}
                        onClick={() => setSelectedModalTier(t)}
                        style={{
                          backgroundColor: isSelected ? 'rgba(230, 28, 114, 0.04)' : '#FFFFFF',
                          border: isSelected ? '2px solid #E61C72' : '1px solid #E2E8F0',
                          borderRadius: '16px',
                          padding: '14px 20px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s ease',
                          boxShadow: isSelected ? '0 4px 14px rgba(230, 28, 114, 0.15)' : 'none'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            border: isSelected ? '6px solid #E61C72' : '2px solid #94A3B8',
                            backgroundColor: '#FFFFFF',
                            transition: 'all 0.2s ease'
                          }} />
                          <span style={{ fontSize: '16px', fontWeight: isSelected ? 800 : 700, color: isSelected ? '#1E1B4B' : '#334155' }}>
                            For {t.children} Kids <span style={{ fontSize: '13px', color: '#64748B', fontWeight: 500 }}>(Food + Cake)</span>
                          </span>
                        </div>
                        <span style={{ fontSize: '18px', fontWeight: 800, color: isSelected ? '#E61C72' : '#0A90B5' }}>
                          ₹{t.price.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Modal Action Buttons */}
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => setSpecialComboModalProduct(null)}
                    style={{
                      flex: 1,
                      backgroundColor: '#F1F5F9',
                      color: '#475569',
                      border: 'none',
                      padding: '14px',
                      borderRadius: '50px',
                      fontSize: '15px',
                      fontWeight: 700,
                      cursor: 'pointer'
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddSpecialComboFromModal}
                    style={{
                      flex: 2,
                      background: 'linear-gradient(90deg, #E61C72 0%, #D95B28 100%)',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '14px 24px',
                      borderRadius: '50px',
                      fontSize: '16px',
                      fontWeight: 800,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      boxShadow: '0 6px 20px rgba(230, 28, 114, 0.3)'
                    }}
                  >
                    <ShoppingBag size={18} />
                    Add to Cart ({selectedModalTier ? `₹${selectedModalTier.price.toLocaleString()}` : ''})
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Animated Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            style={{
              position: 'fixed',
              bottom: '30px',
              right: '30px',
              backgroundColor: '#10182E',
              color: '#FFFFFF',
              padding: '16px 24px',
              borderRadius: '16px',
              boxShadow: '0 12px 36px rgba(0,0,0,0.3)',
              border: '1px solid rgba(10, 144, 181, 0.5)',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              zIndex: 1000
            }}
          >
            <div style={{ backgroundColor: '#0A90B5', padding: '8px', borderRadius: '50%' }}>
              <Check size={18} color="#FFFFFF" />
            </div>
            <span style={{ fontSize: '15px', fontWeight: 700 }}>{toastMessage}</span>
            <Link
              to="/cart"
              style={{
                backgroundColor: 'rgba(10, 144, 181, 0.2)',
                color: '#0A90B5',
                padding: '6px 14px',
                borderRadius: '8px',
                fontSize: '13px',
                fontWeight: 800,
                textDecoration: 'none',
                marginLeft: '8px'
              }}
            >
              View Cart →
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Menu;
