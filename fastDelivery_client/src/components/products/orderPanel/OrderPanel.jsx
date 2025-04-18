import React from "react";
import "./orderPanel.scss";
import PanelProduct from "./PanelProduct/PanelProduct";
import { useAuth } from "../../../api/useAuth";
import { useCart } from "../../../api/useCart";
import { useQueryClient } from "@tanstack/react-query";

const OrderPanel = () => {
  const { cart, status, data, cartToDisplay } = useCart();

  const queryClient = useQueryClient();

  return (
    <>
      <h2 className="order__title">Корзина</h2>
      {!cart && <></>}
      <div className="order__products">
        {status === "success" &&
          cart.cart.map((product, index) => (
            <div className="order__products_single">
              <PanelProduct key={index} product={product} />
            </div>
          ))}
      </div>
      <span className="order__divider"></span>
      {status === "success" && (
        <div className="order__sum">Оформить: {cart.cartAmount}</div>
      )}
    </>
  );
};

export default OrderPanel;
