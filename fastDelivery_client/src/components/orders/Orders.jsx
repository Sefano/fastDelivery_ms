import React, { useState } from "react";
import "./orders.scss";
import SingleOrder from "./SingleOrder";
import { useOrders } from "../../hooks/useOrders";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getSingleOrder } from "../../api/orderApi";
import { useSingleOrder } from "../../hooks/useSingleOrder";
import orderMock from "../../assets/orderMock.svg";
const Orders = () => {
  const { data, status } = useOrders();

  const [orderId, setOrderId] = useState("");

  const queryClient = useQueryClient();

  const { data: singleOrderData, status: singleOrderStatus } =
    useSingleOrder(orderId);

  // const setSingleOrder = useMutation({
  //   mutationFn: getSingleOrder,
  //   onSuccess: async () => {
  //     queryClient.setQueryData({ queryKey: ["singleOrder", { orderId }] });
  //   },
  // });

  const handleSetSingleOrder = (orderId) => {
    setOrderId(orderId);
  };

  console.log(data);
  return (
    <div className="orders__wrapper">
      <div className="orders">
        {status === "success" &&
          data.map((order, index) => (
            <div
              className="orders__single"
              key={index}
              onClick={() => handleSetSingleOrder(order._id)}
            >
              <div className="orders__single_info">
                <div className="orders__single_info_date">
                  <div>{new Date(order.createdAt).toLocaleString()}</div>
                </div>

                <div className="orders__single_info_price">
                  <div>Сумма: {order.amount}</div>
                  <div
                    style={{
                      color: order.status === "Отменен" ? "red" : "green",
                    }}
                  >
                    {order.status}
                  </div>
                </div>
              </div>
              <div className="orders__single_products">
                {order.products.map((el, index) => (
                  <div key={index}>{el.product.name}</div>
                ))}
              </div>
            </div>
          ))}
      </div>
      {singleOrderStatus === "success" ? (
        <SingleOrder singleOrderData={singleOrderData} />
      ) : (
        <div id="orderMock">
          <img src={orderMock} alt="orderMock" />
        </div>
      )}
    </div>
  );
};

export default Orders;
