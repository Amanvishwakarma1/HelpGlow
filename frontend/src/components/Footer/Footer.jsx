import React, { useState } from 'react';
import emailjs from '@emailjs/browser';

const Footer = () => {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [btnHover, setBtnHover] = useState(false);
  
  // --- Email Subscription States ---
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(""); 

  const handleJoin = (e) => {
    e.preventDefault();
    if (!email || isSubmitting) return;

    setIsSubmitting(true);
    setStatus(""); 

    // --- Updated Credentials ---
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
    backgroundColor: '#f0f9ff',
    color: '#334155',
    padding: '0 20px 40px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  };

  const floatingCardStyle = {
    background: 'linear-gradient(135deg, #0284c7 0%, #0ea5e9 100%)',
    padding: '40px',
    borderRadius: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '20px',
    transform: 'translateY(-50px)',
    boxShadow: '0 10px 25px -5px rgba(2, 132, 199, 0.3)',
    maxWidth: '1100px',
    margin: 'auto',
  };

  const getLinkStyle = (id) => ({
    textDecoration: 'none',
    color: hoveredLink === id ? '#0284c7' : '#64748b',
    transition: 'all 0.3s ease',
    display: 'inline-block',
    transform: hoveredLink === id ? 'scale(1.1) translateX(5px)' : 'scale(1)',
    fontWeight: hoveredLink === id ? '600' : '400',
  });

  const socialButtonStyle = (id) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    backgroundColor: hoveredLink === id ? '#0284c7' : '#fff',
    color: hoveredLink === id ? '#fff' : '#0284c7',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    transform: hoveredLink === id ? 'translateY(-3px)' : 'translateY(0)',
    border: 'none'
  });

  return (
    <footer style={footerStyle}>
      <div style={{ maxWidth: '1100px', margin: 'auto' }}>
        
        {/* Floating Subscription Card */}
        <div style={floatingCardStyle}>
          <div style={{ maxWidth: '500px' }}>
            <h2 style={{ color: 'white', margin: '0 0 10px 0', fontSize: '24px' }}>Join our mission</h2>
            <p style={{ color: '#e0f2fe', margin: '0', fontSize: '15px' }}>Receive impact stories directly in your inbox.</p>
          </div>
          
          <form style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '400px' }} onSubmit={handleJoin}>
            <div style={{ display: 'flex' }}>
              <input 
                type="email" 
                required
                placeholder="Your email address" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: '15px', border: 'none', borderRadius: '8px 0 0 8px', width: '100%', outline: 'none' }} 
              />
              <button 
                type="submit"
                disabled={isSubmitting}
                onMouseEnter={() => setBtnHover(true)}
                onMouseLeave={() => setBtnHover(false)}
                style={{ 
                  padding: '15px 25px', 
                  background: isSubmitting ? '#94a3b8' : (btnHover ? '#0369a1' : '#0c4a6e'), 
                  color: 'white', 
                  border: 'none', 
                  borderRadius: '0 8px 8px 0', 
                  cursor: isSubmitting ? 'not-allowed' : 'pointer', 
                  fontWeight: 'bold',
                  transition: '0.3s',
                  transform: btnHover && !isSubmitting ? 'scale(1.05)' : 'scale(1)'
                }}
              >
                {isSubmitting ? "Wait..." : "Join"}
              </button>
            </div>
            {status && (
              <p style={{ color: 'white', fontSize: '12px', marginTop: '10px', fontWeight: '600' }}>
                {status}
              </p>
            )}
          </form>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginTop: '-10px' }}>
          
          {/* Brand */}
          <div>
            <h3 style={{ color: '#0284c7', fontSize: '22px', marginBottom: '15px' }}>HelpGlow</h3>
            <p style={{ lineHeight: '1.6', fontSize: '14px', color: '#64748b' }}>Restoring hope through community projects.</p>
            <div style={{ display: 'flex', gap: '15px', marginTop: '20px' }}>
              <a href="https://www.facebook.com/share/17uqoJknqJ/" target="_blank" rel="noreferrer" style={socialButtonStyle('fb')} onMouseEnter={() => setHoveredLink('fb')} onMouseLeave={() => setHoveredLink(null)}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.21c0-.837.398-1.79 1.142-1.79h2.858v-4h-3.83c-4.1 0-5.17 3.012-5.17 4.79v3.21z"/></svg>
              </a>
              <a href="https://www.instagram.com/helpglow_foundation?igsh=MXFnZWJqaXh3NXB1MA==" target="_blank" rel="noreferrer" style={socialButtonStyle('ig')} onMouseEnter={() => setHoveredLink('ig')} onMouseLeave={() => setHoveredLink(null)}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
            </div>
          </div>

          {/* Animated Links */}
          <div>
            <h4 style={{ borderBottom: '2px solid #bae6fd', display: 'inline-block', paddingBottom: '5px', marginBottom: '20px' }}>Ways to Help</h4>
            <ul style={{ listStyle: 'none', padding: 0, fontSize: '14px', lineHeight: '2.5' }}>
              {['Monthly Giving', 'Corporate Partner', 'Volunteer'].map((text, index) => (
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
            <h4 style={{ borderBottom: '2px solid #bae6fd', display: 'inline-block', paddingBottom: '5px', marginBottom: '20px' }}>Contact Us</h4>
            <p style={{ fontSize: '14px', color: '#64748b' }}>
              📍 Kundariya Benipur Varanasi 221307<br />
              📞 +91 8528220733
            </p>
            <div style={{ marginTop: '20px', background: 'white', padding: '10px', borderRadius: '8px', borderLeft: '4px solid #0284c7', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
              <small style={{ color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px' }}>PAN Number</small>
              <strong style={{ display: 'block', color: '#334155' }}>AAICH0091A</strong>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #e2e8f0', marginTop: '50px', paddingTop: '25px', textAlign: 'center', fontSize: '13px', color: '#94a3b8' }}>
          <p>© 2026 HelpGlow Foundation. <a href="#privacy" style={{ color: '#0284c7', textDecoration: 'none' }}>Privacy Policy</a></p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;