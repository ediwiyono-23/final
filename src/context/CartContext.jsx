
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import { API_URL } from "../services/api";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const syncStock = () => {
    window.dispatchEvent(new Event("stock-updated"));
  };

  const updateStock = async (id, newStock) => {
    await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ stock: newStock }),
    });
  };

  const addToCart = async (product) => {
    if (product.stock <= 0) {
      alert("⚠️ Stok habis");
      return;
    }

    const newStock = product.stock - 1;
    await updateStock(product.id, newStock);

    setCart((prev) => {
      const exist = prev.find((i) => i.id === product.id);
      if (exist) {
        return prev.map((i) =>
          i.id === product.id
            ? { ...i, qty: i.qty + 1, stock: newStock }
            : i
        );
      }
      return [...prev, { ...product, qty: 1, stock: newStock }];
    });

    syncStock();
  };

  const increaseQty = async (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item || item.stock <= 0) {
      alert("⚠️ Stok tidak mencukupi");
      return;
    }

    const newStock = item.stock - 1;
    await updateStock(id, newStock);

    setCart((prev) =>
      prev.map((i) =>
        i.id === id
          ? { ...i, qty: i.qty + 1, stock: newStock }
          : i
      )
    );

    syncStock();
  };

  const decreaseQty = async (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const newStock = item.stock + 1;
    await updateStock(id, newStock);

    setCart((prev) =>
      prev
        .map((i) =>
          i.id === id
            ? { ...i, qty: i.qty - 1, stock: newStock }
            : i
        )
        .filter((i) => i.qty > 0)
    );

    syncStock();
  };

  const removeFromCart = async (id) => {
    const item = cart.find((i) => i.id === id);
    if (!item) return;

    const restoredStock = item.stock + item.qty;
    await updateStock(id, restoredStock);

    setCart((prev) => prev.filter((i) => i.id !== id));

    syncStock();
  };

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalPrice = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeFromCart,
        totalQty,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);