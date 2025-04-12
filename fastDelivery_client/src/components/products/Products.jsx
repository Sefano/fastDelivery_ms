import React from "react";
import Product from "./product/Product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./products.scss";
import { getProducts } from "../../api/api";

const Products = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const { data, status } = query;
  console.log(data);

  return (
    <div className="wrapper">
      {status === "success" &&
        data.map((product, index) => <Product product={product} key={index} />)}
    </div>
  );
};

export default Products;
