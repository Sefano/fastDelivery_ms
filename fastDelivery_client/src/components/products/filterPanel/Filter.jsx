import React from "react";
import "./filter.scss";
import { useQueryClient } from "@tanstack/react-query";
import { useCategories } from "../../../hooks/useCategories";

const Filter = ({
  categories,
  selectedCategories,
  handleSelectCategory,
  handleApplyFilters,
  handleSearchChange,
}) => {
  const queryClient = useQueryClient();

  return (
    <div className="filter">
      <h4>Поиск</h4>
      <div className="filter__search">
        <input
          type="text"
          id="search"
          name="search"
          className="filter__search_input"
          onChange={handleSearchChange}
        />
      </div>
      <h4>Фильтр</h4>
      {categories.status === "success" && (
        <ul className="filter__filters">
          {categories.data.map((cat) => (
            <li
              className="filter__filters_single"
              key={cat._id}
              onClick={() => handleSelectCategory(cat._id)}
            >
              <div
                className={`checkbox ${
                  selectedCategories.includes(cat._id) ? "checked" : ""
                }`}
              ></div>
              <span>{cat.name}</span>
            </li>
          ))}
        </ul>
      )}
      <button className="filter_btn" onClick={() => handleApplyFilters()}>
        Применить
      </button>
    </div>
  );
};

export default Filter;
