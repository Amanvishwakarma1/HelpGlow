import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  HandHeart, Megaphone, Heart, Users, Puzzle, Flame, 
  BarChart3, Users2, ShieldCheck, FileCheck, Globe, MapPin, Download, Check, Copy, Sparkles
} from 'lucide-react';
import TeamSlider from '../components/TeamSlider';

const About = () => {
  const [copiedField, setCopiedField] = useState("");
  const [activePillar, setActivePillar] = useState(0);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(""), 2500);
  };

  // --- Smooth Motion Variants with Increased Time Delay & Fluid Easing ---
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.24,
        delayChildren: 0.2
      }
    }
  };

  const smoothCurve = [0.22, 1, 0.36, 1];

  const slideFromLeft = {
    hidden: { opacity: 0, x: -120, scale: 0.94 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 1.15, ease: smoothCurve } 
    }
  };

  const slideFromRight = {
    hidden: { opacity: 0, x: 120, scale: 0.94 },
    visible: { 
      opacity: 1, 
      x: 0, 
      scale: 1,
      transition: { duration: 1.15, ease: smoothCurve } 
    }
  };

  const slideFromBottom = {
    hidden: { opacity: 0, y: 90, scale: 0.93 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 1.15, ease: smoothCurve } 
    }
  };

  const scaleUpCenter = {
    hidden: { opacity: 0, scale: 0.88, y: 40 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 1.15, ease: smoothCurve }
    }
  };

  const stats = [
    { icon: <HandHeart size={36} color="#0A90B5" />, value: "100 lakh+", label: "WORTH DONATIONS", detail: "Distributed in total relief aid" },
    { icon: <Megaphone size={36} color="#0A90B5" />, value: "100+", label: "SUCCESSFUL CAMPAIGNS", detail: "Completed across Uttar Pradesh" },
    { icon: <Heart size={36} color="#0A90B5" />, value: "100 lakh+", label: "LIVES IMPACTED", detail: "Direct beneficiaries supported" },
    { icon: <Users size={36} color="#0A90B5" />, value: "1 lakh+", label: "UNIQUE DONORS", detail: "Active supporters nationwide" },
  ];

  const values = [
    {
      icon: <Puzzle size={40} color="#0A90B5" />,
      title: "Integrity in everything we do",
      text: "We strive never to take the easy path, but always the honest one. We practice 100% transparency in all actions and funding."
    },
    {
      icon: <Flame size={40} color="#0A90B5" />,
      title: "Serve with passion",
      text: "We are fiercely committed to poverty alleviation with a burning desire to deliver hope to every doorstep."
    },
    {
      icon: <BarChart3 size={40} color="#0A90B5" />,
      title: "Focused on scale",
      text: "We stay laser-focused on sustainable, large-scale impact to bring measurable change to entire communities."
    },
    {
      icon: <Users2 size={40} color="#0A90B5" />,
      title: "Empathy for all",
      text: "We are committed to working together with unconditional respect, freedom, trust, and human compassion."
    }
  ];

  const pillars = [
    {
      title: "Education Welfare",
      desc: "Providing kits, coaching, digital literacy, and scholarship support so underprivileged children never abandon their dreams."
    },
    {
      title: "Human Welfare",
      desc: "Providing hot nutritious food, daily wage relief, medical assistance, and emergency response across Varanasi."
    },
    {
      title: "Animal Welfare",
      desc: "Feeding stray animals, organizing rescue drives, providing emergency medical care, and promoting gentle coexistence."
    }
  ];

  const legalItems = [
    { icon: <ShieldCheck size={26} color="#0A90B5" />, label: "CIN Number", val: "U88100UP2025NPL229317" },
    { icon: <Globe size={26} color="#0A90B5" />, label: "NGO Darpan ID", val: "UP/2022/0314589" },
    { icon: <FileCheck size={26} color="#0A90B5" />, label: "PAN Card", val: "AAICH0991A" },
    { icon: <MapPin size={26} color="#0A90B5" />, label: "Registered Address", val: "Kundaria Benipur, Varanasi 221307" },
  ];

  const sectionContainerStyle = {
    maxWidth: '1400px',
    width: '95%',
    margin: '0 auto',
    padding: '0 20px'
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111827', backgroundColor: '#FFFFFF', overflowX: 'hidden' }}>
      
      {/* 1. Hero Section with Classic Aesthetic Black Background (#16203A) & Warm Glow Orbs */}
      <section style={{ 
        position: 'relative', 
        backgroundColor: '#16203A', 
        color: '#FFFFFF', 
        padding: '140px 24px 90px 24px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        {/* Animated Glow Orbs in Warm Orange & Pink */}
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
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={slideFromBottom} style={{ marginBottom: '20px' }}>
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
                ABOUT HELPGLOW FOUNDATION
              </span>
            </motion.div>

            <motion.h1 
              variants={slideFromBottom}
              style={{ 
                fontFamily: "'Clash Display', 'Outfit', sans-serif", 
                fontSize: 'clamp(42px, 5.8vw, 64px)', 
                fontWeight: 800, 
                background: 'linear-gradient(135deg, #FFFFFF 40%, #FCDCB5 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 24px 0',
                lineHeight: 1.15
              }}
            >
              Restoring Hope & Dignity Through Transparent Action
            </motion.h1>

            <motion.div variants={slideFromBottom} style={{ width: '80px', height: '5px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', margin: '0 auto 28px auto', borderRadius: '3px' }}></motion.div>

            <motion.p 
              variants={slideFromBottom}
              style={{ 
                fontSize: '22px', 
                lineHeight: '1.8', 
                color: 'rgba(255, 255, 255, 0.9)', 
                maxWidth: '900px',
                margin: '0 auto',
                fontWeight: 400
              }}
            >
              HelpGlow Foundation is a non-profit built on the belief that giving should be personal, 
              transparent, and deeply meaningful. We deliver hope, dignity, and human connection through 
              impactful campaigns across India.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* 2. Our Impact Metrics */}
      <section style={{ padding: '90px 24px', backgroundColor: '#F8F9FA', borderBottom: '1px solid #E5E7EB' }}>
        <div style={sectionContainerStyle}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideFromBottom}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '42px', fontWeight: 800, color: '#16203A', margin: '0 0 12px 0' }}>
              Our Impact
            </h2>
            <div style={{ width: '70px', height: '4px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', margin: '0 auto 16px auto', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '20px', color: '#4B5563', margin: 0, fontWeight: 500 }}>
              Through sustainable projects and community support, we bring real change to people who need it most.
            </p>
          </motion.div>

          <motion.div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
              gap: '28px',
              width: '100%'
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={slideFromBottom}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderRadius: '24px', 
                  padding: '36px 28px',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{ 
                  background: 'linear-gradient(135deg, rgba(10, 144, 181, 0.12), rgba(230, 30, 110, 0.08))', 
                  padding: '20px', 
                  borderRadius: '50%', 
                  marginBottom: '22px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(10, 144, 181, 0.2)'
                }}>
                  {stat.icon}
                </div>
                <h3 style={{ 
                  fontFamily: "'Clash Display', 'Outfit', sans-serif", 
                  fontSize: '40px', 
                  fontWeight: 800, 
                  color: '#16203A', 
                  margin: '0 0 6px 0',
                  lineHeight: 1.1 
                }}>
                  {stat.value}
                </h3>
                <span style={{ fontSize: '13px', fontWeight: 800, color: '#0A90B5', letterSpacing: '1.2px', marginBottom: '8px' }}>
                  {stat.label}
                </span>
                <p style={{ fontSize: '14px', color: '#6B7280', margin: 0, fontWeight: 500 }}>
                  {stat.detail}
                </p>
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #0A90B5, #8e2382)' }}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#FFFFFF' }}>
        <div 
          className="about-founder-container"
          style={{ 
            ...sectionContainerStyle, 
            display: 'flex', 
            flexDirection: 'row',
            flexWrap: 'wrap',
            gap: '64px', 
            alignItems: 'center' 
          }}
        >
          {/* Founder Photo Card */}
          <div style={{ flex: '1 1 420px', maxWidth: '540px', width: '100%', margin: '0 auto' }}>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={slideFromLeft}
              style={{ 
                borderRadius: '28px', 
                overflow: 'hidden', 
                boxShadow: '0 20px 50px rgba(0, 0, 0, 0.12)', 
                backgroundColor: '#FFFFFF',
                border: '2px solid transparent',
                backgroundImage: 'linear-gradient(#fff, #fff), linear-gradient(135deg, #0A90B5 0%, #10182E 100%)',
                backgroundOrigin: 'border-box',
                backgroundClip: 'padding-box, border-box'
              }}
            >
              <div className="about-founder-card-img" style={{ position: 'relative', height: '460px', overflow: 'hidden' }}>
                <img 
                  src="https://i.postimg.cc/J0n8wP38/Whats-App-Image-2026-01-19-at-4-59-48-PM.jpg" 
                  alt="Ankit Singh" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  left: '20px',
                  backgroundColor: 'rgba(11, 11, 14, 0.88)',
                  backdropFilter: 'blur(10px)',
                  color: '#FFFFFF',
                  padding: '8px 18px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 700,
                  letterSpacing: '1px',
                  border: '1px solid rgba(10, 144, 181, 0.3)'
                }}>
                  FOUNDER'S VISION
                </div>
              </div>
              <div style={{ padding: '30px', textAlign: 'center', backgroundColor: '#F8F9FA' }}>
                <h4 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", margin: '0', fontSize: '28px', fontWeight: 800, color: '#16203A' }}>
                  Ankit Singh
                </h4>
                <p style={{ margin: '8px 0 0 0', fontSize: '16px', color: '#0A90B5', fontWeight: 700 }}>
                  Founder & CEO, HelpGlow Foundation
                </p>
              </div>
            </motion.div>
          </div>

          {/* Story Text */}
          <div style={{ flex: '1 1 580px' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              variants={slideFromRight}
            >
              <h2 style={{ 
                fontFamily: "'Clash Display', 'Outfit', sans-serif", 
                fontSize: 'clamp(34px, 4.8vw, 48px)', 
                fontWeight: 800, 
                color: '#16203A', 
                lineHeight: 1.18,
                margin: '0 0 18px 0'
              }}>
                Our Story – A Promise to a Movement
              </h2>
              <div style={{ width: '70px', height: '4px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', marginBottom: '28px', borderRadius: '2px' }}></div>
              
              <p style={{ fontSize: '20px', lineHeight: '1.85', color: '#374151', marginBottom: '24px' }}>
                In 2021, I started <strong style={{ color: '#111827' }}>HelpGlow Foundation</strong> in the heart of Varanasi—not just as an organization, 
                but as a promise. A promise to restore dignity, build trust, and create real human connection across underprivileged communities.
              </p>

              {/* Interactive Pillar Selector Tabs */}
              <div style={{ marginBottom: '28px' }}>
                <div style={{ fontSize: '16px', fontWeight: 800, color: '#16203A', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '14px' }}>
                  Our Three Core Mission Pillars:
                </div>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '18px' }}>
                  {pillars.map((pillar, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActivePillar(i)}
                      style={{
                        backgroundColor: activePillar === i ? '#0A90B5' : 'rgba(10, 144, 181, 0.08)',
                        color: activePillar === i ? '#FFFFFF' : '#0A90B5',
                        border: activePillar === i ? 'none' : '1px solid rgba(10, 144, 181, 0.3)',
                        padding: '10px 22px',
                        borderRadius: '50px',
                        fontSize: '15px',
                        fontWeight: 700,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        boxShadow: activePillar === i ? '0 6px 16px rgba(10, 144, 181, 0.3)' : 'none'
                      }}
                    >
                      ✨ {pillar.title}
                    </button>
                  ))}
                </div>
                
                {/* Active Pillar Card */}
                <motion.div 
                  key={activePillar}
                  initial={{ opacity: 0, x: 25 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    backgroundColor: '#F8F9FA',
                    borderLeft: '5px solid #0A90B5',
                    padding: '20px 24px',
                    borderRadius: '14px',
                    border: '1px solid #E5E7EB',
                    borderLeftWidth: '5px'
                  }}
                >
                  <strong style={{ display: 'block', color: '#16203A', fontSize: '17px', marginBottom: '6px' }}>
                    {pillars[activePillar].title}
                  </strong>
                  <p style={{ margin: 0, fontSize: '16px', color: '#4B5563', lineHeight: '1.65' }}>
                    {pillars[activePillar].desc}
                  </p>
                </motion.div>
              </div>

              <p style={{ fontWeight: 800, fontSize: '18px', color: '#16203A', margin: 0 }}>
                — Founder & CEO, HelpGlow Foundation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 4. Our Values Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#F8F9FA', borderTop: '1px solid #E5E7EB', borderBottom: '1px solid #E5E7EB' }}>
        <div style={sectionContainerStyle}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideFromBottom}
            style={{ textAlign: 'center', marginBottom: '56px' }}
          >
            <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '42px', fontWeight: 800, color: '#16203A', margin: '0 0 12px 0' }}>
              Our Values
            </h2>
            <div style={{ width: '70px', height: '4px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', margin: '0 auto 16px auto', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '20px', color: '#4B5563', margin: 0, fontWeight: 500 }}>
              Alleviating poverty by enabling the world to give joyfully.
            </p>
          </motion.div>

          <motion.div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
              gap: '30px' 
            }}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
          >
            {values.map((val, index) => (
              <motion.div 
                key={index} 
                variants={index % 2 === 0 ? slideFromLeft : slideFromRight}
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E5E7EB',
                  borderTop: '5px solid #0A90B5',
                  borderRadius: '24px', 
                  padding: '38px 32px',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative'
                }}
              >
                <div style={{ marginBottom: '22px' }}>{val.icon}</div>
                <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '24px', fontWeight: 800, color: '#16203A', marginBottom: '14px', lineHeight: 1.3 }}>
                  {val.title}
                </h3>
                <p style={{ fontSize: '17px', lineHeight: '1.75', color: '#4B5563', margin: 0 }}>
                  {val.text}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* 5. Leadership Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#FFFFFF' }}>
        <div style={sectionContainerStyle}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            variants={slideFromBottom}
            style={{ textAlign: 'center', marginBottom: '52px' }}
          >
            <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '42px', fontWeight: 800, color: '#16203A', margin: '0 0 12px 0' }}>
              Meet Our Leadership
            </h2>
            <div style={{ width: '70px', height: '4px', background: 'linear-gradient(90deg, #0A90B5, #E61C72)', margin: '0 auto 16px auto', borderRadius: '2px' }}></div>
            <p style={{ fontSize: '20px', color: '#4B5563', margin: 0, fontWeight: 500 }}>
              The dedicated team driving sustainable change and community welfare.
            </p>
          </motion.div>
          
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.2 }}
            variants={scaleUpCenter}
          >
            <TeamSlider />
          </motion.div>
        </div>
      </section>

      {/* 6. Legal Transparency Section */}
      <section style={{ padding: '100px 24px', backgroundColor: '#F8F9FA', borderTop: '1px solid #E5E7EB' }}>
        <div style={{ maxWidth: '1280px', width: '95%', margin: '0 auto' }}>
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.25 }}
            variants={scaleUpCenter}
            style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '28px', 
              padding: '52px 48px', 
              border: '1px solid #E5E7EB',
              boxShadow: '0 16px 44px rgba(0,0,0,0.06)',
              position: 'relative'
            }}
          >
            <div style={{ position: 'absolute', top: '52px', left: '0', width: '6px', height: '48px', background: 'linear-gradient(180deg, #0A90B5, #E61C72)', borderRadius: '0 4px 4px 0' }}></div>
            
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(74, 222, 128, 0.12)', color: '#16A34A', border: '1px solid rgba(74, 222, 128, 0.3)', padding: '6px 18px', borderRadius: '50px', fontSize: '13px', fontWeight: 700, marginBottom: '16px' }}>
                <span style={{ width: '8px', height: '8px', backgroundColor: '#16A34A', borderRadius: '50%', display: 'inline-block' }}></span>
                VERIFIED NGO • GOVERNMENT REGISTRATION ACTIVE
              </div>
              <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '40px', fontWeight: 800, color: '#16203A', margin: '0 0 12px 0' }}>
                Legal Transparency & Compliance
              </h2>
              <p style={{ fontSize: '19px', color: '#4B5563', margin: 0 }}>
                HelpGlow Foundation is committed to radical transparency and legal compliance across all operations.
              </p>
            </div>

            <motion.div 
              style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', 
                gap: '24px', 
                marginBottom: '40px' 
              }}
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
            >
              {legalItems.map((item, i) => (
                <motion.div 
                  key={i} 
                  variants={slideFromBottom}
                  whileHover={{ y: -6, scale: 1.02 }}
                  onClick={() => handleCopy(item.val, item.label)}
                  style={{ 
                    display: 'flex', 
                    gap: '16px', 
                    alignItems: 'center', 
                    background: '#F8F9FA', 
                    padding: '22px', 
                    borderRadius: '18px', 
                    border: '1px solid #E5E7EB',
                    cursor: 'pointer',
                    position: 'relative',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ 
                    backgroundColor: 'rgba(10, 144, 181, 0.12)', 
                    padding: '16px', 
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}>
                    {item.icon}
                  </div>
                  <div style={{ flexGrow: 1 }}>
                    <span style={{ display: 'block', fontSize: '12px', fontWeight: 800, color: '#9CA3AF', textTransform: 'uppercase', letterSpacing: '0.6px' }}>
                      {item.label}
                    </span>
                    <p style={{ fontSize: '15.5px', fontWeight: 700, color: '#16203A', margin: '4px 0 0 0', wordBreak: 'break-word', lineHeight: 1.35 }}>
                      {item.val}
                    </p>
                  </div>
                  <div style={{ color: copiedField === item.label ? '#16A34A' : '#9CA3AF' }}>
                    {copiedField === item.label ? <Check size={20} /> : <Copy size={18} />}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '40px' }}>
              {["Integrity Policy", "Passion for Service", "Data Retention"].map((badge, i) => (
                <span key={i} style={{ 
                  backgroundColor: '#F8F9FA', 
                  border: '1px solid #E5E7EB', 
                  color: '#16203A', 
                  padding: '10px 24px', 
                  borderRadius: '50px', 
                  fontSize: '14px', 
                  fontWeight: 600 
                }}>
                  {badge}
                </span>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <motion.a 
                href="/HelpGlow_Certificate_of_Incorporation.pdf"
                download="HelpGlow_Certificate_of_Incorporation.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                style={{ 
                  background: 'linear-gradient(135deg, #0A90B5 0%, #E85D29 100%)', 
                  color: '#FFFFFF', 
                  border: 'none', 
                  borderRadius: '14px', 
                  padding: '20px 48px', 
                  fontSize: '18px', 
                  fontWeight: 800, 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  gap: '12px',
                  cursor: 'pointer',
                  textDecoration: 'none',
                  boxShadow: '0 8px 24px rgba(10, 144, 181, 0.35)'
                }}
              >
                <Download size={24} />
                Download Official Certificates
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default About;
