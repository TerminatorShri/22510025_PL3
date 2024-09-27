import React from "react";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import { useOutletContext, Link } from "react-router-dom";
import "./Cart.css";

const Cart = () => {
  const { cartItems, handleAddToCart, handleRemoveFromCart } =
    useOutletContext();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="card-main-div">
      <Typography variant="h4" gutterBottom>
        Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={item.name}
              secondary={`$${item.price} x ${item.quantity}`}
            />
            <div className="quantity-change">
              <Button
                onClick={() => handleAddToCart(item)}
                className="quantity-btn"
              >
                +
              </Button>
              <ListItemText primary={item.quantity} />
              <Button
                onClick={() => handleRemoveFromCart(item)}
                className="quantity-btn"
              >
                -
              </Button>
            </div>
          </ListItem>
        ))}
      </List>
      <div className="checkout-div">
        <Typography variant="h6">Total: ${totalPrice}</Typography>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to="/checkout"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
