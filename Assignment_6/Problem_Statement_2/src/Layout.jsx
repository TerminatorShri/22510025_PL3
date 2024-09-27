import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

const products = [
  {
    id: 1,
    name: "Laptop",
    price: 100000,
    image:
      "https://m.media-amazon.com/images/I/41He7GonYUL._SX300_SY300_QL70_FMwebp_.jpg",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Headphones",
    price: 2000,
    image:
      "https://m.media-amazon.com/images/I/41kWMvhJyEL._SX300_SY300_QL70_FMwebp_.jpg",
    category: "Electronics",
  },
  {
    id: 3,
    name: "Shoes",
    price: 500,
    image: "https://m.media-amazon.com/images/I/71cflgAolqL._SY695_.jpg",
    category: "Fashion",
  },
  {
    id: 4,
    name: "Chips",
    price: 50,
    image:
      "https://m.media-amazon.com/images/I/51Uzqfza07L._SX300_SY300_QL70_FMwebp_.jpg",
    category: "Food",
  },
];

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity - 1 >= 0 ? item.quantity - 1 : 0,
              }
            : item
        );
      }
    });
  };

  return (
    <>
      <Navbar />
      <Container>
        <Outlet
          context={{
            products,
            cartItems,
            handleAddToCart,
            handleRemoveFromCart,
            setSelectedProduct,
            selectedProduct,
          }}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Layout;
