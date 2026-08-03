import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, LogOut, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const cartItemCount = cart.length;

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);
  const closeMobileNav = () => setMobileNavOpen(false);

  return (
    <header 
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}
      className="navbar w-nav"
    >
      <div className="wrapper-1200px navbar-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 20px' }}>
        {/* Brand Logo */}
        <Link 
          to="/" 
          onClick={closeMobileNav}
          className="brand-link-block w-nav-brand" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px', 
            textDecoration: 'none', 
            padding: '4px 0'
          }}
        >
          <motion.img 
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/logo.jpg" 
            loading="lazy" 
            alt="HelpGlow Logo" 
            style={{ 
              width: '44px', 
              height: '44px', 
              objectFit: 'contain',
              borderRadius: '50%',
              boxShadow: '0 0 12px rgba(10, 144, 181, 0.4)',
              border: '2px solid rgba(10, 144, 181, 0.3)'
            }}
          />
          <motion.span
            whileHover={{ scale: 1.05 }}
            style={{
              fontFamily: 'var(--heading)',
              fontWeight: 800,
              fontSize: '26px',
              lineHeight: '1',
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)' }}>Help</span>
            <span 
              style={{ 
                background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Glow</span>
          </motion.span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav role="navigation" className="desktop-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '22px', flexWrap: 'nowrap', whiteSpace: 'nowrap' }}>
          <Link to="/" className="nav-link w-nav-link" style={{ whiteSpace: 'nowrap' }}>Home</Link>
          <Link to="/about" className="nav-link w-nav-link" style={{ whiteSpace: 'nowrap' }}>About us</Link>
          <Link to="/causes" className="nav-link w-nav-link" style={{ whiteSpace: 'nowrap' }}>Causes</Link>
          <Link to="/menu" className="nav-link w-nav-link" style={{ whiteSpace: 'nowrap' }}>Menu</Link>
          {(isLoggedIn && (user?.role === 'admin' || user?.email === 'admin@helpglow.org')) && (
            <Link to="/admin" className="nav-link w-nav-link" style={{ color: '#D95B28', fontWeight: 800, whiteSpace: 'nowrap' }}>Admin Panel</Link>
          )}
          <Link to="/cart" className="nav-link w-nav-link" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}>
            <ShoppingBag size={18} color="#0A90B5" />
            Cart
            {cartItemCount > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                style={{ 
                  background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)', 
                  color: '#FFFFFF', 
                  fontSize: '11px', 
                  fontWeight: 800, 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%', 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 0 8px rgba(10, 144, 181, 0.6)'
                }}
              >
                {cartItemCount}
              </motion.span>
            )}
          </Link>
        </nav>

        {/* Desktop Auth Section */}
        <div className="desktop-auth-section" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {isLoggedIn && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username || user.name || user.email || 'User')}`} 
                  alt={user.username || user.name || 'User'} 
                  style={{ width: '24px', height: '24px', borderRadius: '50%' }} 
                />
                <span style={{ color: '#FFFFFF', fontSize: '13px', fontWeight: 700 }}>
                  {(user.username || user.name || user.email || 'User').split(' ')[0]}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                title="Logout"
                style={{
                  backgroundColor: 'rgba(239, 68, 68, 0.15)',
                  color: '#EF4444',
                  border: '1px solid rgba(239, 68, 68, 0.3)',
                  padding: '8px 14px',
                  borderRadius: '50px',
                  fontSize: '12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="primary-button white-hover-state w-button" style={{ padding: '10px 22px', fontSize: '14px' }}>Login</Link>
          )}
        </div>

        {/* Mobile Hamburger Menu Toggle Button */}
        <button
          type="button"
          onClick={toggleMobileNav}
          className="mobile-menu-toggle"
          aria-label="Toggle navigation menu"
          style={{
            display: 'none',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            color: '#FFFFFF',
            borderRadius: '10px',
            padding: '8px',
            cursor: 'pointer',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {mobileNavOpen ? <CloseIcon size={24} color="#0A90B5" /> : <MenuIcon size={24} color="#FFFFFF" />}
        </button>
      </div>

      {/* Mobile Slide-Down Navigation Drawer */}
      <AnimatePresence>
        {mobileNavOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="mobile-nav-drawer"
            style={{
              backgroundColor: '#16203A',
              borderBottom: '1px solid rgba(10, 144, 181, 0.3)',
              padding: '20px 24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              overflow: 'hidden'
            }}
          >
            <Link to="/" onClick={closeMobileNav} style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Home</Link>
            <Link to="/about" onClick={closeMobileNav} style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>About us</Link>
            <Link to="/causes" onClick={closeMobileNav} style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Causes</Link>
            <Link to="/menu" onClick={closeMobileNav} style={{ color: '#FFFFFF', fontSize: '16px', fontWeight: 700, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Menu</Link>
            {(isLoggedIn && (user?.role === 'admin' || user?.email === 'admin@helpglow.org')) && (
              <Link to="/admin" onClick={closeMobileNav} style={{ color: '#D95B28', fontSize: '16px', fontWeight: 800, textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>Admin Panel</Link>
            )}
            <Link to="/cart" onClick={closeMobileNav} style={{ color: '#0A90B5', fontSize: '16px', fontWeight: 800, textDecoration: 'none', padding: '8px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ShoppingBag size={18} color="#0A90B5" />
              Sponsorship Cart ({cartItemCount})
            </Link>

            {isLoggedIn && user ? (
              <div style={{ paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ color: '#FFFFFF', fontSize: '14px', fontWeight: 700 }}>
                  Logged in as {user.username || user.name || user.email}
                </span>
                <button
                  type="button"
                  onClick={() => { logout(); closeMobileNav(); }}
                  style={{ backgroundColor: 'rgba(239, 68, 68, 0.2)', color: '#EF4444', border: 'none', padding: '8px 16px', borderRadius: '50px', fontWeight: 700, fontSize: '13px' }}
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link to="/login" onClick={closeMobileNav} className="primary-button w-button" style={{ textAlign: 'center', width: '100%', marginTop: '8px' }}>Login</Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
