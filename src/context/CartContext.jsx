"use client";
import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("chameleon_cart");
    if (savedCart) setCart(JSON.parse(savedCart));
  }, []);

  useEffect(() => {
    localStorage.setItem("chameleon_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, quantity, size, isB2B, currentPrice) => {
    const cartItemId = `${product.id}-${isB2B ? "B2B" : "B2C"}-${size}`;

    setCart((prev) => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);

      if (existingIndex > -1) {
        const newCart = [...prev];
        if (isB2B) {
          newCart[existingIndex].quantity = quantity;
          newCart[existingIndex].price = currentPrice;
        } else {
          newCart[existingIndex].quantity += quantity;
        }
        return newCart;
      }

      return [...prev, {
        cartItemId,
        id: product.id,
        name: product.name,
        price: currentPrice,
        quantity,
        size,
        image: product.base_image,
        type: isB2B ? "B2B" : "B2C",
        slug: product.slug
      }];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };
  const cartCount = cart.length; 

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, cartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);