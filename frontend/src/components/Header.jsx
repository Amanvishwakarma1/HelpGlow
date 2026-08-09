import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, LogOut, Menu as MenuIcon, X as CloseIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;
  const cartItemCount = cart.length;

  const toggleMobileNav = () => setMobileNavOpen(!mobileNavOpen);
  const closeMobileNav = () => setMobileNavOpen(false);

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About us' },
    { path: '/causes', label: 'Causes', altPaths: ['/campaign', '/campaigns'] },
    { path: '/menu', label: 'Menu' },
    ...(isLoggedIn && (user?.role === 'admin' || user?.email === 'admin@helpglow.org')
      ? [{ path: '/admin', label: 'Admin Panel', isAdmin: true }]
      : [])
  ];

  const isNavActive = (item) => {
    if (item.path === '/') return currentPath === '/';
    if (item.altPaths) return item.path === currentPath || item.altPaths.includes(currentPath);
    return currentPath === item.path;
  };

  return (
    <header 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        zIndex: 100, 
        backgroundColor: 'rgba(15, 23, 42, 0.72)', 
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.25)' 
      }}
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
              width: '42px', 
              height: '42px', 
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
              fontSize: '25px',
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

        {/* 🌟 GLASSMORPHISM DESKTOP NAV WITH BRAND ACTIVE TAB INDICATOR 🌟 */}
        <nav 
          role="navigation" 
          className="desktop-nav-menu" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '4px', 
            flexWrap: 'nowrap', 
            whiteSpace: 'nowrap',
            backgroundColor: 'rgba(255, 255, 255, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            padding: '4px 6px',
            borderRadius: '50px',
            boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.2)'
          }}
        >
          {navItems.map((item) => {
            const active = isNavActive(item);
            return (
              <Link
                key={item.path}
                to={item.path}
                className="nav-link w-nav-link"
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  borderRadius: '50px',
                  color: active ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                  fontWeight: active ? 800 : 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  transition: 'color 0.2s ease',
                  zIndex: 1,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px'
                }}
              >
                {active && (
                  <motion.div
                    layoutId="activeHeaderTab"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50px',
                      background: item.isAdmin
                        ? 'linear-gradient(90deg, #D95B28 0%, #E61C72 100%)'
                        : 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                      boxShadow: '0 4px 16px rgba(10, 144, 181, 0.45)',
                      zIndex: -1
                    }}
                  />
                )}
                {item.label}
              </Link>
            );
          })}

          {/* Cart Item Link */}
          {(() => {
            const isCartActive = currentPath === '/cart';
            return (
              <Link
                to="/cart"
                className="nav-link w-nav-link"
                style={{
                  position: 'relative',
                  padding: '8px 18px',
                  borderRadius: '50px',
                  color: isCartActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.8)',
                  fontWeight: isCartActive ? 800 : 600,
                  fontSize: '14px',
                  textDecoration: 'none',
                  whiteSpace: 'nowrap',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  zIndex: 1,
                  transition: 'color 0.2s ease'
                }}
              >
                {isCartActive && (
                  <motion.div
                    layoutId="activeHeaderTab"
                    transition={{
                      type: "spring",
                      stiffness: 450,
                      damping: 32
                    }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50px',
                      background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                      boxShadow: '0 4px 16px rgba(10, 144, 181, 0.45)',
                      zIndex: -1
                    }}
                  />
                )}
                <ShoppingBag size={16} color={isCartActive ? "#FFFFFF" : "#0A90B5"} />
                Cart
                {cartItemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    style={{ 
                      background: isCartActive ? '#FFFFFF' : 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)', 
                      color: isCartActive ? '#D95B28' : '#FFFFFF', 
                      fontSize: '11px', 
                      fontWeight: 900, 
                      width: '19px', 
                      height: '19px', 
                      borderRadius: '50%', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      boxShadow: '0 0 8px rgba(10, 144, 181, 0.6)',
                      marginLeft: '2px'
                    }}
                  >
                    {cartItemCount}
                  </motion.span>
                )}
              </Link>
            );
          })()}
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
              gap: '12px',
              overflow: 'hidden'
            }}
          >
            {navItems.map((item) => {
              const active = isNavActive(item);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={closeMobileNav}
                  style={{
                    color: active ? '#0A90B5' : '#FFFFFF',
                    fontSize: '16px',
                    fontWeight: active ? 800 : 700,
                    textDecoration: 'none',
                    padding: '10px 14px',
                    borderRadius: '12px',
                    backgroundColor: active ? 'rgba(10, 144, 181, 0.15)' : 'transparent',
                    borderLeft: active ? '4px solid #0A90B5' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{item.label}</span>
                  {active && <span style={{ fontSize: '12px', color: '#0A90B5', fontWeight: 800 }}>• Active</span>}
                </Link>
              );
            })}

            <Link 
              to="/cart" 
              onClick={closeMobileNav} 
              style={{ 
                color: currentPath === '/cart' ? '#D95B28' : '#0A90B5', 
                fontSize: '16px', 
                fontWeight: 800, 
                textDecoration: 'none', 
                padding: '10px 14px', 
                borderRadius: '12px',
                backgroundColor: currentPath === '/cart' ? 'rgba(217, 91, 40, 0.12)' : 'rgba(10, 144, 181, 0.08)',
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'space-between' 
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ShoppingBag size={18} color="#0A90B5" />
                Sponsorship Cart
              </div>
              <span style={{ 
                backgroundColor: '#0A90B5', 
                color: '#FFFFFF', 
                borderRadius: '50px', 
                padding: '2px 10px', 
                fontSize: '12px', 
                fontWeight: 800 
              }}>
                {cartItemCount}
              </span>
            </Link>

            {isLoggedIn && user ? (
              <div style={{ paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
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
