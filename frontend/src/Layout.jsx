import React, { useContext } from 'react';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import CartDrawer from './components/Cart/CartDrawer';
import { CartContext } from './context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

function Layout() {
  const { cartItems, setIsCartOpen, isCartOpen } = useContext(CartContext);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // Brand Colors
  const colors = {
    magenta: '#8e2382',
    pink: '#e61e6e',
    gold: '#d4af37'
  };

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Header />
      <Outlet />
      <Footer />
      
      {/* Global Cart Drawer Component */}
      <CartDrawer />

      {/* Floating Cart Button */}
      <AnimatePresence>
        {!isCartOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1, boxShadow: `0 12px 35px rgba(230, 30, 110, 0.5)` }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsCartOpen(true)}
            style={{
              position: 'fixed',
              bottom: '25px',
              right: '25px',
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: `linear-gradient(135deg, ${colors.magenta} 0%, ${colors.pink} 100%)`,
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 8px 30px rgba(230, 30, 110, 0.4)`,
              zIndex: 990,
              outline: 'none',
            }}
          >
            <ShoppingCart size={26} />
            
            {/* Cart Count Badge */}
            {totalItems > 0 && (
              <motion.span
                key={totalItems}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                style={{
                  position: 'absolute',
                  top: '-5px',
                  right: '-5px',
                  backgroundColor: colors.gold,
                  color: '#1a051d',
                  borderRadius: '50%',
                  minWidth: '22px',
                  height: '22px',
                  fontSize: '11px',
                  fontWeight: '900',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid #fff',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                  padding: '0 4px',
                  boxSizing: 'border-box'
                }}
              >
                {totalItems}
              </motion.span>
            )}
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}

export default Layout;

