import { useQuery } from "@tanstack/react-query";
import { getOrders, getSingleOrder } from "../api/orderApi";

export const useSingleOrder = (orderId) =>
  useQuery({
    queryKey: ["singleOrder", { orderId }],
    queryFn: () => getSingleOrder(orderId),
    staleTime: 1000 * 60 * 10,
  });
