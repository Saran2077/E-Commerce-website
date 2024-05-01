import { Container } from "@mui/material";
import React from "react";
import NavBar from "../components/home/navBar";
import CartPage from "../components/cart/cart";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom.js";

const CartHome = () => {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <NavBar />
      <Container maxWidth={"xl"} sx={{marginTop:4}}>
        {user ? <CartPage /> : <h1>Login to see cart</h1>}
      </Container>
    </>
  );
};

export default CartHome;
