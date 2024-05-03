import React, { useEffect } from 'react';
import { Typography, Button, Container, Box, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useRecoilValue } from 'recoil';
import orderAtom from '../atom/orderAtom.js';
import { toast } from 'react-toastify';

const TransactionSuccessPage = () => {
  const order = JSON.parse(localStorage.getItem("order"));
  localStorage.removeItem("order");

  useEffect(() => {
    if (order) {
      const placeOrder = async () => {
        try {
          const res = await fetch("/api/order/placeOrder", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({order: order})
          });
          const data = await res.json();
          if (data.error) {
            toast.error(data.error);
          }
        } catch (error) {
          console.error("Error placing order:", error);
          toast.error("Failed to place order");
        }
      };
      placeOrder();
    }
  }, [order]);

  if (!order) {
    return (
      <Grid sx={{ minHeight: "80vh", placeContent: "center" }}>
        <Typography variant="h4" align="center">
          Oops! Something went wrong.
        </Typography>
        <Button component={Link} to="/">Go Home</Button>
      </Grid>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '4rem', margin: 'auto', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ color: 'green', marginBottom: '2rem' }}>
        <CheckCircleIcon sx={{ fontSize: '4rem' }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Transaction Successful!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        Thank you for your purchase. Your order has been successfully processed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default TransactionSuccessPage;
