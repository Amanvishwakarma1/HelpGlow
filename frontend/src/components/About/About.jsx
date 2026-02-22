import React from 'react';
import { 
  HandHeart, Megaphone, Heart, Users, Puzzle, Flame, 
  BarChart3, Users2, ShieldCheck, FileCheck, Globe, MapPin 
} from 'lucide-react';
import Team from '../Team/Team';

const About = () => {
  const stats = [
    { icon: <HandHeart size={42} color="#0ea5e9" />, value: "100 lakh+", label: "Worth Donations" },
    { icon: <Megaphone size={42} color="#0ea5e9" />, value: "100+", label: "Successful Campaigns" },
    { icon: <Heart size={42} color="#0ea5e9" />, value: "100 lakh+", label: "Lives Impacted" },
    { icon: <Users size={42} color="#0ea5e9" />, value: "1 lakh+", label: "Unique Donors" },
  ];

  const values = [
    {
      icon: <Puzzle size={40} color="#075985" />,
      title: "Integrity in everything we do",
      text: "We strive never to take the easy path, but always the honest one. We practice integrity in all our actions."
    },
    {
      icon: <Flame size={40} color="#075985" />,
      title: "Serve with passion",
      text: "We are fiercely committed to our purpose of poverty alleviation with a burning desire to make a difference."
    },
    {
      icon: <BarChart3 size={40} color="#075985" />,
      title: "Focused on scale",
      text: "We stay laser-focused on large-scale impact. If we can't scale it, we park it."
    },
    {
      icon: <Users2 size={40} color="#075985" />,
      title: "Empathy for all",
      text: "We are committed to working together with unconditional respect, freedom, trust and support."
    }
  ];

  return (
    <div style={styles.container}>
      {/* 1. Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroContent}>
          <h2 style={styles.heading} className="responsive-h1">About HelpGlow</h2>
          <div style={styles.underline}></div>
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
              <div style={styles.iconWrapper}>{stat.icon}</div>
              <h3 style={styles.statValue}>{stat.value}</h3>
              <p style={styles.statLabel}>{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Our Story Section */}
      <section style={styles.storySection}>
        <div style={styles.storyContainer} className="responsive-flex">
          <div style={styles.founderCardWrapper} className="full-width">
            <div style={styles.founderCard}>
              {/* IMAGE FIX: Changed to use object-fit and fixed height */}
              <div style={styles.imageArea}>
                <img 
                  src="https://i.postimg.cc/J0n8wP38/Whats-App-Image-2026-01-19-at-4-59-48-PM.jpg" 
                  alt="Ankit Singh" 
                  style={styles.founderImg}
                />
              </div>
              <div style={styles.founderInfo}>
                <h4 style={styles.founderName}>Ankit Singh</h4>
                <p style={styles.founderTitle}>Founder & CEO, HelpGlow Foundation</p>
              </div>
            </div>
          </div>

          <div style={styles.storyTextContent}>
            <h2 style={styles.storyHeading} className="responsive-h2">Our Story – From a Promise to a Movement</h2>
            <div style={styles.storyUnderline}></div>
            <p style={styles.storyParagraph}>
              In 2021, I started **HelpGlow Foundation** in the heart of Varanasi—not just as an organization, 
              but as a promise. A promise to restore dignity, build trust, and create real human connection. 
            </p>
            <p style={styles.storyParagraph}>
              Our core mission spans three vital pillars: **Education Welfare**, **Human Welfare**, and **Animal Welfare**. 
            </p>
            <p style={styles.signature}>— Founder & CEO, HelpGlow Foundation</p>
          </div>
        </div>
      </section>

      {/* 4. Our Values Section */}
      <section style={styles.valuesSection}>
        <div style={styles.valuesHeader}>
          <h2 style={styles.valuesHeading} className="responsive-h2">Our Values</h2>
          <div style={styles.valuesUnderline}></div>
          <p style={styles.valuesSubtext}>Our vision is to alleviate poverty by enabling the world to give</p>
        </div>
        <div style={styles.valuesGrid} className="responsive-grid">
          {values.map((val, index) => (
            <div key={index} className="zoom-card" style={styles.valueCard}>
              <div style={styles.valueIcon}>{val.icon}</div>
              <h4 style={styles.valueTitle}>{val.title}</h4>
              <p style={styles.valueText}>{val.text}</p>
            </div>
          ))}
        </div>
      </section>
      <Team/>
      {/* 5. Legal Section */}
      <section style={styles.legalSection}>
        <div style={styles.legalContainer} className="responsive-flex">
          <div style={styles.infoCard} className="full-width">
            <div style={styles.cardAccent}></div>
            <h2 style={styles.legalHeading} className="responsive-h2">Legal Transparency</h2>
            <p style={styles.legalSubtext}>
              HelpGlow Foundation is committed to radical transparency. Here is our official registration data.
            </p>

            <div style={styles.detailsGrid} className="responsive-details-grid">
              <div style={styles.detailItem}>
                <ShieldCheck size={24} color="#0ea5e9" />
                <div>
                  <span style={styles.detailLabel}>CIN Number</span>
                  <p style={styles.detailValue}>U88100UP2025NPL229317</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <Globe size={24} color="#0ea5e9" />
                <div>
                  <span style={styles.detailLabel}>NGO Darpan ID</span>
                  <p style={styles.detailValue}>UP/2022/0314589</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <FileCheck size={24} color="#0ea5e9" />
                <div>
                  <span style={styles.detailLabel}>PAN Card</span>
                  <p style={styles.detailValue}>AAICH0991A</p>
                </div>
              </div>
              <div style={styles.detailItem}>
                <MapPin size={24} color="#0ea5e9" />
                <div>
                  <span style={styles.detailLabel}>Registered Address</span>
                  <p style={styles.detailValue}>Kundariya Benipur Varanasi 221307</p>
                </div>
              </div>
            </div>

            <div style={styles.policyBadgeContainer}>
              <button className="badge-btn" style={styles.policyBadge}>Integrity Policy</button>
              <button className="badge-btn" style={styles.policyBadge}>Passion for Service</button>
              <button className="badge-btn" style={styles.policyBadge}>Data Retention</button>
            </div>

            <button className="zoom-btn" style={styles.mainBtn}>
              Download Certificates
            </button>
          </div>

          <div style={styles.imageGallery} className="hide-mobile">
            <div style={{...styles.galleryImg, ...styles.imgLarge}}>
              <div style={styles.imgPlaceholder}></div>
            </div>
            <div style={{...styles.galleryImg, ...styles.imgSmall}}>
              <div style={{...styles.imgPlaceholder, backgroundColor: '#f3e8d2'}}></div>
            </div>
          </div>
        </div>
        
        {/* ENHANCED RESPONSIVE CSS */}
        <style>
          {`
            .zoom-card:hover, .badge-btn:hover, .zoom-btn:hover {
              transform: scale(1.05);
              transition: transform 0.3s ease;
            }
            .zoom-btn:active { transform: scale(0.98); }

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
  
  heroSection: { position: 'relative', backgroundColor: '#0f172a', color: 'white', padding: '80px 20px' },
  heroOverlay: { position: 'absolute', inset: 0, backgroundColor: '#0ea5e9', opacity: 0.15, zIndex: 1 },
  heroContent: { position: 'relative', zIndex: 2, maxWidth: '1200px', margin: '0 auto', textAlign: 'left' },
  heading: { fontWeight: '700', margin: '0' },
  underline: { width: '80px', height: '4px', backgroundColor: '#0ea5e9', margin: '15px 0 25px' },
  description: { fontSize: '18px', lineHeight: '1.7', color: '#e2e8f0', maxWidth: '800px' },
  
  statsSection: { padding: '60px 20px' },
  statsGrid: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px' },
  statCard: { display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' },
  iconWrapper: { backgroundColor: '#fff', padding: '20px', borderRadius: '15px', boxShadow: '0 10px 30px rgba(14, 165, 233, 0.1)', marginBottom: '15px' },
  statValue: { fontSize: '28px', fontWeight: '700', margin: '0', color: '#0f172a' },
  statLabel: { fontSize: '14px', color: '#64748b' },

  storySection: { padding: '80px 20px', backgroundColor: '#f8fafc' },
  storyContainer: { maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '50px', alignItems: 'center' },
  founderCardWrapper: { flex: '0 0 350px' },
  founderCard: { borderRadius: '12px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)', backgroundColor: '#fff' },
  imageArea: { height: '420px', overflow: 'hidden', backgroundColor: '#e2e8f0' },
  founderImg: { width: '100%', height: '100%', objectFit: 'cover' },
  founderInfo: { backgroundColor: '#f3e8d2', padding: '20px', textAlign: 'center' },
  founderName: { margin: '0', fontSize: '20px', fontWeight: '700', color: '#075985' },
  founderTitle: { margin: '5px 0 0', fontSize: '13px', color: '#64748b' },
  storyTextContent: { flex: '1' },
  storyHeading: { fontWeight: '800', color: '#0f172a' },
  storyUnderline: { width: '100px', height: '3px', backgroundColor: '#0ea5e9', marginBottom: '25px' },
  storyParagraph: { fontSize: '16px', lineHeight: '1.8', color: '#334155', marginBottom: '20px' },
  signature: { fontWeight: '800', color: '#075985' },

  valuesSection: { padding: '80px 20px', backgroundColor: '#fff' },
  valuesHeader: { textAlign: 'center', marginBottom: '40px' },
  valuesHeading: { fontWeight: '800' },
  valuesUnderline: { width: '80px', height: '4px', backgroundColor: '#0ea5e9', margin: '15px auto 25px' },
  valuesSubtext: { fontSize: '18px', color: '#64748b' },
  valuesGrid: { maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' },
  valueCard: { backgroundColor: '#f0f9ff', padding: '30px', borderRadius: '12px', border: '1px solid #e0f2fe' },
  valueTitle: { fontSize: '20px', fontWeight: '700', color: '#075985', marginBottom: '15px' },
  valueText: { fontSize: '15px', lineHeight: '1.6', color: '#475569' },

  legalSection: { padding: '100px 20px', backgroundColor: '#f8fafc' },
  legalContainer: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '60px' },
  infoCard: { flex: '1', backgroundColor: '#fff', padding: '40px', borderRadius: '20px', boxShadow: '0 20px 50px rgba(0,0,0,0.05)', position: 'relative' },
  cardAccent: { position: 'absolute', top: '40px', left: '0', width: '4px', height: '30px', backgroundColor: '#0ea5e9' },
  legalHeading: { fontWeight: '800', color: '#0f172a' },
  legalSubtext: { fontSize: '15px', color: '#64748b', marginBottom: '40px' },
  detailsGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '25px', marginBottom: '30px' },
  detailLabel: { display: 'block', fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' },
  detailValue: { fontSize: '14px', fontWeight: '600', color: '#075985' },
  policyBadgeContainer: { display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '30px' },
  policyBadge: { backgroundColor: '#f1f5f9', border: 'none', padding: '8px 16px', borderRadius: '100px', fontSize: '12px', fontWeight: '600' },
  mainBtn: { backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '14px', borderRadius: '10px', fontWeight: '700', width: '100%' },
  imageGallery: { flex: '1', position: 'relative', height: '450px' },
  galleryImg: { borderRadius: '20px', overflow: 'hidden', border: '6px solid #fff', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' },
  imgLarge: { width: '80%', height: '350px', position: 'absolute', top: '0', right: '0' },
  imgSmall: { width: '45%', height: '250px', position: 'absolute', bottom: '0', left: '0', zIndex: '2' },
  imgPlaceholder: { width: '100%', height: '100%', backgroundColor: '#e2e8f0' }
};

export default About;