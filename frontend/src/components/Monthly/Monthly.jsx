import React from 'react';
import { PlayCircle, Heart, Calendar, ShieldCheck, ArrowRight, Search } from 'lucide-react';

const Monthly = () => {
  return (
    <div style={styles.container}>
      {/* 1. Hero Section */}
      <section style={styles.heroSection}>
        <div style={styles.heroOverlay}></div>
        <div style={styles.glassCard} className="glass-card">
          <h1 style={styles.heroTitle} className="hero-title">DONATE MONTHLY</h1>
          <p style={styles.heroSubtitle}>From poverty and injustice</p>
          <button className="zoom-btn" style={styles.mainDonateBtn} onClick={()=>{window.location.href="https://wa.me/message/ZMTBXKUYV7MWB1","_blank"}}>
            DONATE MONTHLY
          </button>
        </div>
      </section>

      {/* 2. Video CTA Bar */}
      <div style={styles.videoBar}>
        <div style={styles.videoContent}>
          <PlayCircle size={32} color="#fff" />
          <span style={styles.videoText}>HOW TO DONATE? WATCH NOW!</span>
        </div>
      </div>

      {/* 3. Why Monthly Section */}
      <section style={styles.infoSection}>
        <div style={styles.contentWrapper}>
          <div style={styles.textContent}>
            <h2 style={styles.sectionHeading}>Why Monthly Giving Matters</h2>
            <div style={styles.underline}></div>
            <p style={styles.description}>
              Monthly donors are the backbone of **HelpGlow Foundation**. Your consistent support allows us 
              to plan ahead, react quickly to emergencies, and ensure that over 5,000 children in Varanasi 
              never go a day without food or education.
            </p>
            
            <div style={styles.benefitGrid}>
              <div style={styles.benefitItem}>
                <Calendar size={24} color="#0ea5e9" />
                <span>Sustainable long-term impact</span>
              </div>
              <div style={styles.benefitItem}>
                <ShieldCheck size={24} color="#0ea5e9" />
                <span>100% Transparency & WhatsApp Updates</span>
              </div>
              <div style={styles.benefitItem}>
                <Heart size={24} color="#0ea5e9" />
                <span>Join a community of 1 Lakh+ Donors</span>
              </div>
            </div>
          </div>

          <div style={styles.imageContainer}>
            <div style={styles.imageFrame}>
              <div style={{...styles.imgPlaceholder, backgroundImage: 'url("https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1000")'}}></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Campaign Categories Section - FIXED OVERFLOW */}
      <section style={styles.categoriesSection}>
        <div style={styles.categoriesWrapper} className="stack-reverse">
          {/* Left Column: Categories & Search */}
          <div style={styles.categoriesColumn}>
            <h2 style={styles.categoriesTitle}>CATEGORIES</h2>
            
            <div style={styles.categoriesList} className="mobile-grid-1">
              {categories.map((category, index) => (
                <div 
                  key={index} 
                  style={{
                    ...styles.categoryItem,
                    backgroundColor: category === 'ALL' ? '#0ea5e9' : '#f8fafc',
                    color: category === 'ALL' ? '#fff' : '#334155',
                    border: category === 'ALL' ? '2px solid #0ea5e9' : '2px solid #e2e8f0',
                  }}
                  className="zoom-btn"
                >
                  {category}
                </div>
              ))}
            </div>

            {/* Fixed Search Bar Container */}
            <div style={styles.searchContainer}>
              <div style={styles.searchWrapper}>
                <Search size={20} color="#94a3b8" style={styles.searchIcon} />
                <input 
                  type="text" 
                  placeholder="Search for campaign..." 
                  style={styles.searchInput}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Campaign Cards - FIXED STATS OVERFLOW */}
          <div style={styles.campaignsColumn}>
            <div style={styles.campaignCard}>
              <div style={styles.campaignContent}>
                <div style={styles.campaignHeader}>
                  <h3 style={styles.campaignCategory}>HUMAN WELFARE:</h3>
                  <h4 style={styles.campaignTitle}>END CHILD HUNGER</h4>
                </div>
                <div style={styles.campaignStats}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber} className="stat-text">343</div>
                    <div style={styles.statLabel}>DAYS LEFT</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber} className="stat-text">26</div>
                    <div style={styles.statLabel}>SPONSORS</div>
                  </div>
                </div>
              </div>
              <div style={styles.progressBar}>
                <div style={styles.progressFill}></div>
              </div>
            </div>

            <div style={styles.campaignCard}>
              <div style={styles.campaignContent}>
                <div style={styles.campaignHeader}>
                  <h3 style={styles.campaignCategory}>ANIMAL WELFARE:</h3>
                  <h4 style={styles.campaignTitle}>STREET FEEDING</h4>
                </div>
                <div style={styles.campaignStats}>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber} className="stat-text">120</div>
                    <div style={styles.statLabel}>DAYS LEFT</div>
                  </div>
                  <div style={styles.statBox}>
                    <div style={styles.statNumber} className="stat-text">84</div>
                    <div style={styles.statLabel}>SPONSORS</div>
                  </div>
                </div>
              </div>
              <div style={styles.progressBar}>
                <div style={{...styles.progressFill, width: '70%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer CTA */}
      <section style={styles.bottomCta}>
        <h3 style={styles.ctaHeading}>Ready to make a lasting change?</h3>
        <button className="zoom-btn" style={styles.finalBtn}>
          Start Your Monthly Journey <ArrowRight size={20} />
        </button>
      </section>

      <style>
        {`
          .zoom-btn { transition: all 0.3s ease; cursor: pointer; }
          .zoom-btn:hover { transform: scale(1.03); box-shadow: 0 10px 20px rgba(14, 165, 233, 0.2); }
          
          @media (max-width: 900px) {
            .hero-title { font-size: 36px !important; }
            .glass-card { padding: 30px 15px !important; width: 95%; }
            .stack-reverse { flex-direction: column-reverse !important; gap: 30px !important; }
            .mobile-grid-1 { grid-template-columns: 1fr 1fr !important; }
            .stat-text { font-size: 24px !important; }
          }

          @media (max-width: 480px) {
            .mobile-grid-1 { grid-template-columns: 1fr !important; }
            .campaign-title { font-size: 20px !important; }
          }
        `}
      </style>
    </div>
  );
};

