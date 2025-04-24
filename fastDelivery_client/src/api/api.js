import axios from "axios";
import api from "./axios";

export const signUp = async ({ email, password, name }) => {
  const response = await axios.post("http://localhost:4001/signup", {
    email,
    password,
    name,
  });

  localStorage.setItem("token", response.data.token);

  return response.data;
};

export const signIn = async ({ email, password }) => {
  const response = await axios.post("http://localhost:4001/signin", {
    email,
    password,
  });
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const fetchCategories = async () => {
  const response = await axios.get("http://localhost:4002/categories");

  return response.data;
};

export const postCat = async ({ nameCat, descriptionCat }) => {
  const response = await axios.post("http://localhost:4002/category", {
    name: nameCat,
    description: descriptionCat,
  });

  return response.data;
};

export const postProduct = async (formData) => {
  const response = await axios.post(
    "http://localhost:4002/testProduct",
    formData
  );
  return response.data;
};

export const getProducts = async (page, limit, filters, search) => {
  console.log(filters);
  const params = new URLSearchParams();
  if (filters.length > 0) {
    params.append("categories", filters.join(","));
  }
  if (search) {
    params.append("search", search);
  }
  params.append("page", page);
  params.append("limit", limit);
  const stringParams = params.toString();
  const response = await axios.get(
    `http://localhost:4002/products?${stringParams}`
  );
  console.log(response.data);
  return response.data;
};
