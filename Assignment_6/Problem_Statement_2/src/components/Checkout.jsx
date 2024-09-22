import React from "react";
import { Typography, Button } from "@mui/material";

const Checkout = () => {
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <Typography variant="body1">Thank you for your purchase!</Typography>
      <Button variant="contained" color="primary" href="/">
        Go Back to Products
      </Button>
    </div>
  );
};

export default Checkout;
