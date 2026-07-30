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

  const getItemKey = (item) => item.cartItemId || (item.unit ? `${item.id}_${item.unit}` : item.id);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemKey = getItemKey(product);
      const existingItem = prevCart.find((item) => getItemKey(item) === itemKey);
      const isSingle = isSingleEntity(product);
      const minQty = isSingle ? 1 : getMinQty(product.price);

      if (existingItem) {
        return prevCart.map((item) =>
          getItemKey(item) === itemKey
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, cartItemId: itemKey, qty: minQty, minQty }];
      }
    });
  };

  const updateQty = (productIdOrKey, newQty) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        const itemKey = getItemKey(item);
        if (itemKey === productIdOrKey || item.id === productIdOrKey) {
          const isSingle = isSingleEntity(item);
          const minQty = isSingle ? 1 : getMinQty(item.price);
          const validQty = Math.max(minQty, newQty);
          return { ...item, qty: validQty };
        }
        return item;
      })
    );
  };

  const removeFromCart = (productIdOrKey) => {
    setCart((prevCart) => prevCart.filter((item) => getItemKey(item) !== productIdOrKey && item.id !== productIdOrKey));
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
