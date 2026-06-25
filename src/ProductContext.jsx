import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export function useStore() {
  return useContext(ProductContext);
}

export function ProductProvider({ children }) {
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // ✅ ADD TO CART
  function addToCart(product) {
    setCart(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  }

  // ✅ REMOVE ITEM
  function removeFromCart(productId) {
    setCart(prev => prev.filter(item => item.id !== productId));
  }

  // ✅ INCREASE QTY
  function increaseQty(id) {
    setCart(prev =>
      prev.map(item =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  // ✅ DECREASE QTY
  function decreaseQty(id) {
    setCart(prev =>
      prev
        .map(item =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter(item => item.qty > 0)
    );
  }

  // ✅ CART COUNT
  function cartCount() {
    return cart.reduce((sum, item) => sum + item.qty, 0);
  }

  // ❌ IMPORTANT FIX: return NUMBER (not string)
  function cartTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  const value = {
    cart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    cartCount,
    cartTotal,
    isLoggedIn,
    setIsLoggedIn,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
}