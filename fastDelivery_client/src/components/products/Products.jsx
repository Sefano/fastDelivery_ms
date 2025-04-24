import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from "react";
import Product from "./product/Product";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import "./products.scss";
import OrderPanel from "./orderPanel/OrderPanel";
import { useProducts } from "../../hooks/useProducts";
import Filter from "./filterPanel/Filter";
import { useCategories } from "../../hooks/useCategories";
import { getFilteredProducts, getProductsByName } from "../../api/productApi";
import { useDebounce } from "../../hooks/useDebounce";
import { placeOrder } from "../../api/orderApi";

const Products = () => {
  const [page, setPage] = useState(1);
  const limit = 20;

  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  const queryClient = useQueryClient();
  const categories = useCategories();

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filters, setFilters] = useState([]);

  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  //можно использовать useDeferredValue
  const search = useDebounce(searchValue, 500);

  const { data, status } = useProducts(page, limit, filters, search);
  console.log(data);

  const handleSelectCategory = (categoryId) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  // const applyFilters = useMutation({
  //   mutationFn: getFilteredProducts,
  //   onSuccess: async (data) => {
  //     setFilters(selectedCategories);
  //   },
  // });

  const handleApplyFilters = () => {
    setFilters(selectedCategories);
    setPage(1);
  };

  const nextPage = () => {
    setPage((p) => Math.min(p + 1, data.meta.totalPages));
    window.scrollTo({ top });
  };

  const prevPage = () => {
    setPage((p) => Math.max(p - 1, 1));
    window.scrollTo({ top });
  };

  return (
    <div className="wrapper">
      <div className="wrapper__main">
        <aside>
          <Filter
            categories={categories}
            selectedCategories={selectedCategories}
            handleSelectCategory={handleSelectCategory}
            handleApplyFilters={handleApplyFilters}
            handleSearchChange={handleSearchChange}
          />
        </aside>

        <div className="products">
          {status === "success" &&
            data.products.map((product, index) => (
              <Product product={product} key={product._id} />
            ))}
        </div>
        <aside>{status === "success" && <OrderPanel />}</aside>
      </div>
      {status === "success" && (
        <div className="wrapper__pages">
          <button
            disabled={page === 1}
            onClick={prevPage}
            className="wrapper__pages_action"
          >
            Пред.
          </button>
          <span className="wrapper__pages_info">
            Страница {page} из {data.meta.totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={page >= data.meta.totalPages}
            className="wrapper__pages_action"
          >
            След.
          </button>
        </div>
      )}
    </div>
  );
};

export default Products;
