import React, { useEffect } from "react";
import "./product.scss";
import burger from "../../../assets/brg.jpg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../../../api/cartApi";
import { useCart } from "../../../api/useCart";

const Product = ({ product }) => {
  const queryClient = useQueryClient();

  const addToCartMain = useMutation({
    mutationFn: addToCart,
    onSuccess: async (data) => queryClient.setQueryData(["cart"], data),
  });

  const { cart, status, data, cartToDisplay } = useCart();

  const handleManageCart = () => {
    addToCartMain.mutate({
      action: "add",
      productId: product._id,
      name: product.name,
      price: product.price,
      image: product.image,
      unit: 1,
    });
  };

  return (
    <div className="product">
      {status === "success" && (
        <>
          <div className="product__image">
            <img src={product.imageUrl} alt="productImage" />
          </div>
          <div className="product__info">
            <div className="product__info-name">{product.name}</div>
            <div className="product__info-price">{product.price}</div>
          </div>
          <div className="product__btns">
            <button className="product__btns-add" onClick={handleManageCart}>
              Добавить
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Product;
