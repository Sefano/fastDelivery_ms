import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "./axios";
import { useProducts } from "../hooks/useProducts";

export const useCart = () => {
  const queryClient = useQueryClient();

  const { data: products, status: productStatus } = useProducts();

  const { data, error, isLoading, isSuccess, status } = useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Токен отсутствует");
      }

      const response = await api.get("http://localhost:4003/cart");

      if (response.data?.message === "Нет корзины") {
        const cart = {
          cart: [],
          cartAmount: 0,
        };
        return cart;
      }

      const cart = response.data;

      console.log(response.data);

      //Логика для взятия изображений из кеша продуктов (заменена логикой на бекенде)

      // const displayCart = cart.cart.map((item) => {
      //   console.log(item);
      //   const productInCache = products?.find((p) => p._id === item.product.id);
      //   console.log(productInCache);

      //   return {
      //     ...item,
      //     product: {
      //       ...item.product,
      //       imageUrl: productInCache?.imageUrl || null,
      //     },
      //   };
      // });

      // const cartToDisplay = { ...cart, cart: displayCart };
      // console.log(cartToDisplay);
      return cart;
    },

    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });

  return { cart: data, isError: !!error, isLoading, isSuccess, status };
};
