import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "cbe-cart";
const MAX_ITEMS = 20;

export function CartProvider({ children }) {
  // Load whatever was in the cart last time this browser visited
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Save on every change so a refresh doesn't empty the cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // storage full or blocked — cart still works for this session
    }
  }, [items]);

  const addItem = (product, quantity = 1) => {
    let status = "added";

    setItems((current) => {
      const existing = current.find((i) => i.id === product.id);

      if (existing) {
        return current.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }

      if (current.length >= MAX_ITEMS) {
        status = "full";
        return current;
      }

      return [
        ...current,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          image: (product.media_urls && product.media_urls[0]) || product.media_url || "",
          quantity,
        },
      ];
    });

    return status;
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((i) => i.id !== id));
  };

  const setQuantity = (id, quantity) => {
    if (quantity < 1) return removeItem(id);
    setItems((current) =>
      current.map((i) => (i.id === id ? { ...i, quantity } : i))
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + Number(i.price || 0) * i.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, setQuantity, clearCart, totalItems, totalPrice, MAX_ITEMS }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used inside CartProvider");
  return context;
}