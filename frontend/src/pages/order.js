import { Container, Typography, Button } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom"; // Import Link for routing
import { useRecoilValue } from "recoil";
import userAtom from "../atom/userAtom.js";
import OrderPage from "../components/order/orderPage.js";

const Order = () => {
  const user = useRecoilValue(userAtom);
  return (
    <>
      {user ? (
        <OrderPage />
      ) : (
        <div
          style={{
            height: "80vh",
            textAlign: "center",
            placeContent: "center",
          }}
        >
          <Typography variant="h4" color="textPrimary" gutterBottom>
            Login to see your Orders
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

export default Order;
