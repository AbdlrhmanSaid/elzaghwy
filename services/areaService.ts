import api from "@/lib/axios";

export const getAreas = async () => {
  const { data } = await api.get("/areas");
  return data;
};

