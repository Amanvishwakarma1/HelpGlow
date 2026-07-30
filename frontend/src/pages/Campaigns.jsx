import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, ArrowRight, Sparkles, Quote, ShieldCheck } from 'lucide-react';
import { causesData } from '../config/causes';
import { Link } from 'react-router-dom';

const Campaigns = () => {
  const [selectedCategory, setSelectedCategory] = useState('All Causes');

  const categories = ['All Causes', 'Education', 'Hunger Relief', 'Celebrations', 'Animal Care', 'Winter Relief', 'Healthcare'];

  const filteredCauses = selectedCategory === 'All Causes'
    ? causesData
    : causesData.filter(c => c.category === selectedCategory);

  const smoothCurve = [0.22, 1, 0.36, 1];

  // Dual Motion Variants merging into a single master card
  const slideFromLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1.0, ease: smoothCurve } 
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 1.0, ease: smoothCurve } 
    }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111827', backgroundColor: '#FFFFFF', overflowX: 'hidden' }}>
      
      {/* 1. Hero Header Unit (Classic Aesthetic Black #16203A Theme) */}
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
                ACTIVE CAUSES & RELIEF CAMPAIGNS
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
              Our Mission Pillars & Campaigns
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
              Discover our active welfare projects spanning education, daily hunger relief, milestone celebration drives, stray animal care, and winter blanket distribution.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Category Navigation Tabs */}
      <section style={{ padding: '40px 24px 20px 24px', backgroundColor: '#F8F9FA', borderBottom: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1400px', width: '95%', margin: '0 auto', display: 'flex', justifyContent: 'center' }}>
          <div style={{ 
            display: 'flex', 
            gap: '10px', 
            backgroundColor: '#FFFFFF', 
            padding: '8px', 
            borderRadius: '50px', 
            border: '1px solid #E5E7EB',
            boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            flexWrap: 'wrap',
            justifyContent: 'center'
          }}>
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                style={{
                  position: 'relative',
                  backgroundColor: selectedCategory === cat ? '#0A90B5' : 'transparent',
                  color: selectedCategory === cat ? '#FFFFFF' : '#4B5563',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '50px',
                  fontSize: '14.5px',
                  fontWeight: 800,
                  cursor: 'pointer',
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

      {/* 3. Interconnected Master Cards (Equal Height Half-Card + Half-Emotional Message) */}
      <section style={{ padding: '70px 24px 100px 24px', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '1360px', width: '95%', margin: '0 auto' }}>
          <AnimatePresence mode="wait">
            <div key={selectedCategory} style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
              {filteredCauses.map((cause, index) => {
                const percent = Math.round((cause.raised / cause.target) * 100);

                return (
                  <motion.div
                    key={cause.id}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                    className="causes-master-card"
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      width: '100%',
                      backgroundColor: '#FFFFFF',
                      borderRadius: '24px',
                      overflow: 'hidden',
                      border: '1px solid #E5E7EB',
                      boxShadow: '0 12px 36px rgba(0,0,0,0.06)',
                      alignItems: 'stretch'
                    }}
                  >
                    {/* Left Half: Cause Details & Action */}
                    <motion.div
                      variants={slideFromLeft}
                      style={{
                        flex: '1 1 50%',
                        minWidth: '320px',
                        padding: '36px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                        backgroundColor: '#FFFFFF'
                      }}
                    >
                      <div>
                        {/* Image Header with Fixed Height & Cover Fit */}
                        <div style={{ width: '100%', height: '210px', overflow: 'hidden', borderRadius: '16px', position: 'relative', marginBottom: '24px', backgroundColor: '#10182E' }}>
                          <img
                            src={cause.img}
                            alt={cause.title}
                            style={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'cover',
                              objectPosition: 'center',
                              display: 'block'
                            }}
                          />

                          {/* Category Badge */}
                          <div style={{
                            position: 'absolute',
                            top: '14px',
                            left: '14px',
                            backgroundColor: 'rgba(11, 11, 14, 0.88)',
                            backdropFilter: 'blur(10px)',
                            color: '#0A90B5',
                            padding: '5px 14px',
                            borderRadius: '50px',
                            fontSize: '11px',
                            fontWeight: 800,
                            letterSpacing: '1px',
                            border: '1px solid rgba(10, 144, 181, 0.35)',
                            textTransform: 'uppercase'
                          }}>
                            {cause.icon} {cause.label}
                          </div>

                          {/* Funded Pill Tag */}
                          <div style={{
                            position: 'absolute',
                            top: '14px',
                            right: '14px',
                            backgroundColor: 'rgba(30, 18, 59, 0.88)',
                            backdropFilter: 'blur(10px)',
                            color: '#FFFFFF',
                            padding: '5px 14px',
                            borderRadius: '50px',
                            fontSize: '12px',
                            fontWeight: 800,
                            border: '1px solid rgba(10, 144, 181, 0.4)'
                          }}>
                            {percent}% FUNDED
                          </div>
                        </div>

                        <h3 style={{
                          fontFamily: "'Clash Display', 'Outfit', sans-serif",
                          fontSize: '23px',
                          fontWeight: 800,
                          color: '#16203A',
                          margin: '0 0 10px 0',
                          lineHeight: 1.25
                        }}>
                          {cause.title}
                        </h3>

                        <p style={{
                          fontSize: '15px',
                          lineHeight: '1.65',
                          color: '#4B5563',
                          margin: '0 0 20px 0'
                        }}>
                          {cause.description}
                        </p>

                        {/* Decreased Slim Completion Bar */}
                        <div style={{ marginBottom: '24px' }}>
                          <div style={{ width: '100%', height: '5px', backgroundColor: '#F3F4F6', borderRadius: '50px', overflow: 'hidden', marginBottom: '8px' }}>
                            <div style={{ width: `${percent}%`, height: '100%', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', borderRadius: '50px' }}></div>
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12.5px', fontWeight: 800, color: '#6B7280' }}>
                            <span>₹{cause.raised.toLocaleString()} RAISED OF ₹{cause.target.toLocaleString()}</span>
                            <span style={{ color: '#0A90B5' }}>{percent}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Action Button Redirecting to /menu */}
                      <Link
                        to="/menu"
                        style={{
                          background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                          color: '#FFFFFF',
                          textDecoration: 'none',
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
                        <Heart size={18} fill="#FFFFFF" />
                        Sponsor Cause Now
                        <ArrowRight size={18} />
                      </Link>
                    </motion.div>

                    {/* Right Half: Interconnected Emotional Message (Matching Height & Dark Theme) */}
                    <motion.div
                      variants={slideFromRight}
                      style={{
                        flex: '1 1 50%',
                        minWidth: '320px',
                        padding: '44px 40px',
                        backgroundColor: '#10182E',
                        color: '#FFFFFF',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        position: 'relative',
                        borderLeft: '1px solid rgba(10, 144, 181, 0.2)'
                      }}
                    >
                      <div style={{ position: 'absolute', top: '28px', right: '32px', opacity: 0.15 }}>
                        <Quote size={60} color="#0A90B5" />
                      </div>

                      <div style={{ marginBottom: '20px' }}>
                        <span style={{
                          backgroundColor: 'rgba(10, 144, 181, 0.15)',
                          color: '#0A90B5',
                          border: '1px solid rgba(10, 144, 181, 0.4)',
                          padding: '7px 20px',
                          borderRadius: '50px',
                          fontSize: '12px',
                          fontWeight: 800,
                          letterSpacing: '1.2px',
                          textTransform: 'uppercase',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}>
                          <Sparkles size={14} color="#0A90B5" />
                          WHY YOUR SUPPORT MATTERS
                        </span>
                      </div>

                      <p style={{
                        color: 'rgba(255, 255, 255, 0.95)',
                        fontSize: '20px',
                        lineHeight: '1.85',
                        fontStyle: 'italic',
                        margin: '0 0 28px 0',
                        fontWeight: 400
                      }}>
                        "{cause.emotionalMsg}"
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#FCDCB5', fontSize: '14px', fontWeight: 700, paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                        <ShieldCheck size={20} color="#0A90B5" />
                        <span>100% Direct Transparent Execution • Live WhatsApp Photo & Video Updates</span>
                      </div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        </div>
      </section>

    </div>
  );
};

export default Campaigns;
