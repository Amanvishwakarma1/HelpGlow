import React, { createContext, useState, useEffect } from 'react';
import { getMinQty, isSingleEntity } from '../config/products';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('helpglow_cart');
      return savedCart ? JSON.parse(savedCart) : [];
    } catch (e) {
      console.error("Error reading cart from localStorage", e);
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [checkoutDetails, setCheckoutDetails] = useState({
    userName: '',
    whatsapp: '',
    email: '',
    printName: '',
    kidsWishing: '',
    videoDate: '',
    photoNeeded: 'No',
    selectedImage: null,
    paymentScreenshot: null
  });

  useEffect(() => {
    localStorage.setItem('helpglow_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, qty) => {
    // If user didn't specify quantity, use its default minimum
    const initialQty = qty || (isSingleEntity(product) ? 1 : getMinQty(product.price));

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.product.id === product.id);
      if (existingItem) {
        // Just keep the existing item or add quantity, but ensure it meets minimum
        const newQty = existingItem.quantity + initialQty;
        return prevItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: newQty }
            : item
        );
      }
      return [...prevItems, { id: product.id, product, quantity: initialQty }];
    });
  };

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.product.id !== productId));
  };

  const updateQuantity = (productId, newQty) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.product.id === productId) {
          const minAllowed = isSingleEntity(item.product) ? 1 : getMinQty(item.product.price);
          const finalQty = Math.max(minAllowed, newQty);
          return { ...item, quantity: finalQty };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        setIsCartOpen,
        checkoutDetails,
        setCheckoutDetails,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
