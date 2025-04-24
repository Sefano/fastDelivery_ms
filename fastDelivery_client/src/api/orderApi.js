import api from "./axios";

export const placeOrder = async () => {
  const response = await api.post("http://localhost:4003/order");
  return response.data;
};

export const getOrders = async () => {
  const response = await api.get("http://localhost:4003/orders");
  return response.data;
};

export const getSingleOrder = async (orderId) => {
  if (orderId === "") {
    return;
  }
  const response = await api.get(`http://localhost:4003/order/${orderId}`);
  return response.data;
};

export const cancelOrder = async ({ orderId }) => {
  if (orderId === "") {
    return;
  }
  const response = await api.put(`http://localhost:4003/order/${orderId}`);
  return response.data;
};
