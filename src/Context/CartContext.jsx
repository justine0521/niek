import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Calculate cart count based on unique items (unique product IDs)
  useEffect(() => {
    const uniqueItemCount = new Set(cartItems.map(item => item._id)).size;
    setCartCount(uniqueItemCount);
  }, [cartItems]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item._id === product._id);

    if (existingItem) {
      // If item already exists, do nothing (or handle as needed)
      return;
    } else {
      // If item doesn't exist, add it to cartItems
      setCartItems([...cartItems, product]);
    }
  };

  const removeFromCart = (productId) => {
    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);
  };

  const updateCartItem = async (productId, updatedFields) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.patch(`http://localhost:3003/cart/${productId}`, updatedFields, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Assuming the API returns updated cart item, you can update state accordingly
      const updatedItem = response.data;
      const updatedCartItems = cartItems.map(item =>
        item._id === updatedItem._id ? updatedItem : item
      );
      setCartItems(updatedCartItems);
    } catch (error) {
      console.error('Error updating item in cart:', error);
    }
  };

  const removeItemsFromCart = () => {
    setCartItems([]);
  };

  const values = {
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateCartItem,
    removeItemsFromCart,
    cartCount
  };

  return (
    <CartContext.Provider value={values}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
