"use client";

import { useState, useEffect } from "react";
import { useToast } from "@/context/ToastContext";

export interface CartItem {
  id: string;
  name: string;
  price: string;
  priceVal: number;
  image: string;
  size: string;
  quantity: number;
}

export function useCart() {
  const { success: showSuccessToast } = useToast();
  const [mounted, setMounted] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setMounted(true);
    const existing = localStorage.getItem("cart");
    if (existing) {
      try {
        setCartItems(JSON.parse(existing));
      } catch (e) {
        setCartItems([]);
      }
    }
  }, []);

  const saveCart = (items: CartItem[]) => {
    setCartItems(items);
    localStorage.setItem("cart", JSON.stringify(items));
    window.dispatchEvent(new Event("cart-updated"));
  };

  const handleQtyChange = (id: string, size: string, change: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id && item.size === size) {
        const newQty = Math.max(1, item.quantity + change);
        return { ...item, quantity: newQty };
      }
      return item;
    });
    saveCart(updated);
  };

  const handleSizeChange = (id: string, oldSize: string, newSize: string) => {
    const existingIndex = cartItems.findIndex((item) => item.id === id && item.size === newSize);

    let updated: CartItem[];
    if (existingIndex > -1 && oldSize !== newSize) {
      updated = cartItems.reduce((acc: CartItem[], item) => {
        if (item.id === id && item.size === oldSize) {
          acc[existingIndex].quantity += item.quantity;
          return acc;
        }
        acc.push(item);
        return acc;
      }, []);
    } else {
      updated = cartItems.map((item) => {
        if (item.id === id && item.size === oldSize) {
          return { ...item, size: newSize };
        }
        return item;
      });
    }
    saveCart(updated);
  };

  const handleRemoveItem = (id: string, size: string) => {
    const filtered = cartItems.filter((item) => !(item.id === id && item.size === size));
    saveCart(filtered);
    showSuccessToast("Đã xóa sản phẩm khỏi giỏ hàng!");
  };

  const handleClearAll = () => {
    if (window.confirm("Bạn có chắc chắn muốn xóa toàn bộ giỏ hàng?")) {
      saveCart([]);
      showSuccessToast("Đã làm sạch giỏ hàng!");
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.priceVal * item.quantity, 0);
  const shippingFee = subtotal >= 500000 || subtotal === 0 ? 0 : 30000;
  const total = subtotal + shippingFee;

  return {
    mounted,
    cartItems,
    subtotal,
    shippingFee,
    total,
    handleQtyChange,
    handleSizeChange,
    handleRemoveItem,
    handleClearAll,
    clearCartOnCheckoutSuccess: () => saveCart([])
  };
}
