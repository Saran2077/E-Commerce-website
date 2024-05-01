import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  TextField,
  Card,
  CardContent,
  IconButton,
  Stack,
  Grid,
  Divider,
  CircularProgress,
  Box,
} from "@mui/material";
import {
  RemoveCircleOutline as RemoveIcon,
  AddCircleOutline as AddIcon,
} from "@mui/icons-material";
import { toast } from "react-toastify";
import { loadStripe } from "@stripe/stripe-js";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import userAtom from "../../atom/userAtom.js";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(userAtom);

  useEffect(() => {
    const getCart = async () => {
      try {
        const res = await fetch("/api/cart");
        const data = await res.json();
        setCartItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCart();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    setIsDisabled(true);
    try {
      setCartItems(
        cartItems.map((item) => {
          if (item.product._id === itemId) {
            return { ...item, quantity: newQuantity };
          }
          return item;
        })
      );
      const res = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: itemId,
          quantity: newQuantity,
        }),
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setIsDisabled(false);
    }
  };

  const [price, setPrice] = useState(0);
  useEffect(() => {
    const handlePrice = () => {
      let newPrice = 0;
      cartItems.forEach((item) => {
        newPrice += item.product.price * item.quantity;
      });
      setPrice(newPrice);
    };
    handlePrice();
  }, [cartItems]);

  const handlePlaceOrder = async () => {
    try {
      const stripe = await loadStripe(
        "pk_test_51PBLuuSDQSV2IrRuw6YFhpuSgpxKEr0kpFbhgPbTjXybx27aYJ7EZ4crwEw6xY8dJI28Uz85kQwXFYmiNgGIpr7U00SgMEe0y1"
      );
      const res = await fetch("/api/cart/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          products: cartItems,
          totalAmount: price,
        }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    }
  };

  const removeItemFromCart = async (id) => {
    try {
      const res = await fetch("/api/cart", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      setCartItems(cartItems.filter((item) => item.product._id != id));
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeContent: "center", minHeight: "100%" }}>
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {cartItems?.length ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={8}
            sx={{
              position: "relative",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4" sx={{textAlign: "center"}}>My Cart</Typography>
            <Divider sx={{ marginBottom: "1rem" }} />
            <div style={{ position: "relative", width: "100%" }}>
              {cartItems.map((item) => (
                item.product &&
                <Card key={item.id} variant="outlined" sx={{ marginBottom: 2 }}>
                  <CardContent>
                    <Stack
                      direction="row"
                      sx={{ justifyContent: "space-between" }}
                    >
                      <Typography
                        component={"div"}
                        style={{ display: "flex", flexDirection: "row" }}
                      >
                        <Typography
                          component={"div"}
                          sx={{ display: "flex", flexDirection: "column" }}
                        >
                          <Typography sx={{ width: "112px", height: "112px" }}>
                            <img
                              src={item.product.image}
                              alt={item.product.title}
                              style={{
                                maxWidth: "112px",
                                height: "112px",
                                objectFit: "cover",
                              }}
                            />
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={1}
                            alignItems="center"
                            justifyContent={"center"}
                            paddingTop={1.5}
                          >
                            <IconButton
                              onClick={() =>
                                handleQuantityChange(
                                  item.product._id,
                                  item.quantity - 1
                                )
                              }
                              disabled={isDisabled || item.quantity <= 1}
                              size="small"
                            >
                              <RemoveIcon />
                            </IconButton>
                            <Typography variant="body1">
                              {item.quantity}
                            </Typography>
                            <IconButton
                              onClick={() =>
                                handleQuantityChange(
                                  item.product._id,
                                  item.quantity + 1
                                )
                              }
                              disabled={isDisabled}
                              size="small"
                            >
                              <AddIcon />
                            </IconButton>
                          </Stack>
                        </Typography>
                        <div
                          style={{
                            flexDirection: "column",
                            display: "flex",
                            marginLeft: "10px",
                          }}
                        >
                          <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                            {item.product.title}
                          </Typography>
                          <Typography variant="subtitle1">
                            {item.product.quantity > 0 ? (
                              <div style={{ color: "green" }}>In stock</div>
                            ) : (
                              <span style={{ color: "red" }}>Out of stock</span>
                            )}
                          </Typography>
                          <div>
                            <Typography variant="body2">
                              Price:{" "}
                              <span style={{ fontSize: 20, fontWeight: 700 }}>
                                ₹{item.product.price}
                              </span>
                            </Typography>
                          </div>
                        </div>
                      </Typography>

                      <Typography
                        component={"div"}
                        sx={{ display: "flex", alignItems: "center" }}
                      >
                        <Typography
                          component="p"
                          sx={{
                            color: "red",
                            fontSize: "16px",
                            cursor: "pointer",
                          }}
                          onClick={() => removeItemFromCart(item.product._id)}
                        >
                          Remove
                        </Typography>
                      </Typography>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div
              style={{
                height: "80px",
                position: "sticky",
                display: "flex",
                margin: 0,
                justifyContent: "end",
                width: "100%",
                zIndex: "1000",
                background: "white",
                bottom: 2,
                paddingRight: "20px",
                boxShadow: "0 -2px 10px 0 rgba(0,0,0,.1)",
                alignItems: "center",
              }}
            >
              <div>
                <Button
                  onClick={handlePlaceOrder}
                  variant="contained"
                  sx={{
                    width: "200px",
                    padding: 1,
                    borderRadius: "2px",
                    backgroundColor: "#fb641b",
                    color: "#fff",
                    fontWeight: "bold",
                    boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      backgroundColor: "#fb641b",
                    },
                  }}
                >
                  Place Order
                </Button>
              </div>
            </div>
          </Grid>
          <Grid item xs={4}>
            <div
              style={{
                padding: "20px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: 16,
                  textTransform: "upperCase",
                  fontWeight: "600px",
                  paddingBottom: 1.5,
                }}
              >
                Price Details
              </Typography>
              <Divider aria-hidden="true" />
              <Typography
                component="div"
                sx={{
                  fontSize: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 1.5,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  Price ({cartItems?.length ?? 0})
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  Price (₹{price})
                </Typography>
              </Typography>
              <Typography
                component="div"
                sx={{
                  fontSize: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 1.5,
                  paddingBottom: 1.5,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  Delivery charges
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  {price < 500 ? 100 : "FREE"}
                </Typography>
              </Typography>
              <Divider
                sx={{
                  height: "1px",
                  width: "100%",
                  borderBottom: "1px dashed #ccc",
                  margin: "10px 0",
                }}
              />
              <Typography
                component="div"
                sx={{
                  fontSize: 16,
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 1.5,
                }}
              >
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  Total amount
                </Typography>
                <Typography variant="subtitle1" sx={{ fontSize: 16 }}>
                  ₹{price < 500 ? price + 100 : price}
                </Typography>
              </Typography>
              <Divider
                sx={{
                  height: "1px",
                  width: "100%",
                  borderBottom: "1px dashed #ccc",
                  margin: "10px 0",
                }}
              />
            </div>
          </Grid>
        </Grid>
      ) : (
        <Typography
          sx={{
            textAlign: "center",
            position: "relative",
          }}
        >
          <img src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" />
          <div
            style={{
              position: "absolute",
              bottom: "10%",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            Your cart is empty!
            <br /> Add something to make me happy.
            <Button
              onClick={() => {
                navigate("/");
              }}
              variant="contained"
              color="success"
              sx={{
                width: "160px",
                padding: 1,
                borderRadius: "30px",
                color: "#fff",
                fontWeight: "bold",
                boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
                marginTop: "16px",
              }}
            >
              Go to Home
            </Button>
          </div>
        </Typography>
      )}
    </Container>
  );
};

export default CartPage;
