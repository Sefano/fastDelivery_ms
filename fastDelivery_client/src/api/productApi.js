import axios from "axios";

export const getFilteredProducts = async ({
  selectedCategories,
  page,
  limit,
}) => {
  const params = new URLSearchParams();
  console.log("HERE 2", selectedCategories, page);
  params.append("categories", selectedCategories.join(","));
  params.append("page", page);
  params.append("limit", limit);
  const stringParams = params.toString();
  console.log(stringParams);
  const response = await axios.get(
    `http://localhost:4002/products?${stringParams}`
  );
  console.log(response.data);
  return response.data;
};

export const getProductsByName = async (search) => {
  const params = new URLSearchParams();
  console.log("HERE 2", search);
  params.append("search", search);
  const stringParams = params.toString();
  console.log(stringParams);

  const response = await axios.get(
    `http://localhost:4002/products?${stringParams}`
  );
  console.log(response.data);
  return response.data;
};
