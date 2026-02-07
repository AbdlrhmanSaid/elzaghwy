import { useQuery } from "@tanstack/react-query";
import { getAreas } from "@/services/areaService";

export const useAreas = () => {
  const areasQuery = useQuery({ queryKey: ["areas"], queryFn: getAreas });

  return {
    areas: areasQuery.data,
    isLoading: areasQuery.isLoading,
  };
};
