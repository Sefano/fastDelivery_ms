import React from "react";
import brg from "../../assets/brg.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cancelOrder } from "../../api/orderApi";

const SingleOrder = ({ singleOrderData }) => {
  const queryClient = useQueryClient();

  const cancelOrderClient = useMutation({
    mutationFn: cancelOrder,
    onSuccess: async (data) =>
      queryClient.setQueryData(
        ["singleOrder", { orderId: singleOrderData._id }],
        data
      ),
  });

  const handleCancelOrderClient = () => {
    cancelOrderClient.mutate({ orderId: singleOrderData._id });
  };

  return (
    <div className="singleOrder__wrapper">
      <div className="singleOrder">
        <div className="singleOrder__info">
          <div>{new Date(singleOrderData.createdAt).toLocaleString()}</div>
          <div
            style={{
              color: singleOrderData.status === "Отменен" ? "red" : "green",
            }}
          >
            {singleOrderData.status}
          </div>
        </div>
        <div className="singleOrder__address">
          <p>Адрес</p>
          <p>Будет добавлен позже</p>
        </div>
        <div className="singleOrder_divider"></div>
        <p>Продукты</p>
        <div className="singleOrder__products">
          {singleOrderData.products.map((el, index) => (
            <div className="singleOrder__products_product" key={index}>
              <div className="singleOrder__products_product_img">
                <img src={el.product.imageUrl} alt="productImage" />
              </div>
              <div className="singleOrder__products_product_name">
                <span>{el.product.name}</span>
                <div className="minorText">{el.unit} шт.</div>
              </div>
              <div className="singleOrder__products_product_price">
                <p>{el.product.price} ₽</p>
              </div>
            </div>
          ))}
        </div>
        <div className="singleOrder_divider"></div>
        <div className="singleOrder__products_amount">
          <div>Итого:</div>
          <div>{singleOrderData.amount}</div>
        </div>
        <div className="singleOrder__products__actions">
          <button
            className="singleOrder__products__actions_single"
            onClick={() => handleCancelOrderClient()}
          >
            Отменить
          </button>
          <button className="singleOrder__products__actions_single">
            Повторить
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleOrder;
