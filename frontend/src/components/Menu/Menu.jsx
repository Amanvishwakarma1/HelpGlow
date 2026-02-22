import React from 'react';
import { Phone, Mail, ArrowRight, Heart } from 'lucide-react';

const Menu = () => {
  const donationItems = [
    { 
      name: "Food Packets", 
      price: "30", 
      img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=500",
      description: "Provide a nutritious meal to a child in need."
    },
    { 
      name: "Dog Foods", 
      price: "40", 
      img: "https://images.unsplash.com/photo-1532994142815-18538cd7e354?q=80&w=500",
      description: "Support medical care and food for stray animals."
    },
    { 
      name: "Education Kit", 
      price: "50", 
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=500",
      description: "Basic tools like notebooks and pens for students."
    },
    { 
      name: "Grocery Kit", 
      price: "550", 
      img: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=500",
      description: "Monthly essentials for a vulnerable family."
    },
    { 
      name: "Celebration Cake", 
      price: "600", 
      img: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=500",
      description: "Bring a smile to a child's face on their birthday."
    },
    { 
      name: "Grand Party", 
      price: "4500", 
      img: "https://images.unsplash.com/photo-1530103043960-ef38714abb15?q=80&w=500",
      description: "Host a full event for over 50+ children."
    },
  ];

  return (
    <section style={styles.menuSection}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <h2 style={styles.heading}>Donation Price List</h2>
          <div style={styles.underline}></div>
          <p style={styles.subtext}>
            Your small contribution creates a large-scale impact. 100% transparent and verified.
          </p>
        </div>

        {/* Card Grid */}
        <div style={styles.grid}>
          {donationItems.map((item, index) => (
            <div key={index} className="donation-card" style={styles.card}>
              <div 
                style={{...styles.imageArea, backgroundImage: `url(${item.img})`}}
              >
                {/* --- Added Tax Benefit Badge --- */}
                <div style={styles.taxBadge}>Tax Benefit</div>
                
                <div style={styles.priceBadge}>₹{item.price}</div>
              </div>
              
              <div style={styles.cardContent}>
                <h3 style={styles.cardTitle}>{item.name}</h3>
                <p style={styles.cardText}>{item.description}</p>
                <button className="zoom-btn" style={styles.donateBtn} onClick={()=>{window.location.href="https://wa.me/message/ZMTBXKUYV7MWB1"}}>
                  Donate Now
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Footer */}
        <div style={styles.contactFooter}>
          <div style={styles.contactItem}><Phone size={20} /> +91 85282 20733</div>
          <div style={styles.contactItem}><Mail size={20} /> helpglowfoundation@gmail.com</div>
        </div>
      </div>

      <style>
        {`
          .donation-card {
            transition: all 0.3s ease-in-out;
            cursor: pointer;
          }
          .donation-card:hover {
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 20px 40px rgba(14, 165, 233, 0.15);
          }
          .zoom-btn:hover {
            transform: scale(1.05);
            background-color: #075985 !important;
          }
        `}
      </style>
    </section>
  );
};

const styles = {
  menuSection: { padding: '100px 20px', backgroundColor: '#f8fafc', fontFamily: '"Poppins", sans-serif' },
  container: { maxWidth: '1200px', margin: '0 auto' },
  header: { textAlign: 'center', marginBottom: '60px' },
  heading: { fontSize: '42px', fontWeight: '800', color: '#0f172a', margin: 0 },
  underline: { width: '100px', height: '4px', backgroundColor: '#0ea5e9', margin: '15px auto 20px' },
  subtext: { fontSize: '18px', color: '#64748b' },
  
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' },
  
  card: { 
    backgroundColor: '#fff', 
    borderRadius: '20px', 
    overflow: 'hidden', 
    border: '1px solid #e2e8f0',
    display: 'flex',
    flexDirection: 'column'
  },
  imageArea: { 
    height: '220px', 
    backgroundSize: 'cover', 
    backgroundPosition: 'center',
    position: 'relative'
  },
  
  // --- New Tax Badge Style ---
  taxBadge: {
    position: 'absolute',
    top: '15px',
    right: '15px',
    backgroundColor: '#fef3c7', // Soft amber/gold background
    color: '#92400e',           // Dark amber text
    padding: '4px 10px',
    borderRadius: '5px',        // As requested
    fontSize: '12px',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    border: '1px solid #fde68a'
  },

  priceBadge: {
    position: 'absolute',
    bottom: '15px',
    right: '15px',
    backgroundColor: '#0ea5e9',
    color: '#fff',
    padding: '8px 16px',
    borderRadius: '10px',
    fontWeight: '700',
    fontSize: '18px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
  },
  cardContent: { padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 },
  cardTitle: { fontSize: '22px', fontWeight: '700', color: '#075985', marginBottom: '10px' },
  cardText: { fontSize: '14px', color: '#64748b', lineHeight: '1.6', marginBottom: '20px', flex: 1 },
  
  donateBtn: { 
    backgroundColor: '#0ea5e9', 
    color: '#fff', 
    border: 'none', 
    padding: '12px 0', 
    borderRadius: '12px', 
    fontSize: '16px', 
    fontWeight: '700', 
    cursor: 'pointer',
    width: '100%',
    transition: 'all 0.3s ease'
  },

  contactFooter: { 
    marginTop: '60px', 
    display: 'flex', 
    justifyContent: 'center', 
    gap: '40px', 
    flexWrap: 'wrap',
    borderTop: '1px solid #e2e8f0',
    paddingTop: '40px'
  },
  contactItem: { display: 'flex', alignItems: 'center', gap: '10px', color: '#075985', fontWeight: '600' }
};

export default Menu;