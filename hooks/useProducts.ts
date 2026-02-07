import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/services/productService";

export const useProducts = () => {
  const productsQuery = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return {
    products: productsQuery.data,
    isLoading: productsQuery.isLoading,
  };
};
