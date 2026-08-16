import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMinQty, isSingleEntity } from '../config/product';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('helpglow_cart');
      if (!savedCart) return [];
      const parsed = JSON.parse(savedCart);
      if (!Array.isArray(parsed)) return [];
      return parsed.filter(item => item && typeof item === 'object' && item.id != null);
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('helpglow_cart', JSON.stringify(cart));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }, [cart]);

  const getItemKey = (item) => {
    if (!item) return '';
    return item.cartItemId || (item.unit ? `${item.id}_${item.unit}` : item.id);
  };

  const addToCart = (product) => {
    if (!product || product.id == null) return;
    setCart((prevCart) => {
      const safePrevCart = Array.isArray(prevCart) ? prevCart.filter(Boolean) : [];
      const itemKey = getItemKey(product);
      const existingItem = safePrevCart.find((item) => getItemKey(item) === itemKey);
      const isSingle = isSingleEntity(product);
      const minQty = isSingle ? 1 : getMinQty(product.price || 0);

      if (existingItem) {
        return safePrevCart.map((item) =>
          getItemKey(item) === itemKey
            ? { ...item, qty: (item.qty || 1) + 1 }
            : item
        );
      } else {
        return [...safePrevCart, { ...product, cartItemId: itemKey, qty: minQty, minQty }];
      }
    });
  };

  const updateQty = (productIdOrKey, newQty) => {
    setCart((prevCart) => {
      const safePrevCart = Array.isArray(prevCart) ? prevCart.filter(Boolean) : [];
      return safePrevCart.map((item) => {
        const itemKey = getItemKey(item);
        if (itemKey === productIdOrKey || item.id === productIdOrKey) {
          const isSingle = isSingleEntity(item);
          const minQty = isSingle ? 1 : getMinQty(item.price || 0);
          const validQty = Math.max(minQty, newQty || 1);
          return { ...item, qty: validQty };
        }
        return item;
      });
    });
  };

  const removeFromCart = (productIdOrKey) => {
    setCart((prevCart) => {
      const safePrevCart = Array.isArray(prevCart) ? prevCart.filter(Boolean) : [];
      return safePrevCart.filter((item) => getItemKey(item) !== productIdOrKey && item.id !== productIdOrKey);
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  const safeCart = Array.isArray(cart) ? cart.filter(Boolean) : [];
  const totalItemsCount = safeCart.reduce((total, item) => total + (Number(item?.qty) || 0), 0);
  const cartTotal = safeCart.reduce((total, item) => total + ((Number(item?.price) || 0) * (Number(item?.qty) || 0)), 0);

  return (
    <CartContext.Provider value={{
      cart: safeCart,
      addToCart,
      updateQty,
      removeFromCart,
      clearCart,
      totalItemsCount,
      cartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};
