import React from "react";
import "./product.scss";
import burger from "../../../assets/brg.jpg";

const Product = () => {
  return (
    <div className="product">
      <div className="product__image">
        <img src={burger} alt="productImage" />
      </div>
      <div className="product__info">
        <div className="product__info-name">Название </div>
        <div className="product__info-price">цена</div>
      </div>
      <div className="product__btns">
        <button>-</button>
        <button>Добавить</button>
        <button>+</button>
      </div>
    </div>
  );
};

export default Product;
