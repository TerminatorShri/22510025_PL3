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
];

const Layout = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleAddToCart = (product) => {
    setCartItems((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
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
