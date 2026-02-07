import api from "@/lib/axios";

export const getOffers = async () => {
  const { data } = await api.get("/offers");
  return data;
};
