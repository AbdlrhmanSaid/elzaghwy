"use client";

import { create } from "zustand";
import { CartItem } from "@/lib/types";
import {
  getCart,
  saveCart,
  addToCart as addToCartLS,
  removeFromCart as removeFromCartLS,
  updateCartItemQuantity as updateCartItemQuantityLS,
  clearCart as clearCartLS,
} from "@/lib/localStorage";

interface CartStore {
  cart: CartItem[];
  isLoaded: boolean;
  loadCart: () => void;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string, type: "product" | "offer") => void;
  updateQuantity: (
    productId: string,
    type: "product" | "offer",
    quantity: number,
  ) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  cart: [],
  isLoaded: false,

  loadCart: () => {
    const cart = getCart();
    set({ cart, isLoaded: true });
  },

  addItem: (item) => {
    addToCartLS(item);
    set({ cart: getCart() });
  },

  removeItem: (productId, type) => {
    removeFromCartLS(productId, type);
    set({ cart: getCart() });
  },

  updateQuantity: (productId, type, quantity) => {
    if (quantity <= 0) {
      get().removeItem(productId, type);
    } else {
      updateCartItemQuantityLS(productId, type, quantity);
      set({ cart: getCart() });
    }
  },

  clearCart: () => {
    clearCartLS();
    set({ cart: [] });
  },

  getTotal: () => {
    const { cart } = get();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  },

  getItemCount: () => {
    const { cart } = get();
    return cart.reduce((count, item) => count + item.quantity, 0);
  },
}));
