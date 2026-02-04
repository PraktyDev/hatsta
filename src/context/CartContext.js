"use client"

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from local storage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartItem");
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // Save cart to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItem", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Generate a unique cart ID based on product ID and size
    const cartId = `${product._id}-${product.size}`;
    const productWithCartId = { ...product, cartId };

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.cartId === cartId);
      if (existingItem) {
        return prevItems.map((item) =>
          item.cartId === cartId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...productWithCartId, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (cartId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.cartId !== cartId)
    );
  };
  
  const decreaseQuantity = (cartId) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.cartId === cartId);
      if(existingItem && existingItem.quantity === 1){
        return prevItems.filter((item) => item.cartId !== cartId);
      }
      return prevItems.map((item) =>
        item.cartId === cartId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      );
    });
  }

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.amount * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
