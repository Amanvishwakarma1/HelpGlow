import React, { createContext, useContext, useState, useEffect } from 'react';
import { getMinQty, isSingleEntity } from '../config/product';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem('helpglow_cart');
      return savedCart ? JSON.parse(savedCart) : [];
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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      const isSingle = isSingleEntity(product);
      const minQty = isSingle ? 1 : getMinQty(product.price);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, qty: minQty, minQty }];
      }
    });
  };

  const updateQty = (productId, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const isSingle = isSingleEntity(item);
          const minQty = isSingle ? 1 : getMinQty(item.price);
          const validQty = Math.max(minQty, newQty);
          return { ...item, qty: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalItemsCount = cart.reduce((total, item) => total + item.qty, 0);
  
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.qty), 0);

  return (
    <CartContext.Provider value={{
      cart,
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
