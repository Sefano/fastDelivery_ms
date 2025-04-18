import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../api/cartApi";

export const useCartActions = () => {
  const queryClient = useQueryClient();

  const addToCartClient = useMutation({
    mutationFn: addToCart,
    onSuccess: async (data) => {
      console.log(data);
      queryClient.setQueryData(["cart"], data);
    },
  });
  return { addToCartClient };
};
