import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Terminator Store
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Products
        </Button>
        <Button color="inherit" component={Link} to="/cart">
          Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
