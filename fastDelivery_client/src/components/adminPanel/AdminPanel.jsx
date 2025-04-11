import "./adminPanel.scss";
import blank from "../../assets/blank.webp";
import React, { useRef, useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { fetchCategories, postCat, postProduct } from "../../api/api";

const AdminPanel = () => {
  const queryClient = useQueryClient();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [nameCat, setNameCat] = useState("");
  const [descriptionCat, setDescriptionCat] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  const [image, setImage] = useState(null);
  const inputImageRef = useRef(null);

  const query = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const catMutation = useMutation({
    mutationFn: postCat,
    onSuccess: async () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
  const createCategory = (e) => {
    e.preventDefault();
    catMutation.mutate({ nameCat, descriptionCat });
  };

  const productMutation = useMutation({
    mutationFn: postProduct,
    onSuccess: async () => {
      console.log("Успешно");
    },
  });

  const createProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("price", price);
    productMutation.mutate(formData);
  };

  const {
    isPending,
    isFetching,
    isSuccess,
    isError,
    error,
    data,
    status,
    fetchStatus,
  } = query;

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(category);
  return (
    <div className="create-product">
      <h2 className="create-product__header">Добавить продукт</h2>
      <form onSubmit={createProduct} className="create-product__fields">
        <div>
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="image"
              className="create-product__fields-uploaded"
            />
          ) : (
            <img
              src={blank}
              alt="blank"
              onClick={() => inputImageRef.current.click()}
              className="create-product__fields-uploaded"
            />
          )}

          <label htmlFor="image">Изображение товара</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            className="create-product__fields__input-image"
            ref={inputImageRef}
            onChange={handleImageChange}
          />
        </div>

        <div>
          <label htmlFor="name">Название</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={(e) => setName(e.target.value)}
            className="create-product__fields__input"
          />
        </div>

        <div>
          <label htmlFor="description">Описание</label>
          <textarea
            id="description"
            name="description"
            onChange={(e) => setDescription(e.target.value)}
            className="create-product__fields__input-textarea"
          />
        </div>

        <div>
          <label htmlFor="category">Категория</label>
          <select
            id="category"
            name="category"
            className="create-product__fields__input"
            onChange={(e) => setCategory(e.target.value)}
          >
            {status === "success" &&
              data.map((category, index) => (
                <option key={index} value={category._id}>
                  {category.name}
                </option>
              ))}
          </select>
        </div>

        <div>
          <label htmlFor="price">Цена</label>
          <input
            type="number"
            id="price"
            name="price"
            className="create-product__fields__input"
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <button type="submit" className="create-product__fields-submit">
          Добавить продукт
        </button>
      </form>
      <h2 className="create-product__header">Добавить категорию</h2>
      <form onSubmit={createCategory} className="create-product__fields">
        <div>
          <label htmlFor="name">Название</label>
          <input
            type="text"
            id="nameCat"
            name="nameCat"
            onChange={(e) => setNameCat(e.target.value)}
            className="create-product__fields__input"
          />
        </div>

        <div>
          <label htmlFor="description">Описание</label>
          <textarea
            id="descriptionCat"
            name="descriptionCat"
            onChange={(e) => setDescriptionCat(e.target.value)}
            className="create-product__fields__input-textarea"
          />
        </div>

        <button type="submit" className="create-product__fields-submit">
          Добавить категорию
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
