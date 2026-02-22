import React, { useState, useEffect } from 'react';

const works = [
  { id: 1, title: "Clean Water Project", img: "https://i.postimg.cc/0N2RnNNV/Chat-GPT-Image-Jan-20-2026-12-43-25-AM.png", desc: "Providing sustainable water sources to 50+ villages." },
  { id: 2, title: "Education for All", img: "https://i.postimg.cc/t4B71Cnh/Whats-App-Image-2026-02-21-at-11-29-12-PM-(1).jpg", desc: "Building schools and providing kits to 500+ children." },
  { id: 3, title: "Medical Camps", img: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80&w=800", desc: "Free healthcare checkups for the elderly in rural areas." },
  { id: 4, title: "Food Security", img: "https://i.postimg.cc/nhScFR6t/Whats-App-Image-2026-02-22-at-1-59-36-AM-(1).jpg", desc: "Distributing 10,000+ meals monthly to homeless shelters." },
];

function OurWorks() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % works.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <section style={styles.section}>
      
      {/* --- 1. Our Works Section (Now First) --- */}
      <div style={styles.header}>
        <h2 style={styles.heading}>Our Impactful Works</h2>
        <div style={styles.underline}></div>
        <p style={styles.subText}>Swipe through our recent initiatives across the globe.</p>
      </div>

      <div style={styles.sliderWrapper}>
        <div style={styles.cardsContainer}>
          {works.map((work, i) => {
            let position = "next"; 
            if (i === index) position = "active";
            else if (i === (index - 1 + works.length) % works.length) position = "prev";

            return (
              <div key={work.id} style={{ ...styles.card, ...styles[position] }}>
                <img src={work.img} alt={work.title} style={styles.image} />
                <div style={styles.cardContent}>
                  <h3 style={styles.cardTitle}>{work.title}</h3>
                  <p style={styles.cardDesc}>{work.desc}</p>
                  <button 
                    style={styles.btn}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.1)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <hr style={styles.divider} />

      {/* --- 2. Why Donate Story Section (Now Second) --- */}
      <div style={styles.storyContainer}>
        {/* <div style={styles.storyImageWrapper}>
          <img 
            src="https://i.postimg.cc/0N2RnNNV/Chat-GPT-Image-Jan-20-2026-12-43-25-AM.png" 
            alt="Smiling children" 
            style={styles.storyImage} 
          />
        </div> */}
        <div style={styles.storyTextWrapper}>
          <h4 style={styles.storyLabel}>Why Donate?</h4>
          <h2 style={styles.storyTitle}>Your Contribution Creates a Glow of Hope</h2>
          <p style={styles.storyPara}>
            Every child deserves a future filled with smiles and education. At <strong>HelpGlow</strong>, 
            we believe that the cycle of poverty can only be broken when we provide the basic 
            necessities: <strong>Quality Education, Healthcare, and Nutrition.</strong>
          </p>
          <ul style={styles.serviceList}>
            <li style={styles.serviceItem}>✔ Providing Textbooks & School Supplies</li>
            <li style={styles.serviceItem}>✔ Enabling Access to Healthcare & Clean Water</li>
            <li style={styles.serviceItem}>✔ Empowering Communities through Nutrition</li>
          </ul>
        </div>
      </div>

    </section>
  );
}

const styles = {
  section: {
    width: '100vw',
    padding: '80px 0',
    backgroundColor: '#fff',
    overflow: 'hidden',
    position: 'relative'
  },
  header: { textAlign: 'center', marginBottom: '40px' },
  heading: { color: '#0369a1', fontSize: '2.8rem', fontWeight: '800' },
  underline: { width: '80px', height: '5px', background: '#0284c7', margin: '15px auto', borderRadius: '10px' },
  subText: { color: '#64748b', fontSize: '1.1rem' },
  sliderWrapper: {
    height: '550px',
    position: 'relative',
    perspective: '1500px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '60px'
  },
  cardsContainer: { position: 'relative', width: '100%', height: '100%', transformStyle: 'preserve-3d' },
  card: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    width: '380px',
    background: '#fff',
    borderRadius: '25px',
    boxShadow: '0 25px 50px rgba(0,0,0,0.15)',
    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    overflow: 'hidden',
    border: '1px solid #e2e8f0',
  },
  image: { width: '100%', height: '220px', objectFit: 'cover' },
  cardContent: { padding: '25px', textAlign: 'center' },
  cardTitle: { color: '#0284c7', fontSize: '1.4rem', fontWeight: '700', marginBottom: '10px' },
  cardDesc: { color: '#64748b', fontSize: '0.95rem', marginBottom: '20px', lineHeight: '1.5' },
  btn: { padding: '10px 25px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '10px', cursor: 'pointer', fontWeight: '700', transition: '0.3s' },

  active: { transform: 'translate(-50%, -50%) scale(1) translateZ(0)', opacity: 1, zIndex: 10 },
  prev: { transform: 'translate(-125%, -50%) scale(0.8) rotateY(35deg)', opacity: 0.5, zIndex: 5 },
  next: { transform: 'translate(25%, -50%) scale(0.8) rotateY(-35deg)', opacity: 0.5, zIndex: 5 },

  divider: { maxWidth: '1100px', margin: '80px auto', border: 'none', borderTop: '2px solid #f1f5f9' },

  storyContainer: {
    display: 'flex',
    maxWidth: '1100px',
    margin: '0 auto',
    alignItems: 'center',
    gap: '60px',
    padding: '0 20px',
    flexWrap: 'wrap'
  },
  storyImageWrapper: {
    flex: '1',
    minWidth: '320px',
    borderRadius: '25px',
    overflow: 'hidden',
    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
    border: '5px solid #0284c7'
  },
  storyImage: { width: '100%', height: 'auto', display: 'block' },
  storyTextWrapper: { flex: '1.2', minWidth: '320px' },
  storyLabel: { color: '#0284c7', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '800', margin: '0 0 10px 0' },
  storyTitle: { color: '#0369a1', fontSize: '2.4rem', fontWeight: '800', lineHeight: '1.2', margin: '0 0 20px 0' },
  storyPara: { color: '#64748b', fontSize: '1.1rem', lineHeight: '1.7', marginBottom: '20px' },
  serviceList: { listStyle: 'none', padding: 0 },
  serviceItem: { color: '#334155', fontWeight: '600', marginBottom: '12px', fontSize: '1rem' },
};

export default OurWorks;