import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/api";

export const useProducts = (page, limit, filters, search) =>
  useQuery({
    queryKey: ["products", { page, limit, filters, search }],
    queryFn: () => getProducts(page, limit, filters, search),
    staleTime: 1000 * 60 * 10,
  });
