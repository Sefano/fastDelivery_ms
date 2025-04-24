import { useQuery } from "@tanstack/react-query";
import { getOrders } from "../api/orderApi";

export const useOrders = () =>
  useQuery({
    queryKey: ["orders"],
    queryFn: () => getOrders(),
    staleTime: 1000 * 60 * 10,
  });
