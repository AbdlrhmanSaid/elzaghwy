// دوال للتواصل مع الباك إند

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// المنتجات
export async function getProducts() {
  const response = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("فشل في جلب المنتجات");
  return response.json();
}

export async function getProduct(id: string) {
  const response = await fetch(`${API_URL}/products/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("فشل في جلب المنتج");
  return response.json();
}

// العروض
export async function getOffers() {
  const response = await fetch(`${API_URL}/offers`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("فشل في جلب العروض");
  return response.json();
}

export async function getOffer(id: string) {
  const response = await fetch(`${API_URL}/offers/${id}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("فشل في جلب العرض");
  return response.json();
}

// المناطق
export async function getAreas() {
  const response = await fetch(`${API_URL}/areas`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("فشل في جلب المناطق");
  return response.json();
}

// الطلبات
export async function createOrder(orderData: any) {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(orderData),
    cache: "no-store", // تعطيل الـ cache
  });
  if (!response.ok) throw new Error("فشل في إنشاء الطلب");
  return response.json();
}

export async function getOrder(orderNumber: string) {
  const response = await fetch(`${API_URL}/orders/track/${orderNumber}`, {
    cache: "no-store",
  });
  if (!response.ok) throw new Error("فشل في جلب الطلب");
  return response.json();
}