const categories = ['ALL', 'URGENT', 'LIFE EVENT', 'ANIMAL', 'RELIGIOUS', 'HUNGER', 'MEDICAL', 'NATURE'];

const styles = {
  container: { fontFamily: '"Poppins", sans-serif', backgroundColor: '#fff', overflowX: 'hidden' },
  heroSection: {
    position: 'relative', height: '70vh', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    backgroundImage: 'url("https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=2000")', backgroundSize: 'cover', backgroundPosition: 'center'
  },
  heroOverlay: { position: 'absolute', inset: 0, backgroundColor: 'rgba(15, 23, 42, 0.6)' },
  glassCard: { position: 'relative', zIndex: 2, backgroundColor: 'rgba(255, 255, 255, 0.15)', backdropFilter: 'blur(12px)', padding: '50px', borderRadius: '30px', border: '1px solid rgba(255, 255, 255, 0.2)', textAlign: 'center', maxWidth: '800px' },
  heroTitle: { fontSize: '56px', fontWeight: '900', color: '#fff', margin: 0, fontStyle: 'italic' },
  heroSubtitle: { fontSize: '20px', color: '#fff', margin: '10px 0 30px' },
  mainDonateBtn: { backgroundColor: '#fff', color: '#075985', border: 'none', padding: '15px 40px', borderRadius: '50px', fontSize: '16px', fontWeight: '800' },
  videoBar: { backgroundColor: '#38bdf8', padding: '15px 0', display: 'flex', justifyContent: 'center' },
  videoContent: { display: 'flex', alignItems: 'center', gap: '12px' },
  videoText: { color: '#fff', fontSize: '16px', fontWeight: '800' },
  infoSection: { padding: '60px 20px', backgroundColor: '#f8fafc' },
  contentWrapper: { maxWidth: '1200px', margin: '0 auto', display: 'flex', alignItems: 'center', gap: '40px', flexWrap: 'wrap' },
  textContent: { flex: '1', minWidth: '300px' },
  sectionHeading: { fontSize: '32px', fontWeight: '800', color: '#0f172a' },
  underline: { width: '60px', height: '4px', backgroundColor: '#0ea5e9', margin: '10px 0 20px' },
  description: { fontSize: '16px', lineHeight: '1.6', color: '#334155' },
  benefitGrid: { display: 'flex', flexDirection: 'column', gap: '15px' },
  benefitItem: { display: 'flex', alignItems: 'center', gap: '12px', fontSize: '15px', color: '#075985', fontWeight: '600' },
  imageContainer: { flex: '1', minWidth: '300px' },
  imageFrame: { borderRadius: '20px', border: '8px solid #fff', boxShadow: '0 15px 30px rgba(0,0,0,0.1)', overflow: 'hidden', height: '350px' },
  imgPlaceholder: { width: '100%', height: '100%', backgroundSize: 'cover', backgroundPosition: 'center' },
  
  // Categories & Search Section
  categoriesSection: { padding: '60px 20px' },
  categoriesWrapper: { maxWidth: '1200px', margin: '0 auto', display: 'flex', gap: '50px' },
  categoriesColumn: { flex: '1', minWidth: '280px' },
  categoriesTitle: { fontSize: '28px', fontWeight: '800', marginBottom: '20px' },
  categoriesList: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' },
  categoryItem: { padding: '12px', borderRadius: '10px', textAlign: 'center', fontSize: '14px', fontWeight: '600' },
  searchContainer: { marginTop: '30px', width: '100%' },
  searchWrapper: { position: 'relative', width: '100%' },
  searchIcon: { position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)' },
  searchInput: { width: '100%', padding: '15px 15px 15px 45px', borderRadius: '12px', border: '2px solid #e2e8f0', backgroundColor: '#f8fafc', outline: 'none', boxSizing: 'border-box' },

  // Campaign Cards - Fixed Overflow
  campaignsColumn: { flex: '1.2', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '25px' },
  campaignCard: { backgroundColor: '#fff', borderRadius: '20px', border: '1px solid #e2e8f0', overflow: 'hidden', boxSizing: 'border-box' },
  campaignContent: { padding: '25px' },
  campaignCategory: { fontSize: '12px', color: '#64748b', fontWeight: '700', margin: '0 0 5px 0' },
  campaignTitle: { fontSize: '24px', fontWeight: '800', color: '#0f172a', margin: '0 0 20px 0', lineHeight: '1.2' },
  campaignStats: { display: 'flex', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' },
  statBox: { flex: '1', minWidth: '80px' },
  statNumber: { fontSize: '32px', fontWeight: '900', color: '#0ea5e9' },
  statLabel: { fontSize: '11px', fontWeight: '700', color: '#94a3b8' },
  progressBar: { height: '8px', backgroundColor: '#f1f5f9' },
  progressFill: { height: '100%', width: '40%', backgroundColor: '#0ea5e9' },

  bottomCta: { padding: '60px 20px', textAlign: 'center', backgroundColor: '#f8fafc' },
  ctaHeading: { fontSize: '24px', fontWeight: '700', marginBottom: '20px' },
  finalBtn: { backgroundColor: '#0ea5e9', color: '#fff', border: 'none', padding: '15px 35px', borderRadius: '12px', fontWeight: '700', display: 'inline-flex', alignItems: 'center', gap: '10px' }
};

export default Monthly;