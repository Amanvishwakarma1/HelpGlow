import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  
  // --- Email Subscription States ---
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(""); 

  // Brand Colors from Logo
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    orange: '#f37021',
    gold: '#d4af37',
    lightBg: '#fff5f8' // Very soft pink tint for background
  };

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setStatus(""); 

    const serviceID = "service_y644uzi"; 
    const templateID = "template_l45g3i1"; 
    const publicKey = "D_WXyCJ1YYpJMe4hC";

    const templateParams = {
      user_email: email,
      message: "A new user has subscribed to the HelpGlow newsletter.",
      joined_at: new Date().toLocaleString(),
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then(() => {
        setStatus("Success! Thank you for joining.");
        setEmail(""); 
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setStatus("Oops! Something went wrong.");
      })
      .finally(() => {
        setIsSubmitting(false);
        setTimeout(() => setStatus(""), 5000);
      });
  };

  // --- Styles ---
  const footerStyle = {
    backgroundColor: colors.lightBg,
    color: '#2d3436',
    padding: '0 20px 40px 20px',
    fontFamily: "'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  };

  const floatingCardStyle = {
    background: `linear-gradient(135deg, ${colors.magenta} 0%, ${colors.pink} 50%, ${colors.orange} 100%)`,
    padding: '40px',
    borderRadius: '24px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    transform: 'translateY(-50px)',
    boxShadow: `0 20px 40px -10px rgba(142, 35, 130, 0.3)`,
    maxWidth: '1100px',
    margin: 'auto',
    border: `2px solid ${colors.gold}`, // Metallic Gold Accent
  };

  const getLinkStyle = (id) => ({
    textDecoration: 'none',
    color: hoveredLink === id ? colors.pink : '#636e72',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    transform: hoveredLink === id ? 'translateX(8px)' : 'translateX(0)',
    fontWeight: hoveredLink === id ? '600' : '400',
  });

  const socialButtonStyle = (id) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '50%', // Circular buttons to match logo
    backgroundColor: hoveredLink === id ? colors.magenta : '#fff',
    color: hoveredLink === id ? '#fff' : colors.magenta,
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hoveredLink === id ? 'translateY(-5px)' : 'translateY(0)',
    border: `1px solid ${colors.gold}`
  });

  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '1100px', margin: 'auto' }}>
        
        {/* Floating Subscription Card */}
        <div style={floatingCardStyle}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '26px', fontWeight: '800' }}>Join our mission</h2>
            <p style={{ color: '#ffeef4', margin: '0', fontSize: '16px', opacity: 0.9 }}>Receive impact stories directly in your inbox.</p>
          </div>
          
          <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '400px' }} onSubmit={handleJoin}>
            <div style={{ display: 'flex', background: 'white', padding: '5px', borderRadius: '50px' }}>
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '12px 20px', border: 'none', borderRadius: '50px', width: '100%', outline: 'none', fontSize: '14px' }} 
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{ 
                  padding: '12px 30px', 
                  background: isSubmitting ? '#ccc' : (btnHover ? colors.orange : colors.magenta), 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '50px', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  fontWeight: 'bold',
                  transition: '0.3s',
                }}
              >
                {isSubmitting ? "..." : "Join"}
              </button>
            </div>
            {status && (
              <p style={{ color: 'white', fontSize: '13px', marginTop: '12px', fontWeight: '600', textAlign: 'center' }}>
                {status}
              </p>
            )}
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginTop: '0px' }}>
          
          {/* Brand */}
          <div>
            <h3 style={{ color: colors.magenta, fontSize: '24px', fontWeight: '900', marginBottom: '15px' }}>HelpGlow</h3>
            <p style={{ lineHeight: '1.6', fontSize: '15px', color: '#636e72' }}>Restoring hope through community projects and sustainable change.</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '25px' }}>
              <a href="https://www.facebook.com/share/17uqoJknqJ/" target="_blank" rel="noreferrer" style={socialButtonStyle('fb')} onMouseEnter={() => setHoveredLink('fb')} onMouseLeave={() => setHoveredLink(null)}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.21c0-.837.398-1.79 1.142-1.79h2.858v-4h-3.83c-4.1 0-5.17 3.012-5.17 4.79v3.21z"/></svg>
              </a>
              <a href="https://www.instagram.com/helpglow_foundation?igsh=MXFnZWJqaXh3NXB1MA==" target="_blank" rel="noreferrer" style={socialButtonStyle('ig')} onMouseEnter={() => setHoveredLink('ig')} onMouseLeave={() => setHoveredLink(null)}>
                <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Animated Links */}
          <div>
            <h4 style={{ borderBottom: `2px solid ${colors.gold}`, color: colors.magenta, display: 'inline-block', paddingBottom: '5px', marginBottom: '20px', fontWeight: '700' }}>Ways to Help</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '15px', lineHeight: '2.8' }}>
              {['Monthly Giving', 'Corporate Partner', 'Volunteer', 'Our Campaigns'].map((text, index) => (
                <li key={index}>
                  <a href={`#${text}`} style={getLinkStyle(text)} onMouseEnter={() => setHoveredLink(text)} onMouseLeave={() => setHoveredLink(null)}>
                    {text}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ borderBottom: `2px solid ${colors.gold}`, color: colors.magenta, display: 'inline-block', paddingBottom: '5px', marginBottom: '20px', fontWeight: '700' }}>Contact Us</h4>
            <p style={{ fontSize: '15px', color: '#636e72', lineHeight: '1.6' }}>
              📍 Kundariya Benipur Varanasi 221307<br />
              📞 +91 8528220733
            </p>
            <div style={{ marginTop: '20px', background: 'white', padding: '15px', borderRadius: '15px', borderLeft: `5px solid ${colors.orange}`, boxShadow: '0 5px 15px rgba(0,0,0,0.05)' }}>
              <small style={{ color: colors.gold, textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '800', fontSize: '11px' }}>Tax Registration</small>
              <strong style={{ display: 'block', color: colors.magenta, marginTop: '2px' }}>PAN: AAICH0091A</strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '60px', paddingTop: '25px', textAlign: 'center', fontSize: '14px', color: '#94a3b8' }}>
          <p>© 2026 <span style={{color: colors.magenta, fontWeight: '700'}}>HelpGlow Foundation</span>. <a href="#privacy" style={{ color: colors.pink, textDecoration: 'none' }}>Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;