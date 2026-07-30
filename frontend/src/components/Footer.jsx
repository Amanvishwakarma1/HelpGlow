import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="footer-section">
      <div className="wrapper-1200px footer-flex">
        <div className="footer-left-container">
          <Link to="/" aria-current="page" className="brand-link-block margin-bottom-20px w-nav-brand w--current" style={{ display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            <img src="/logo.jpg" loading="lazy" alt="HelpGlow Logo" className="brand-icon" style={{ width: '36px', height: '36px', borderRadius: '50%' }} />
            <span style={{ fontSize: '24px', fontWeight: '800', fontFamily: 'var(--heading)' }}>HelpGlow</span>
          </Link>
          <div className="text-block-16px-light" style={{ marginBottom: '20px' }}>
            Restoring hope through community projects and sustainable change.
          </div>
          <div className="social-icon-conainer" style={{ display: 'flex', gap: '12px' }}>
            <a href="https://www.facebook.com/share/17uqoJknqJ/" target="_blank" rel="noreferrer" className="social-icon-wrapper w-inline-block">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-2.21c0-.837.398-1.79 1.142-1.79h2.858v-4h-3.83c-4.1 0-5.17 3.012-5.17 4.79v3.21z"/></svg>
            </a>
            <a href="https://www.instagram.com/helpglow_official?igsh=MWNsdW81M25mM3NqeQ==" target="_blank" rel="noreferrer" className="social-icon-wrapper w-inline-block">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
            </a>
          </div>
        </div>
        <div className="footer-right-container">
          <div className="w-layout-grid footer-grid">
            <div className="footer-sub-container">
              <div className="footer-main-text">Ways to Help</div>
              <div className="w-layout-grid footer-sub-grid">
                <a href="#monthly-giving" className="footer-text-link">Monthly Giving</a>
                <a href="#corporate-partner" className="footer-text-link">Corporate Partner</a>
                <a href="#volunteer" className="footer-text-link">Volunteer</a>
                <Link to="/causes" className="footer-text-link">Our Causes</Link>
              </div>
            </div>
            <div className="footer-sub-container">
              <div className="footer-main-text">Contact Us</div>
              <div className="text-block-16px-light" style={{ lineHeight: '1.6' }}>
                📍 Kundariya Benipur Varanasi 221307<br />
                📞 +91 8528220733
              </div>
              <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}>
                <small style={{ color: '#0A90B5', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: '700', fontSize: '11px', display: 'block' }}>Tax Registration</small>
                <strong style={{ color: '#fff', fontSize: '13px' }}>PAN: AAICH0091A</strong>
              </div>
            </div>
            <div className="footer-sub-container">
              <div className="footer-main-text">Legal & Privacy</div>
              <div className="w-layout-grid footer-sub-grid">
                <Link to="/privacy-policy" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-text-link">Privacy Policy</Link>
                <Link to="/terms-of-service" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="footer-text-link">Terms of Service</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="wrapper-1200px footer-down-flex">
        <div className="footer-down">
          <div className="footer-down-text">
            <div className="text-block _16-px">
              © 2026 HelpGlow Foundation. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
