import api from "@/lib/axios";

export const getOrders = async () => {
  const { data } = await api.get("/orders");
  return data;
};

export const trackOrder = async (orderNumber: string) => {
  const { data } = await api.get(`/orders/track/${orderNumber}`);
  return data;
};

export const createOrder = async (orderData: any) => {
  const { data } = await api.post("/orders", orderData);
  return data;
};
