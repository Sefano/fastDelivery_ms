import React from "react";
import Product from "./product/Product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./products.scss";
import { getProducts } from "../../api/api";
import OrderPanel from "./orderPanel/OrderPanel";
import { useProducts } from "../../hooks/useProducts";

const Products = () => {
  const queryClient = useQueryClient();

  const { data, status } = useProducts();
  console.log(data);

  return (
    <div className="wrapper">
      <aside>
        <div>Фильтры поиск</div>
      </aside>
      <div className="products">
        {status === "success" &&
          data.map((product, index) => (
            <Product product={product} key={index} />
          ))}
      </div>
      <aside className="order">{status === "success" && <OrderPanel />}</aside>
    </div>
  );
};

export default Products;
