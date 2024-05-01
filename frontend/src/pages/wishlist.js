import { Container, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import NavBar from "../components/home/navBar";
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom.js";
import WishListPage from "../components/wishlist/wishlistPage.js";

const WishList = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      {user ? (
        <WishListPage />
      ) : (
        <div style={{ height: "80vh" ,textAlign: "center", placeContent: "center"  }}>
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Login to see your Wishlist
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
    </>
  );
};

export default WishList;
