import React, { useState, useEffect } from 'react';

const works = [
  { 
    id: 1, 
    title: "Essential Grocery Kits", 
    img: "https://i.postimg.cc/yN4Ttrb9/Whats-App-Image-2026-02-23-at-3-38-57-PM.jpg", 
    desc: "Providing a month of nutritious staples and hygiene essentials to families in crisis.", 
    price: "Rs 50", 
    unit: "per family", 
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ" 
  },
  { 
    id: 2, 
    title: "Education for All", 
    img: "https://i.postimg.cc/t4B71Cnh/Whats-App-Image-2026-02-21-at-11-29-12-PM-(1).jpg", 
    desc: "Building schools and providing kits to 500+ children.", 
    price: "Rs 50", 
    unit: "per kit", 
    videoUrl: "https://www.youtube.com/embed/7X8m-R-0A7k" 
  },
  { 
    id: 3, 
    title: "Feed a Friend", 
    img: "https://i.postimg.cc/Pf0zC5Wt/Whats-App-Image-2026-02-25-at-7-00-57-PM.jpg", 
    desc: "Your small contribution provides a full day of healthy meals and love for a stray dog in need.", 
    price: "Rs 50", 
    unit: "per meal", 
    videoUrl: "https://www.youtube.com/embed/EngW7tLk6R8" 
  },
  { 
    id: 4, 
    title: "Food Security", 
    img: "https://i.postimg.cc/nhScFR6t/Whats-App-Image-2026-02-22-at-1-59-36-AM-(1).jpg", 
    desc: "Fueling lives and restoring dignity through consistent access to healthy food.", 
    price: "Rs 50", 
    unit: "per meal", 
    videoUrl: "https://www.youtube.com/embed/6m6uT_UInL8" 
  },
];

const impactStories = [
  {
    label: "EDUCATION",
    title: "Shaping the Future Through Learning",
    para: "We believe education is the strongest tool to break poverty. We provide kits, coaching, and support to ensure no dream goes unfulfilled.",
    img: "https://i.postimg.cc/Zq9rc9h4/Whats-App-Image-2026-01-20-at-9-21-50-PM.jpg"
  },
  {
    label: "ANIMAL WELFARE",
    title: "Compassion for Every Living Being",
    para: "From street feeding drives to medical aid, our mission is to ensure stray animals live a life free from hunger and pain.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1000"
  },
  {
    label: "CELEBRATIONS",
    title: "Birthdays & Anniversaries with Purpose",
    para: "Make your special milestones unforgettable. Celebrate by sharing your joy with those in need through food and gift distributions.",
    img: "https://i.postimg.cc/3rGvW53X/Whats-App-Image-2026-02-23-at-3-36-29-PM.jpg"
  },
  {
    label: "HUNGER RELIEF",
    title: "Eliminating Hunger, One Meal at a Time",
    para: "Our community kitchens work tirelessly to provide hot, nutritious meals to homeless shelters and daily wage workers.",
    img: "https://i.postimg.cc/CLDXv1S8/20260219-150733.jpg"
  }
];

const coreValuesData = [
  { title: "Radical Transparency", desc: "See exactly where your giving goes. Every contribution is backed by real photos, videos, and clear updates.", icon: "🎯" },
  { title: "Dignity First", desc: "Help with respect, not pity. We ensure every act of giving preserves dignity and humanity.", icon: "🤝" },
  { title: "Verified Impact", desc: "Proof beats promises. From food distribution to celebrations, every outcome is documented.", icon: "🛡️" },
  { title: "Purpose-Driven Giving", desc: "Every rupee has a reason. We create experiences that result in long-term relief.", icon: "💡" },
  { title: "People Over Process", desc: "Compassion before complexity. Systems support us, but people drive us—donors, beneficiaries, and volunteers.", icon: "👥" },
  { title: "Celebrate Humanity", desc: "Giving can be joyful. Spreading happiness is also a powerful form of impact.", icon: "✨" },
];

