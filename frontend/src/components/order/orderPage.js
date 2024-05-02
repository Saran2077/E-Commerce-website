import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { Cancel as CancelIcon } from "@mui/icons-material";

const OrderPage = () => {
  const [orderItems, setOrderItems] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [confirmationDialogOpen, setConfirmationDialogOpen] = useState(false);
  const [orderIdToDelete, setOrderIdToDelete] = useState(null);
  const [productIdToDelete, setProductIdToDelete] = useState(null);

  useEffect(() => {
    getOrders();
  }, []);

  const getOrders = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/order");
      const data = await res.json();
      setOrderItems(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId: orderIdToDelete,
          productId: productIdToDelete,
        }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      getOrders();
      toast.success("Cancelled successfully");
    } catch (error) {
      toast.error(error);
    } finally {
      setConfirmationDialogOpen(false);
      setOrderIdToDelete(null);
      setProductIdToDelete(null);
    }
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: "100%",
        padding: "20px",
      }}
    >
      <Typography variant="h4">Order History</Typography>
      <Divider sx={{ marginBottom: "1rem" }} />
      {orderItems.length > 0 ? (
        <Grid container spacing={2}>
          {orderItems.map((orderItem) =>
            orderItem.products.map((product) => (
              <Grid item xs={12} key={product.product._id}>
                <Card
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "15px",
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      height={150}
                      width={150}
                      src={product.product.image}
                      alt={product.product.title}
                    />
                    <CardContent>
                      <Typography variant="h6">
                        {product.product.title}
                      </Typography>
                      <Typography variant="body1">
                        Price: {product.product.price}
                      </Typography>
                      <Typography variant="body1">
                        Quantity: {product.quantity}
                      </Typography>
                      <Typography variant="body1">
                        Status: {orderItem.status}
                      </Typography>
                    </CardContent>
                  </Box>
                  {orderItem.status === "pending" && (
                    <IconButton
                      onClick={() => {
                        setConfirmationDialogOpen(true);
                        setOrderIdToDelete(orderItem._id);
                        setProductIdToDelete(product.product._id);
                      }}
                      disabled={orderItem.status !== "pending"}
                    >
                      <CancelIcon />
                    </IconButton>
                  )}
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      ) : (
        <Box
          sx={{
            textAlign: "center",
            position: "relative",
            mt: "50px",
          }}
        >
          <img
            src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png"
            alt="Empty Orders"
          />
          <Typography variant="body1" sx={{ mt: "20px" }}>
            Your Order is empty! Add something to make me happy.
          </Typography>
          <Button
            onClick={() => navigate("/")}
            variant="contained"
            color="success"
            sx={{ mt: "20px" }}
          >
            Go to Home
          </Button>
        </Box>
      )}
      <Dialog
        open={confirmationDialogOpen}
        onClose={() => setConfirmationDialogOpen(false)}
      >
        <DialogTitle>Confirm Cancellation</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Are you sure you want to cancel this order?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmationDialogOpen(false)}>No</Button>
          <Button onClick={handleCancelOrder}>Yes</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrderPage;
