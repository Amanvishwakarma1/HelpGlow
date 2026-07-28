import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, LogOut, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Header = () => {
  const { cart } = useCart();
  const { user, isLoggedIn, logout } = useAuth();
  const cartItemCount = cart.length;

  return (
    <div 
      style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 100 }}
      data-animation="default" data-collapse="medium" data-duration="400" data-easing="ease" data-easing2="ease" role="banner" className="navbar w-nav"
    >
      <div className="wrapper-1200px navbar-wrapper">
        {/* Logo linking back to the Home page */}
        <Link 
          to="/" 
          className="brand-link-block w-nav-brand" 
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            textDecoration: 'none', 
            padding: '4px 0',
            transition: 'transform 0.2s ease'
          }}
        >
          <motion.img 
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ type: "spring", stiffness: 300 }}
            src="/logo.jpg" 
            loading="lazy" 
            alt="HelpGlow Logo" 
            style={{ 
              width: '48px', 
              height: '48px', 
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
              fontSize: '28px',
              lineHeight: '1',
              letterSpacing: '-0.5px',
              whiteSpace: 'nowrap',
              display: 'inline-flex',
              alignItems: 'center'
            }}
          >
            <span style={{ color: '#FFFFFF', textShadow: '0 2px 10px rgba(0, 0, 0, 0.6)' }}>Help</span><span 
              style={{ 
                background: 'linear-gradient(90deg, #0A90B5 0%, #D95B28 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >Glow</span>
          </motion.span>
        </Link>

        {/* Navigation links */}
        <nav role="navigation" className="nav-menu w-nav-menu" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/" className="nav-link w-nav-link">Home</Link>
          <Link to="/about" className="nav-link w-nav-link">About us</Link>
          <Link to="/causes" className="nav-link w-nav-link">Causes</Link>
          <Link to="/menu" className="nav-link w-nav-link">Menu</Link>
          {(isLoggedIn && (user?.role === 'admin' || user?.email === 'admin@helpglow.org')) && (
            <Link to="/admin" className="nav-link w-nav-link" style={{ color: '#D95B28', fontWeight: 800 }}>Admin Panel</Link>
          )}
          <Link to="/cart" className="nav-link w-nav-link" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
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

        {/* User Auth Profile / Login Button */}
        {isLoggedIn && user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: 'rgba(255, 255, 255, 0.1)', padding: '6px 14px', borderRadius: '50px', border: '1px solid rgba(255, 255, 255, 0.2)' }}>
              <img 
                src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.username || user.name || user.email || 'User')}`} 
                alt={user.username || user.name || 'User'} 
                style={{ width: '26px', height: '26px', borderRadius: '50%' }} 
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
          <Link to="/login" className="primary-button white-hover-state w-button">Login</Link>
        )}
        
        <div className="menu-button w-nav-button">
          <div className="w-icon-nav-menu"></div>
        </div>
      </div>
    </div>
  );
};

export default Header;
