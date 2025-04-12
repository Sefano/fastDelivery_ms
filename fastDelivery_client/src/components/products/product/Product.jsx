import React from "react";
import "./product.scss";
import burger from "../../../assets/brg.jpg";

const Product = ({ product }) => {
  return (
    <div className="product">
      <div className="product__image">
        <img src={product.image} alt="productImage" />
      </div>
      <div className="product__info">
        <div className="product__info-name">{product.name}</div>
        <div className="product__info-price">{product.price}</div>
      </div>
      <div className="product__btns">
        <button>-</button>
        <button className="product__btns-add">Добавить</button>
        <button>+</button>
      </div>
    </div>
  );
};

export default Product;
