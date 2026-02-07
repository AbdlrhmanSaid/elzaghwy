import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getOrders, createOrder } from "@/services/orderService";
import toast from "react-hot-toast";

export const useOrders = () => {
  const queryClient = useQueryClient();

  const ordersQuery = useQuery({ queryKey: ["orders"], queryFn: getOrders });

  const createMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      toast.success(data.message || "تم تسجيل طلبك بنجاح");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "حدث خطأ أثناء تنفيذ الطلب");
    },
  });

  return {
    orders: ordersQuery.data,
    isLoading: ordersQuery.isLoading,
    createOrder: createMutation.mutateAsync,
    isCreating: createMutation.isLoading,
  };
};
