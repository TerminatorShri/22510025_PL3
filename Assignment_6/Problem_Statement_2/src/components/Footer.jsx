import React from "react";
import { Box, Typography, Container } from "@mui/material";
import "./Footer.css";

const Footer = () => {
  return (
    <Box
      sx={{
        bgcolor: "primary.main",
        color: "white",
        py: 2,
        mt: "auto",
      }}
      className="footer-main-div"
    >
      <Container>
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Terminator Store. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
