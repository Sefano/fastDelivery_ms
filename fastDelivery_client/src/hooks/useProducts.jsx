import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/api";

export const useProducts = () =>
  useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 60 * 24,
  });
