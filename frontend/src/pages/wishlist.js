import { Container } from "@mui/material";
import React from "react";
import NavBar from "../components/home/navBar";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom.js";
import WishLIstPage from "../components/wishlist/wishlistPage.js";

const WishList = () => {
  const user = useRecoilValue(userAtom)
  return (
    <>
      <NavBar />
      <Container maxWidth={"xl"} sx={{marginTop:4}}>
        {user ? <WishLIstPage /> : <h1>Login to see Wishlist</h1>}
      </Container>
    </>
  );
};

export default WishList;
