import axios from "axios";

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
