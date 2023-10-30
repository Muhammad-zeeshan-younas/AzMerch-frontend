// routes.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Products from "../pages/Products";
import Contacts from "../pages/Contacts";
import Navbar from "../components/Navbar/Navbar";
import { Container } from "@mui/material";
const index = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/products" element={<Products />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Container>
    </>
  );
};

export default index;
