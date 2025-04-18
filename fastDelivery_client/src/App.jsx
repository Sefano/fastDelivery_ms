import { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import AdminPanel from "./components/adminPanel/adminPanel";
import Products from "./components/products/Products";
import Auth from "./components/auth/Auth";
import Navbar from "./components/navbar/Navbar";
import { useAuth } from "./api/useAuth";
import Forbidden from "./components/forbidden/Forbidden";
import { AdminRoute } from "./components/roleRoute/AdminRoute";
import Mock from "./components/Mock";

function App() {
  useAuth();

  return (
    <BrowserRouter>
      <Navbar />
      <div className="container">
        <Routes>
          <Route Component={AdminRoute}>
            <Route path="/admin" Component={AdminPanel} />
          </Route>
          <Route path="/forbidden" Component={Forbidden} />
          <Route path="/auth" Component={Auth} />
          <Route path="/products" Component={Products} />
          <Route path="/mock" Component={Mock} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
