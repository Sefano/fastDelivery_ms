import { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import "./App.css";
import AdminPanel from "./components/adminPanel/adminPanel";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" Component={AdminPanel} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
