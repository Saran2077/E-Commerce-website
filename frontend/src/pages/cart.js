import { Button, Container, Typography } from "@mui/material";
import React from "react";
import NavBar from "../components/home/navBar";
import CartPage from "../components/cart/cart";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom.js";
import { Link } from "react-router-dom";

const CartHome = () => {
  const user = useRecoilValue(userAtom);
  return (
    <Container maxWidth={"xl"} sx={{ marginTop: 4 }}>
      {user ? (
        <CartPage />
      ) : (
        <div style={{ height: "80vh" ,textAlign: "center", placeContent: "center" }}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Login to see your Cart
          </Typography>
          <Button
            variant="contained"
            component={Link}
            to="/login"
            color="primary"
          >
            Sign In
          </Button>
        </div>
      )}
    </Container>
  );
};

export default CartHome;
