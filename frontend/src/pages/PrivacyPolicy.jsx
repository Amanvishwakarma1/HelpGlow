import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle, ArrowLeft, Heart, Sparkles, PhoneCall } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const fadeInVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  const principles = [
    {
      icon: <Lock size={28} color="#0A90B5" />,
      title: "Zero Data Commercialization",
      desc: "We NEVER sell, trade, rent, or monetize donor details, phone numbers, or emails. Your trust is our highest priority."
    },
    {
      icon: <ShieldCheck size={28} color="#0A90B5" />,
      title: "Encrypted & Safe Payments",
      desc: "Receipt uploads and WhatsApp transactions are verified securely. Sensitive information is restricted to authorized officers."
    },
    {
      icon: <Eye size={28} color="#0A90B5" />,
      title: "Complete Donor Consent",
      desc: "Donor photos and celebration wish videos are published only with explicit consent. You can request deletion at any time."
    },
    {
      icon: <FileText size={28} color="#0A90B5" />,
      title: "100% Tax & Legal Compliance",
      desc: "Fully aligned with MCA Government NGO guidelines (CIN: U88100UP2025NPL229317) and IT Act data protection norms."
    }
  ];

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", color: '#111827', backgroundColor: '#FFFFFF', overflowX: 'hidden' }}>
      
      {/* Hero Banner */}
      <section style={{ 
        position: 'relative', 
        backgroundColor: '#16203A', 
        color: '#FFFFFF', 
        padding: '130px 24px 70px 24px',
        textAlign: 'center',
        overflow: 'hidden'
      }}>
        <motion.div 
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '-15%',
            left: '25%',
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(10, 144, 181, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            pointerEvents: 'none'
          }}
        />

        <div style={{ maxWidth: '950px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <motion.div initial="hidden" animate="visible" variants={fadeInVariants}>
            <div style={{ marginBottom: '18px' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, rgba(10, 144, 181, 0.18), rgba(10, 144, 181, 0.05))', 
                color: '#0A90B5', 
                border: '1px solid rgba(10, 144, 181, 0.4)',
                padding: '8px 22px', 
                borderRadius: '50px', 
                fontSize: '12.5px', 
                fontWeight: 800, 
                letterSpacing: '1.5px',
                textTransform: 'uppercase',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ShieldCheck size={16} color="#0A90B5" />
                DONOR PRIVACY & PROTECTION GUARANTEE
              </span>
            </div>

            <h1 style={{ 
              fontFamily: "'Clash Display', 'Outfit', sans-serif", 
              fontSize: 'clamp(36px, 5vw, 54px)', 
              fontWeight: 800, 
              background: 'linear-gradient(135deg, #FFFFFF 40%, #FCDCB5 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              margin: '0 0 20px 0',
              lineHeight: 1.18
            }}>
              Your Trust is Sanctified with Complete Data Security
            </h1>

            <p style={{ fontSize: '19px', lineHeight: '1.7', color: 'rgba(255, 255, 255, 0.88)', maxWidth: '820px', margin: '0 auto' }}>
              At HelpGlow Foundation, we hold your personal trust in sacred regard. Learn how we safeguard your personal details, donation records, and milestone celebration photos with radical transparency.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section style={{ padding: '70px 24px 90px 24px', backgroundColor: '#F8F9FA' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          
          {/* Back Navigation */}
          <div style={{ marginBottom: '32px' }}>
            <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#0A90B5', fontWeight: 700, textDecoration: 'none', fontSize: '15px' }}>
              <ArrowLeft size={18} /> Back to Home
            </Link>
          </div>

          {/* Pillars Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '50px' }}>
            {principles.map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -6 }}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '20px',
                  padding: '28px',
                  border: '1px solid #E5E7EB',
                  boxShadow: '0 8px 24px rgba(0,0,0,0.04)'
                }}
              >
                <div style={{ backgroundColor: 'rgba(10, 144, 181, 0.1)', width: '54px', height: '54px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '18px' }}>
                  {item.icon}
                </div>
                <h3 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '14.5px', color: '#4B5563', lineHeight: '1.6', margin: 0 }}>
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Detailed Policy Card */}
          <div style={{ backgroundColor: '#FFFFFF', borderRadius: '24px', padding: '44px', border: '1px solid #E5E7EB', boxShadow: '0 12px 36px rgba(0,0,0,0.04)' }}>
            
            <div style={{ borderBottom: '1px solid #E5E7EB', paddingBottom: '24px', marginBottom: '32px' }}>
              <h2 style={{ fontFamily: "'Clash Display', 'Outfit', sans-serif", fontSize: '28px', fontWeight: 800, color: '#16203A', margin: '0 0 8px 0' }}>
                HelpGlow Official Privacy Policy Statement
              </h2>
              <span style={{ fontSize: '13px', color: '#6B7280', fontWeight: 600 }}>
                Effective Date: August 2025 • Applicable for all online donations, meal sponsorships & website interactions.
              </span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontSize: '16px', lineHeight: '1.75', color: '#374151' }}>
              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} color="#0A90B5" />
                  1. Information We Collect
                </h3>
                <p style={{ margin: 0 }}>
                  When you sponsor a meal packet, party combo, or education kit through HelpGlow Foundation, we collect only necessary donor details: your full name, WhatsApp contact number, email address (optional), celebration date, wishing details, and payment proof screenshot.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} color="#0A90B5" />
                  2. Purpose & Use of Donor Information
                </h3>
                <p style={{ margin: 0 }}>
                  Your details are strictly utilized to:
                </p>
                <ul style={{ margin: '8px 0 0 20px', padding: 0 }}>
                  <li>Generate and send formal donation receipts and tax documentation.</li>
                  <li>Coordinate exact distribution dates for celebration wish videos.</li>
                  <li>Deliver direct photographic & video proof of your sponsored meal distribution via WhatsApp (+91 8528220733).</li>
                </ul>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} color="#0A90B5" />
                  3. Non-Disclosure & Absolute Privacy Commitment
                </h3>
                <p style={{ margin: 0 }}>
                  HelpGlow Foundation operates under zero-commercialization ethics. We do not sell, swap, lease, or share your contact data with telemarketers, commercial aggregators, or unauthorized third parties.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} color="#0A90B5" />
                  4. Photos & Celebration Video Content Rights
                </h3>
                <p style={{ margin: 0 }}>
                  If you upload a donor photograph for celebration videos, you retain complete rights. Should you wish to keep your celebration private or request post-campaign content removal, contact our data privacy team at any time.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#16203A', margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle size={20} color="#0A90B5" />
                  5. Contact Our Privacy Officer
                </h3>
                <p style={{ margin: 0 }}>
                  For data updates, deletion requests, or privacy inquiries:
                  <br />
                  <strong>Registered Address:</strong> Kundaria Benipur, Varanasi 221307, Uttar Pradesh
                  <br />
                  <strong>Direct Helpline:</strong> +91 8528220733
                </p>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
};

export default PrivacyPolicy;
