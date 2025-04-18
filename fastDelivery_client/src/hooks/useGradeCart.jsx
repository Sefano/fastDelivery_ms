import { useQuery } from "@tanstack/react-query";
import { useCart } from "../api/useCart";

export const useEnhancedCart = () => {
  const { data: products } = useQuery(["products"]);
  const { data: cart, ...rest } = useCart();

  const enrichedCart = useMemo(() => {
    if (!cart || !products) return null;

    return {
      ...cart,
      items: cart.cart.map((item) => {
        const product = products.find((p) => p._id === item.productId);
        return {
          ...item,
          product: {
            ...product,
            // Используем imageUrl из продуктов, если есть
            imageUrl: product?.imageUrl || generateImageUrl(item.imageKey), // Фолбек
          },
        };
      }),
    };
  }, [cart, products]);

  return { cart: enrichedCart, ...rest };
};
