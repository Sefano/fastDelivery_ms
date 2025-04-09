import "./adminPanel.scss";
import blank from "../../assets/blank.webp";
import React, { useRef, useState } from "react";

const AdminPanel = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");

  const [imagePreview, setImagePreview] = useState(null);

  const [image, setImage] = useState(null);
  const inputImageRef = useRef(null);
  const categoriesMock = [
    "Заморозка",
    "Сладости",
    "Мясная продукция",
    "Рыба",
    "Выпечка",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  console.log(image);
  console.log(name);
  console.log(description);
  console.log(price);
  console.log(category);
  return (
    <div className="create-product">
      <h2 className="create-product__header">Добавить продукт</h2>
      <form action="onsubmit" className="create-product__fields">
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
            {categoriesMock.map((category, index) => (
              <option key={index} value={category}>
                {category}
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
    </div>
  );
};

export default AdminPanel;
