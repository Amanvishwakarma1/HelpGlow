import React from 'react';
import { 
  HandHeart, Megaphone, Heart, Users, Puzzle, Flame, 
  BarChart3, Users2, ShieldCheck, FileCheck, Globe, MapPin 
} from 'lucide-react';
import Team from '../Team/Team';

const About = () => {
  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightPink: '#fff5f8'
  };

  const stats = [
    { icon: <HandHeart size={42} color={colors.pink} />, value: "100 lakh+", label: "Worth Donations" },
    { icon: <Megaphone size={42} color={colors.pink} />, value: "100+", label: "Successful Campaigns" },
    { icon: <Heart size={42} color={colors.pink} />, value: "100 lakh+", label: "Lives Impacted" },
    { icon: <Users size={42} color={colors.pink} />, value: "1 lakh+", label: "Unique Donors" },
  ];

  const values = [
    {
      icon: <Puzzle size={40} color={colors.magenta} />,
      title: "Integrity in everything we do",
      text: "We strive never to take the easy path, but always the honest one. We practice integrity in all our actions."
    },
    {
      icon: <Flame size={40} color={colors.magenta} />,
      title: "Serve with passion",
      text: "We are fiercely committed to our purpose of poverty alleviation with a burning desire to make a difference."
    },
    {
      icon: <BarChart3 size={40} color={colors.magenta} />,
      title: "Focused on scale",
      text: "We stay laser-focused on large-scale impact. If we can't scale it, we park it."
    },
    {
      icon: <Users2 size={40} color={colors.magenta} />,
      title: "Empathy for all",
      text: "We are committed to working together with unconditional respect, freedom, trust and support."
    }
  ];

  return (
    <div style={styles.container}>
      {/* 1. Hero Section */}
      <section style={{...styles.heroSection, background: colors.magenta}}>
        <div style={{...styles.heroOverlay, background: `linear-gradient(135deg, ${colors.magenta}, ${colors.pink})`}}></div>
        <div style={styles.heroContent}>
          <h2 style={styles.heading} className="responsive-h1">About HelpGlow</h2>
          <div style={{...styles.underline, backgroundColor: colors.gold}}></div>
          <p style={styles.description}>
            HelpGlow Foundation is a non-profit built on the belief that giving should be personal, 
            transparent, and deeply meaningful. We deliver hope, dignity, and human connection through 
            impactful campaigns across India.
          </p>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section style={styles.statsSection}>
        <div style={styles.statsGrid} className="responsive-grid">
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={{...styles.iconWrapper, boxShadow: `0 10px 30px rgba(230, 30, 110, 0.1)`}}>{stat.icon}</div>
              <h3 style={{...styles.statValue, color: colors.magenta}}>{stat.value}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section style={{...styles.storySection, backgroundColor: colors.lightPink}}>
        <div style={styles.storyContainer} className="responsive-flex">
          <div style={styles.founderCardWrapper} className="full-width">
            <div style={{...styles.founderCard, border: `2px solid ${colors.gold}`}}>
              <div style={styles.imageArea}>
                <img 
                  src="https://i.postimg.cc/J0n8wP38/Whats-App-Image-2026-01-19-at-4-59-48-PM.jpg" 
                  alt="Ankit Singh" 
                  style={styles.founderImg}
                />
              </div>
              <div style={{...styles.founderInfo, backgroundColor: '#fdf7f9'}}>
                <h4 style={{...styles.founderName, color: colors.magenta}}>Ankit Singh</h4>
                <p style={styles.founderTitle}>Founder & CEO, HelpGlow Foundation</p>
              </div>
            </div>
          </div>

          <div style={styles.storyTextContent}>
            <h2 style={{...styles.storyHeading, color: colors.magenta}} className="responsive-h2">Our Story – A Promise to a Movement</h2>
            <div style={{...styles.storyUnderline, backgroundColor: colors.pink}}></div>
            <p style={styles.storyParagraph}>
              In 2021, I started **HelpGlow Foundation** in the heart of Varanasi—not just as an organization, 
              but as a promise. A promise to restore dignity, build trust, and create real human connection. 
            </p>
            <p style={styles.storyParagraph}>
              Our core mission spans three vital pillars: **Education Welfare**, **Human Welfare**, and **Animal Welfare**. 
            </p>
            <p style={{...styles.signature, color: colors.magenta}}>— Founder & CEO, HelpGlow Foundation</p>
          </div>
        </div>
      </section>

      {/* 4. Our Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesHeader}>
          <h2 style={{...styles.valuesHeading, color: colors.magenta}} className="responsive-h2">Our Values</h2>
          <div style={{...styles.valuesUnderline, backgroundColor: colors.gold}}></div>
          <p style={styles.valuesSubtext}>Alleviating poverty by enabling the world to give joyfully.</p>
        </div>
        <div style={styles.valuesGrid} className="responsive-grid">
          {values.map((val, index) => (
            <div key={index} className="zoom-card" style={{...styles.valueCard, border: `1px solid ${colors.gold}30`}}>
              <div style={styles.valueIcon}>{val.icon}</div>
              <h4 style={{...styles.valueTitle, color: colors.magenta}}>{val.title}</h4>
              <p style={styles.valueText}>{val.text}</p>
            </div>
          ))}
        </div>
      </section>

      <Team/>

      {/* 5. Legal Section */}
      <section style={{...styles.legalSection, backgroundColor: colors.lightPink}}>
        <div style={styles.legalContainer} className="responsive-flex">
          <div style={styles.infoCard} className="full-width">
            <div style={{...styles.cardAccent, backgroundColor: colors.pink}}></div>
            <h2 style={{...styles.legalHeading, color: colors.magenta}} className="responsive-h2">Legal Transparency</h2>
            <p style={styles.legalSubtext}>
              HelpGlow Foundation is committed to radical transparency and legal compliance.
            </p>

            <div style={styles.detailsGrid} className="responsive-details-grid">
              {[
                { icon: <ShieldCheck size={24} color={colors.pink} />, label: "CIN Number", val: "U88100UP2025NPL229317" },
                { icon: <Globe size={24} color={colors.pink} />, label: "NGO Darpan ID", val: "UP/2022/0314589" },
                { icon: <FileCheck size={24} color={colors.pink} />, label: "PAN Card", val: "AAICH0991A" },
                { icon: <MapPin size={24} color={colors.pink} />, label: "Registered Address", val: "Kundariya Benipur Varanasi 221307" },
              ].map((item, i) => (
                <div key={i} style={styles.detailItem}>
                  {item.icon}
                  <div>
                    <span style={styles.detailLabel}>{item.label}</span>
                    <p style={{...styles.detailValue, color: colors.magenta}}>{item.val}</p>
                  </div>
                </div>
              ))}
            </div>

            <div style={styles.policyBadgeContainer}>
              {["Integrity Policy", "Passion for Service", "Data Retention"].map((txt, i) => (
                <button key={i} className="badge-btn" style={styles.policyBadge}>{txt}</button>
              ))}
            </div>

            <button 
              className="zoom-btn" 
              style={{...styles.mainBtn, background: `linear-gradient(to right, ${colors.magenta}, ${colors.pink})`}}>
              Download Certificates
            </button>
          </div>

          <div style={styles.imageGallery} className="hide-mobile">
            <div style={{...styles.galleryImg, ...styles.imgLarge}}>
              <div style={{...styles.imgPlaceholder, background: colors.magenta, opacity: 0.8}}></div>
            </div>
            <div style={{...styles.galleryImg, ...styles.imgSmall}}>
              <div style={{...styles.imgPlaceholder, backgroundColor: colors.gold, opacity: 0.5}}></div>
            </div>
          </div>
        </div>
        
        <style>
          {`
            .zoom-card:hover, .badge-btn:hover, .zoom-btn:hover {
              transform: translateY(-5px);
              transition: all 0.3s ease;
            }
            .zoom-card:hover { border-color: ${colors.pink} !important; }
            .zoom-btn:active { transform: scale(0.98); }
            .badge-btn { color: ${colors.magenta}; border: 1px solid ${colors.gold}50 !important; }

            @media (max-width: 992px) {
              .responsive-flex { flex-direction: column !important; gap: 40px !important; }
              .full-width { flex: 0 0 100% !important; width: 100% !important; }
              .responsive-h1 { font-size: 36px !important; }
              .responsive-h2 { font-size: 30px !important; }
              .hide-mobile { display: none !important; }
            }

            @media (max-width: 600px) {
              .responsive-grid { grid-template-columns: 1fr !important; }
              .responsive-details-grid { grid-template-columns: 1fr !important; }
              .responsive-h1 { font-size: 28px !important; }
              section { padding: 40px 20px !important; }
            }
          `}
        </style>
      </section>
    </div>
  );
};

