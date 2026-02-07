import { useQuery } from "@tanstack/react-query";
import { getOffers } from "@/services/offerService";

export const useOffers = () => {
  const offersQuery = useQuery({ queryKey: ["offers"], queryFn: getOffers });

  return {
    offers: offersQuery.data,
    isLoading: offersQuery.isLoading,
  };
};
