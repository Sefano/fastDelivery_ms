import React, { useState } from "react";
import "./panelProduct.scss";
import burger from "../../../../assets/brg.jpg";
import { useSelector } from "react-redux";
import { useAuth } from "../../../../api/useAuth";
import { useCartActions } from "../../../../hooks/useCartActions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToCart, removeFromCart } from "../../../../api/cartApi";

const PanelProduct = ({ product }) => {
  console.log(product);

  const [disabledBtn, setDisabledBtn] = useState(false);

  const queryClient = useQueryClient();

  const addToCartAside = useMutation({
    mutationFn: addToCart,
    onMutate: () => setDisabledBtn(true),
    onSuccess: async (data) => {
      queryClient.setQueryData(["cart"], data);
      setDisabledBtn(false);
    },
  });

  const removeSingleFromCartAside = useMutation({
    mutationFn: removeFromCart,
    onMutate: () => setDisabledBtn(true),
    onSuccess: async (data) => {
      queryClient.setQueryData(["cart"], data);
      setDisabledBtn(false);
    },
  });

  const handleManageCart = (e) => {
    if (e.target.textContent === "+") {
      addToCartAside.mutate({
        action: "add",
        productId: product.product.id,
        name: product.product.name,
        price: product.product.price / product.unit,
        image: "not need here",
        unit: 1,
      });
    } else if (e.target.textContent === "-") {
      removeSingleFromCartAside.mutate({
        action: "delete",
        productId: product.product.id,
        unit: 1,
        price: product.product.price / product.unit,
      });
    }
  };

  return (
    <div className="panel-product">
      <img
        src={product.product.imgUrl}
        alt="panelImage"
        className="panel-product__img"
      />
      <div className="panel-product__desc">
        <div className="panel-product__desc_name">{product.product.name}</div>
        <div className="panel-product__desc_price">{product.product.price}</div>
      </div>
      <div className="panel-product__btns">
        <button
          disabled={disabledBtn}
          className="panel-product__btns_single del"
          onClick={handleManageCart}
        >
          -
        </button>
        <span>{product.unit}</span>
        <button
          disabled={disabledBtn}
          className="panel-product__btns_single add"
          onClick={handleManageCart}
        >
          +
        </button>
      </div>
    </div>
  );
};

export default PanelProduct;
