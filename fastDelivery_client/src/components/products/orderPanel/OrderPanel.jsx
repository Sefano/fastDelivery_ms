import React from "react";
import "./orderPanel.scss";
import PanelProduct from "./PanelProduct/PanelProduct";
import { useAuth } from "../../../api/useAuth";
import { useCart } from "../../../api/useCart";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import clearCartBtn from "../../../assets/clearCart.svg";
import { clearCart } from "../../../api/cartApi";
import { placeOrder } from "../../../api/orderApi";

const OrderPanel = () => {
  const { cart, status, data, cartToDisplay } = useCart();

  const clearCart = {
    cart: [],
    cartAmount: 0,
  };

  const queryClient = useQueryClient();

  const clearCartAside = useMutation({
    mutationFn: clearCart,
    onSuccess: async (data) => {
      queryClient.setQueryData(["cart"], data);
    },
  });

  const handleClearCart = () => {
    clearCartAside.mutate({
      action: "clear",
    });
  };

  const placeOrderAside = useMutation({
    mutationFn: placeOrder,
    onSuccess: async () => queryClient.setQueryData(["cart"], clearCart),
  });

  const handlePlaceOrder = () => {
    placeOrderAside.mutate();
  };

  return (
    <div className="order">
      <h2 className="order__title">Корзина</h2>
      <button className="order__clear" onClick={handleClearCart}>
        <img className="order__clear_img" src={clearCartBtn} alt="clear-cart" />{" "}
      </button>

      <p className="order__clearText">Очистить</p>
      {!cart && <></>}
      <div className="order__cart">
        <div className="order__cart_products">
          {status === "success" &&
            cart.cart.map((product, index) => (
              <div className="order__cart_products_single">
                <PanelProduct key={index} product={product} />
              </div>
            ))}
        </div>
      </div>

      <div className="order__info">
        {status === "success" && (
          <div className="order__info_sum">Сумма: {cart.cartAmount}</div>
        )}
        {status === "success" && cart.cart.length > 0 && (
          <button className="order__info_place" onClick={handlePlaceOrder}>
            Оформить
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderPanel;
