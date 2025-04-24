import api from "./axios";

export const addToCart = async ({
  action,
  productId,
  name,
  price,
  image,
  unit,
}) => {
  const response = await api.put("http://localhost:4003/cart", {
    action,
    productId,
    name,
    price,
    image,
    unit,
  });

  return response.data;
};

export const removeFromCart = async ({ action, productId, unit, price }) => {
  const response = await api.put("http://localhost:4003/cart", {
    action,
    productId,
    unit,
    price,
  });

  return response.data;
};

export const clearCart = async ({ action }) => {
  const response = await api.put("http://localhost:4003/cart", {
    action,
  });

  return response.data;
};
