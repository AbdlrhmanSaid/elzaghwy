// دوال للتعامل مع Local Storage

import { CartItem, CustomerInfo } from "./types";

// السلة
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  const cart = localStorage.getItem("elzaghwy_cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("elzaghwy_cart", JSON.stringify(cart));
}

export function addToCart(item: CartItem): void {
  const cart = getCart();
  const existingItem = cart.find(
    (i) => i.productId === item.productId && i.type === item.type,
  );

  if (existingItem) {
    existingItem.quantity += item.quantity;
  } else {
    cart.push(item);
  }

  saveCart(cart);
}

export function removeFromCart(
  productId: string,
  type: "product" | "offer",
): void {
  const cart = getCart();
  const updatedCart = cart.filter(
    (item) => !(item.productId === productId && item.type === type),
  );
  saveCart(updatedCart);
}

export function updateCartItemQuantity(
  productId: string,
  type: "product" | "offer",
  quantity: number,
): void {
  const cart = getCart();
  const item = cart.find((i) => i.productId === productId && i.type === type);

  if (item) {
    item.quantity = quantity;
    saveCart(cart);
  }
}

export function clearCart(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("elzaghwy_cart");
}

// معلومات العميل
export function getCustomerInfo(): CustomerInfo | null {
  if (typeof window === "undefined") return null;
  const info = localStorage.getItem("elzaghwy_customer");
  return info ? JSON.parse(info) : null;
}

export function saveCustomerInfo(info: CustomerInfo): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("elzaghwy_customer", JSON.stringify(info));
}

// الطلبات السابقة
export function getPreviousOrders(): string[] {
  if (typeof window === "undefined") return [];
  const orders = localStorage.getItem("elzaghwy_orders");
  return orders ? JSON.parse(orders) : [];
}

export function addOrderNumber(orderNumber: string): void {
  if (typeof window === "undefined") return;
  const orders = getPreviousOrders();
  if (!orders.includes(orderNumber)) {
    orders.unshift(orderNumber);
    // احتفظ بآخر 10 طلبات فقط
    if (orders.length > 10) {
      orders.pop();
    }
    localStorage.setItem("elzaghwy_orders", JSON.stringify(orders));
  }
}
