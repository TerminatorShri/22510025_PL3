import React from "react";
import {
  Button,
  Typography,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useOutletContext, useParams } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { products, handleAddToCart } = useOutletContext();
  const { id } = useParams();

  const currProduct = products.find((product) => product.id === parseInt(id));

  if (!currProduct) {
    return <Typography>No product found 🧐</Typography>;
  }

  return (
    <Card className="product-detail-card">
      <CardMedia
        component="img"
        image={currProduct.image}
        alt={currProduct.name}
        className="product-detail-card-img"
      />
      <CardContent className="product-detail-card-info">
        <Typography variant="h5">{currProduct.name}</Typography>
        <Typography variant="body2">${currProduct.price}</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAddToCart(currProduct)}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetail;