function OurWorks() {
  const [index, setIndex] = useState(0);
  const [storyIndex, setStoryIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 900);
  
  const [displayText, setDisplayText] = useState("");
  const fullText = "Our core values";

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 150);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!activeVideo) {
      const timer = setInterval(() => {
        setIndex((prev) => (prev + 1) % works.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [activeVideo]);

  useEffect(() => {
    const timer = setInterval(() => {
      setStoryIndex((prev) => (prev + 1) % impactStories.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={styles.section}>
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
          .cursor-blink {
            animation: blink 0.8s infinite;
          }
        `}
      </style>

      {activeVideo && (
        <div style={styles.modalOverlay} onClick={() => setActiveVideo(null)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button style={styles.closeBtn} onClick={() => setActiveVideo(null)}>✕</button>
            <div style={styles.videoWrapper}>
              <iframe 
                style={styles.iframe} 
                src={`${activeVideo}?autoplay=1`} 
                title="Impact Video" 
                frameBorder="0" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      <div style={styles.header}>
        <h2 style={styles.heading}>Our Impactful Works</h2>
        <div style={styles.underline}></div>
        <p style={styles.subText}>Your kindness, their future. Explore our journey.</p>
      </div>

      <div style={styles.sliderContainer}>
        <div style={styles.sliderWrapper}>
          <div style={styles.cardsContainer}>
            {works.map((work, i) => {
              let position = "next"; 
              if (i === index) position = "active";
              else if (i === (index - 1 + works.length) % works.length) position = "prev";

              return (
                <div 
                  key={work.id} 
                  style={{ ...styles.card, ...styles[position] }}
                  onMouseEnter={(e) => {
                    if(position === "active") {
                        e.currentTarget.style.transform = 'translate(-50%, -55%) scale(1.02)';
                        e.currentTarget.style.boxShadow = '0 40px 80px rgba(2, 132, 199, 0.25)';
                        const img = e.currentTarget.querySelector('.card-img');
                        if(img) img.style.transform = 'translateY(-5px) scale(1.1)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if(position === "active") {
                        e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)';
                        e.currentTarget.style.boxShadow = '0 30px 60px rgba(0,0,0,0.12)';
                        const img = e.currentTarget.querySelector('.card-img');
                        if(img) img.style.transform = 'translateY(-5px) scale(1)';
                    }
                  }}
                >
                  <div style={styles.imageWrapper}>
                    <div style={styles.priceBadge}>
                        <span style={styles.priceVal}>{work.price}</span>
                        <span style={styles.priceUnit}>{work.unit}</span>
                    </div>
                    <img className="card-img" src={work.img} alt={work.title} style={styles.image} />
                    <div style={styles.imgOverlay}></div>
                  </div>
                  
                  <div style={styles.cardContent}>
                    <h3 style={styles.cardTitle}>{work.title}</h3>
                    <p style={styles.cardDesc}>{work.desc}</p>
                    <div style={styles.buttonGroup}>
                      <button 
                        style={styles.btnDonate}
                        onMouseEnter={(e) => e.target.style.background = 'linear-gradient(135deg, #0284c7 0%, #034d75 100%)'}
                        onMouseLeave={(e) => e.target.style.background = '#034d75'}
                      >
                        Donate {work.price}
                      </button>
                      <button 
                        style={styles.btnDemo} 
                        onClick={() => setActiveVideo(work.videoUrl)}
                      >
                        Watch Demo
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div style={styles.dotContainer}>
          {works.map((_, i) => (
            <button key={i} onClick={() => setIndex(i)} style={{ ...styles.dot, ...(index === i ? styles.dotActive : {}) }} />
          ))}
        </div>
      </div>
      
      <hr style={styles.divider} />

      <div style={{...styles.impactSection, maxWidth: isMobile ? '95%' : '1200px'}}>
        <div style={{...styles.impactGrid, gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr'}}>
          <div style={{...styles.impactImageContainer, height: isMobile ? '300px' : 'auto'}}>
            <img 
              src={impactStories[storyIndex].img} 
              alt="Our mission" 
              style={styles.impactImg}
              key={`img-${storyIndex}`} 
            />
          </div>

          <div style={{...styles.impactTextContainer, padding: isMobile ? '40px 20px' : '70px'}}>
            <h4 style={styles.storyLabel}>Why Donate?</h4>
            <h5 style={styles.impactCategory}>{impactStories[storyIndex].label}</h5>
            <h2 style={{...styles.impactTitle, fontSize: isMobile ? '2.2rem' : '3.2rem'}}>{impactStories[storyIndex].title}</h2>
            <p style={{...styles.impactPara, fontSize: isMobile ? '1.1rem' : '1.4rem'}}>{impactStories[storyIndex].para}</p>
            
            <div style={styles.miniDotContainer}>
              {impactStories.map((_, i) => (
                <div 
                  key={i} 
                  onClick={() => setStoryIndex(i)}
                  style={{...styles.miniDot, backgroundColor: storyIndex === i ? '#0284c7' : '#cbd5e1'}} 
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- CORE VALUES SECTION --- */}
      <div style={styles.valuesContainer}>
        <h2 style={styles.writingHeading}>
          {displayText}
          <span className="cursor-blink" style={styles.cursor}>|</span>
        </h2>
        
        <div style={styles.valuesGrid}>
          {coreValuesData.map((val, idx) => (
            <div 
              key={idx} 
              style={styles.valueCard}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(2, 132, 199, 0.15)'; // Sky blue shadow
                e.currentTarget.style.borderColor = '#0284c7';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.05)';
                e.currentTarget.style.borderColor = '#f1f5f9';
              }}
            >
              <div style={styles.valueIcon}>{val.icon}</div>
              <h3 style={styles.valueTitle}>{val.title}</h3>
              <p style={styles.valueDesc}>{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: { width: '100vw', padding: '100px 0', backgroundColor: '#fcfcfc', overflow: 'hidden' },
  header: { textAlign: 'center', marginBottom: '40px' },
  heading: { color: '#0f172a', fontSize: '3rem', fontWeight: '900', letterSpacing: '-1px' },
  underline: { width: '60px', height: '6px', background: '#0284c7', margin: '15px auto', borderRadius: '50px' },
  subText: { color: '#64748b', fontSize: '1.2rem' },

  sliderContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' },
  sliderWrapper: { height: '620px', width: '100%', position: 'relative', perspective: '2000px', display: 'flex', justifyContent: 'center' },
  cardsContainer: { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' },
  
  card: {
    position: 'absolute', left: '50%', top: '50%', width: '400px', maxWidth: '90vw',
    background: '#fff', borderRadius: '32px', 
    boxShadow: '0 30px 60px rgba(0,0,0,0.12)',
    transition: 'all 0.6s cubic-bezier(0.23, 1, 0.32, 1)', 
    overflow: 'hidden', border: '1px solid rgba(0,0,0,0.03)', cursor: 'pointer'
  },
  
  imageWrapper: { width: '100%', height: '398px', overflow: 'hidden', position: 'relative', backgroundColor: '#f1f5f9' },
  image: { width: '100%', height: '100%', objectFit: 'cover', transform: 'translateY(-5px)', transition: 'transform 0.6s ease' },
  imgOverlay: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.05))' },

  priceBadge: {
    position: 'absolute', top: '20px', left: '20px', background: 'rgba(2, 132, 199, 0.85)', backdropFilter: 'blur(10px)',
    color: '#fff', padding: '10px 18px', borderRadius: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 5
  },
  priceVal: { fontSize: '1.2rem', fontWeight: '900' },
  priceUnit: { fontSize: '0.7rem', textTransform: 'uppercase', fontWeight: '600' },

  cardContent: { padding: '30px', textAlign: 'left' },
  cardTitle: { color: '#1e293b', fontSize: '1.6rem', fontWeight: '800', marginBottom: '12px' },
  cardDesc: { color: '#64748b', fontSize: '1rem', marginBottom: '25px', lineHeight: '1.6', minHeight: '50px' },

  buttonGroup: { display: 'flex', gap: '15px' },
  btnDonate: { flex: 2, padding: '15px', background: '#034d75', color: '#fff', border: 'none', borderRadius: '16px', cursor: 'pointer', fontWeight: '700', transition: '0.3s' },
  btnDemo: { flex: 1, padding: '15px', background: 'transparent', color: '#034d75', border: '2px solid #e2e8f0', borderRadius: '16px', cursor: 'pointer', fontWeight: '700' },

  dotContainer: { display: 'flex', gap: '10px', marginTop: '20px' },
  dot: { width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#cbd5e1', border: 'none', cursor: 'pointer', transition: '0.4s' },
  dotActive: { backgroundColor: '#0284c7', width: '35px', borderRadius: '10px' },

  active: { transform: 'translate(-50%, -50%) scale(1)', opacity: 1, zIndex: 10 },
  prev: { transform: 'translate(-125%, -50%) scale(0.8) rotateY(20deg)', opacity: 0.5, zIndex: 5 },
  next: { transform: 'translate(25%, -50%) scale(0.8) rotateY(-20deg)', opacity: 0.5, zIndex: 5 },

  impactSection: { margin: '80px auto', background: '#fff', borderRadius: '40px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.08)' },
  impactGrid: { display: 'grid', minHeight: '550px' },
  impactImageContainer: { overflow: 'hidden' },
  impactImg: { width: '100%', height: '100%', objectFit: 'cover' },
  impactTextContainer: { display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)' },
  storyLabel: { color: '#0284c7', textTransform: 'uppercase', letterSpacing: '5px', fontWeight: '800', fontSize: '1.2rem', marginBottom: '15px' },
  impactCategory: { color: '#64748b', fontSize: '1.4rem', fontWeight: '500', marginBottom: '10px' },
  impactTitle: { color: '#0f172a', fontWeight: '900', lineHeight: '1.1', marginBottom: '25px' },
  impactPara: { color: '#475569', lineHeight: '1.8', marginBottom: '40px' },
  miniDotContainer: { display: 'flex', gap: '12px' },
  miniDot: { width: '12px', height: '12px', borderRadius: '50%', transition: '0.3s', cursor: 'pointer' },

  divider: { maxWidth: '1100px', margin: '60px auto', border: 'none', borderTop: '2px solid #f1f5f9' },
  modalOverlay: { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 },
  modalContent: { width: '90%', maxWidth: '900px', position: 'relative', borderRadius: '24px', overflow: 'hidden' },
  closeBtn: { position: 'absolute', top: '20px', right: '20px', background: '#fff', border: 'none', width: '35px', height: '35px', borderRadius: '50%', cursor: 'pointer', fontWeight: 'bold', zIndex: 1010 },
  videoWrapper: { position: 'relative', paddingTop: '56.25%', width: '100%' },
  iframe: { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },

  valuesContainer: { maxWidth: '1200px', margin: '100px auto 0 auto', padding: '0 20px', textAlign: 'center' },
  writingHeading: { fontSize: '3.5rem', fontWeight: '900', color: '#034d75', marginBottom: '50px', minHeight: '4.5rem' },
  cursor: { display: 'inline-block', width: '4px', marginLeft: '5px', backgroundColor: '#0284c7' },
  valuesGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', paddingBottom: '80px' },
  valueCard: { 
    background: '#fff', padding: '45px 35px', borderRadius: '28px', border: '1px solid #f1f5f9', 
    boxShadow: '0 10px 30px rgba(0,0,0,0.05)', transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)', 
    display: 'flex', flexDirection: 'column', alignItems: 'center', cursor: 'default' 
  },
  valueIcon: { fontSize: '3.5rem', marginBottom: '25px' },
  valueTitle: { fontSize: '1.6rem', fontWeight: '800', color: '#1e293b', marginBottom: '18px' },
  valueDesc: { color: '#64748b', lineHeight: '1.7', fontSize: '1.05rem' },
};

export default OurWorks;