const styles = {
  container: { fontFamily: '"Poppins", sans-serif', margin: 0, backgroundColor: '#fff', overflowX: 'hidden' },
  
  heroSection: { position: 'relative', color: 'white', padding: '100px 20px' },
  heroOverlay: { position: 'absolute', inset: 0, opacity: 0.85, zIndex: 1 },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', textAlign: 'left' },
  heading: { fontWeight: '800', fontSize: '48px', margin: '0' },
  underline: { width: '80px', height: '5px', margin: '15px 0 25px' },
  description: { fontSize: '19px', lineHeight: '1.7', color: '#fff', maxWidth: '850px', fontWeight: '500' },
  
  statsSection: { padding: '80px 20px' },
  statsGrid: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' },
  statCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  iconWrapper: { backgroundColor: '#fff', padding: '25px', borderRadius: '20px', marginBottom: '15px', border: '1px solid #fdf2f8' },
  statValue: { fontSize: '32px', fontWeight: '800', margin: '0' },
  statLabel: { fontSize: '14px', color: '#64748b', fontWeight: '600' },

  storySection: { padding: '100px 20px' },
  storyContainer: { maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '60px', alignItems: 'center' },
  founderCardWrapper: { flex: '0 0 350px' },
  founderCard: { borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', backgroundColor: '#fff' },
  imageArea: { height: '420px', overflow: 'hidden' },
  founderImg: { width: '100%', height: '100%', objectFit: 'cover' },
  founderInfo: { padding: '25px', textAlign: 'center' },
  founderName: { margin: '0', fontSize: '22px', fontWeight: '800' },
  founderTitle: { margin: '5px 0 0', fontSize: '13px', color: '#64748b', fontWeight: '600' },
  storyTextContent: { flex: '1' },
  storyHeading: { fontWeight: '900', lineHeight: '1.2' },
  storyUnderline: { width: '100px', height: '4px', marginBottom: '30px' },
  storyParagraph: { fontSize: '16.5px', lineHeight: '1.9', color: '#334155', marginBottom: '20px' },
  signature: { fontWeight: '800', fontSize: '18px' },

  valuesSection: { padding: '100px 20px', backgroundColor: '#fff' },
  valuesHeader: { textAlign: 'center', marginBottom: '50px' },
  valuesHeading: { fontWeight: '900', fontSize: '36px' },
  valuesUnderline: { width: '80px', height: '5px', margin: '15px auto 30px' },
  valuesSubtext: { fontSize: '18px', color: '#64748b', fontWeight: '500' },
  valuesGrid: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' },
  valueCard: { backgroundColor: '#fff', padding: '40px', borderRadius: '24px', transition: '0.3s' },
  valueIcon: { marginBottom: '20px' },
  valueTitle: { fontSize: '22px', fontWeight: '800', marginBottom: '15px' },
  valueText: { fontSize: '15px', lineHeight: '1.7', color: '#475569' },

  legalSection: { padding: '120px 20px' },
  legalContainer: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '80px' },
  infoCard: { flex: '1', backgroundColor: '#fff', padding: '50px', borderRadius: '30px', boxShadow: '0 30px 60px rgba(0,0,0,0.05)', position: 'relative' },
  cardAccent: { position: 'absolute', top: '50px', left: '0', width: '6px', height: '40px', borderRadius: '0 10px 10px 0' },
  legalHeading: { fontWeight: '900', fontSize: '32px' },
  legalSubtext: { fontSize: '16px', color: '#64748b', marginBottom: '45px', fontWeight: '500' },
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' },
  detailItem: { display: 'flex', gap: '15px', alignItems: 'flex-start' },
  detailLabel: { display: 'block', fontSize: '12px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.5px' },
  detailValue: { fontSize: '15px', fontWeight: '700', marginTop: '3px' },
  policyBadgeContainer: { display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '40px' },
  policyBadge: { backgroundColor: '#fdf2f8', border: 'none', padding: '10px 20px', borderRadius: '100px', fontSize: '13px', fontWeight: '700' },
  mainBtn: { color: '#fff', border: 'none', padding: '18px', borderRadius: '15px', fontSize: '16px', fontWeight: '800', width: '100%', cursor: 'pointer' },
  imageGallery: { flex: '1', position: 'relative', height: '450px' },
  galleryImg: { borderRadius: '25px', overflow: 'hidden', border: '8px solid #fff', boxShadow: '0 25px 50px rgba(0,0,0,0.08)' },
  imgLarge: { width: '85%', height: '380px', position: 'absolute', top: '0', right: '0' },
  imgSmall: { width: '50%', height: '260px', position: 'absolute', bottom: '0', left: '0', zIndex: '2' },
  imgPlaceholder: { width: '100%', height: '100%' }
};

export default About;