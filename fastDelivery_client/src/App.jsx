import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import AdminPanel from "./components/adminPanel/adminPanel";
import Products from "./components/products/Products";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <Routes>
          <Route path="/admin" Component={AdminPanel} />
          <Route path="/products" Component={Products} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
