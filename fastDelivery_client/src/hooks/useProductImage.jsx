import { useQuery } from "@tanstack/react-query";
import api from "../api/axios";

export const useProductImage = (name) => {
  return useQuery({
    queryKey: ["productImage", name],
    queryFn: async () => {
      const response = await api.get(`http://localhost:4002/getimage/${name}`);
      return response.data;
    },
    staleTime: Infinity,
    cacheTime: 24 * 60 * 60 * 1000,
  });
};
