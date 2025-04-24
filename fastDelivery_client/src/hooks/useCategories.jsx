import { useQuery } from "@tanstack/react-query";
import { fetchCategories, getProducts } from "../api/api";

export const useCategories = () =>
  useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
    staleTime: 1000 * 60 * 60 * 24,
  });
