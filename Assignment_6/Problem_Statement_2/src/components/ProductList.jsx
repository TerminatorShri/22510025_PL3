import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link, useOutletContext } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const { products, handleAddToCart } = useOutletContext();
  const [sort, setSort] = React.useState("low-to-high");
  const [selectedCategory, setSelectedCategory] = React.useState("All");
  const [priceRange, setPriceRange] = React.useState("All");

  const handleSortChange = (e) => setSort(e.target.value);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);
  const handlePriceRangeChange = (e) => setPriceRange(e.target.value);

  const filteredByCategory = products.filter(
    (product) =>
      selectedCategory === "All" || product.category === selectedCategory
  );

  const filteredProducts = filteredByCategory.filter((product) => {
    if (priceRange === "All") return true;
    if (priceRange === "0-1000") return product.price <= 1000;
    if (priceRange === "1000-5000")
      return product.price > 1000 && product.price <= 5000;
    if (priceRange === "5000+") return product.price > 5000;
    return true;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) =>
    sort === "low-to-high" ? a.price - b.price : b.price - a.price
  );

  return (
    <div className="product-main-div">
      <Typography variant="h4" gutterBottom>
        Products
      </Typography>

      <div style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
        <Select value={sort} onChange={handleSortChange}>
          <MenuItem value="low-to-high">Price: Low to High</MenuItem>
          <MenuItem value="high-to-low">Price: High to Low</MenuItem>
        </Select>

        <Select value={selectedCategory} onChange={handleCategoryChange}>
          <MenuItem value="All">All Categories</MenuItem>
          <MenuItem value="Electronics">Electronics</MenuItem>
          <MenuItem value="Fashion">Fashion</MenuItem>
        </Select>

        <Select value={priceRange} onChange={handlePriceRangeChange}>
          <MenuItem value="All">All Price Ranges</MenuItem>
          <MenuItem value="0-1000">0 - 1000</MenuItem>
          <MenuItem value="1000-5000">1000 - 5000</MenuItem>
          <MenuItem value="5000+">5000+</MenuItem>
        </Select>
      </div>

      <Grid container spacing={5}>
        {sortedProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card className="product-card">
              <CardMedia
                component="img"
                height="250"
                image={product.image}
                alt={product.name}
                className="product-card-img"
              />
              <CardContent className="product-card-details">
                <Typography variant="h6">{product.name}</Typography>
                <Typography variant="body2">${product.price}</Typography>
                <Button
                  onClick={() => handleAddToCart(product)}
                  variant="contained"
                  color="primary"
                  className="product-card-btn"
                >
                  Add to Cart
                </Button>
                <Button
                  component={Link}
                  to={`/products/${product.id}`}
                  variant="contained"
                  color="secondary"
                  className="product-card-btn"
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default ProductList;
