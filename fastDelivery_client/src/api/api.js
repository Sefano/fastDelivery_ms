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

export const getProducts = async () => {
  const response = await axios.get("http://localhost:4002/products");
  console.log(response.data);
  return response.data;
};
