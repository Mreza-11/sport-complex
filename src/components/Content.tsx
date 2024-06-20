import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage/LoginPage";
import HomePage from "../pages/HomePage/HomePage";
import AdminPanel from "../pages/AdminPanel/AdminPanel";

const Content = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/admin-panel" element={<AdminPanel />} />
    </Routes>
  );
};

export default Content;
