import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  MenuItem,
  Select,
  Box,
} from "@mui/material";
import { Add as AddIcon, MoreVert as MoreVertIcon } from "@mui/icons-material";
import { toast } from "react-toastify";

const OrdersManagement = () => {
  const [orders, setOrders] = useState([]);
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderStatus, setOrderStatus] = useState("");
  const [orderFormData, setOrderFormData] = useState({
    customerName: "",
    productName: "",
    quantity: 0,
  });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch("/api/order/all");
      const data = await response.json();
      if (data) {
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const handleMoreOptionsClick = (order) => {
    setSelectedOrder(order);
    console.log(order);
    setOpenOrderDialog(true);
  };

  const handleOrderStatusChange = async (event) => {
    setOrderStatus(event.target.value);
  };

  const handleUpdateOrder = async (orderId) => {
    const res = await fetch("/api/order/status", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId,
        status: orderStatus,
      }),
    });
    const data = await res.json();
    if (data.error) return toast.error(data.error);
    fetchOrders();
  };

  const handleOrderFormChange = (e) => {
    setOrderFormData({ ...orderFormData, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Orders Management
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Customer Id</TableCell>
              <TableCell>Order Id</TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order.user}</TableCell>
                <TableCell>{order._id}</TableCell>
                <TableCell>₹{order.totalAmount}</TableCell>
                <TableCell>{order.status}</TableCell>
                <TableCell>
                  <IconButton onClick={() => handleMoreOptionsClick(order)}>
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openOrderDialog}
        onClose={() => setOpenOrderDialog(false)}
        fullWidth
      >
        <DialogTitle>Order Details</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {selectedOrder &&
            selectedOrder.products.map((product) => (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{ display: "flex", gap: "15px", alignItems: "center" }}
                >
                  <Typography variant="h6">
                    <img
                      src={product.product.image}
                      height={"50px"}
                      width={"50px"}
                    />
                  </Typography>
                  <Typography variant="h6">
                    {product ? product.product.title : ""}
                  </Typography>
                </Box>
                <Typography>
                  Quantity: {product ? product.quantity : ""}
                </Typography>
              </Box>
            ))}
          <Typography>
            Total Amount: ₹{selectedOrder ? selectedOrder.totalAmount : ""}
          </Typography>
          <Select
            value={orderStatus}
            onChange={(event) =>
              handleOrderStatusChange(event, selectedOrder._id)
            }
            fullWidth
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="shipped">Shipped</MenuItem>
            <MenuItem value="delivered">Delivered</MenuItem>
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenOrderDialog(false)}>Cancel</Button>
          <Button
            onClick={() => handleUpdateOrder(selectedOrder._id)}
            color="primary"
          >
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default OrdersManagement;