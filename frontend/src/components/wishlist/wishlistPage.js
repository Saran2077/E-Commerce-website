import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Stack,
  Grid,
  Box,
  CircularProgress,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import userAtom from "../../atom/userAtom.js";
import { toast } from "react-toastify";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

const WishLIstPage = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [user, setUser] = useRecoilState(userAtom);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getWishlist = async () => {
      try {
        const res = await fetch("/api/wishlist");
        const data = await res.json();
        setWishlistItems(data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    getWishlist();
  }, []);

  const handleWishList = async (e, productId) => {
    e.stopPropagation();
    try {
      const res = await fetch(`/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
        }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      let newUser = { ...user, wishlist: data.wishlist };
      toast.success(data.message);
      setWishlistItems(
        wishlistItems.filter((wishlist) => wishlist._id != productId)
      );

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
    } catch (error) {
      toast.error(error);
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
      maxWidth={"lg"}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: "1rem"
      }}
    >
      {wishlistItems?.length ? (
        <Grid container spacing={2}>
          <Grid
            item
            xs={12}
            sx={{
              position: "relative",
              padding: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Typography variant="h4">My Wishlist</Typography>
            <Divider sx={{ marginBottom: "1rem" }} />
            <div style={{ position: "relative", width: "100%" }}>
              {wishlistItems.length &&
                wishlistItems.map((item) => (
                  <Card
                    key={item.id}
                    onClick={() => navigate(`/product/${item._id}`)}
                    variant="outlined"
                    sx={{ marginBottom: 2 }}
                  >
                    <CardContent>
                      <Stack
                        direction="row"
                        spacing={2}
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
                            <Typography sx={{ width: 112, height: 112 }}>
                              <img
                                src={item.image}
                                alt={item.title}
                                style={{
                                  maxWidth: "100%",
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </Typography>
                          </Typography>
                          <div
                            style={{
                              flexDirection: "column",
                              display: "flex",
                              marginLeft: "10px",
                            }}
                          >
                            <Typography
                              variant="subtitle1"
                              sx={{ fontSize: 16 }}
                            >
                              {item.title}
                            </Typography>
                            <Typography variant="subtitle1">
                              {item.quantity > 0 ? (
                                <div style={{ color: "green" }}>In stock</div>
                              ) : (
                                <span style={{ color: "red" }}>
                                  Out of stock
                                </span>
                              )}
                            </Typography>
                            <div>
                              <Typography variant="body2">
                                Price:{" "}
                                <span style={{ fontSize: 20, fontWeight: 700 }}>
                                  ₹{item.price}
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
                            sx={{
                              color: "red",
                              fontSize: "16px",
                              cursor: "pointer",
                            }}
                          >
                            {user.wishlist.includes(item._id) ? (
                              <FavoriteIcon
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                }}
                                onClick={(e) => handleWishList(e, item._id)}
                              />
                            ) : (
                              <FavoriteBorderIcon
                                style={{
                                  backgroundColor: "white",
                                  borderRadius: "50%",
                                  padding: "5px",
                                  boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                                }}
                                onClick={() => handleWishList(item._id)}
                              />
                            )}
                          </Typography>
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                ))}
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
            Your wishlist is empty!
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

export default WishLIstPage;
