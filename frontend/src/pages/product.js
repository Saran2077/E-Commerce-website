import { useEffect, useState } from "react";
import { Container, Typography, Button, Grid, Box, CircularProgress } from "@mui/material";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import NavBar from "../components/home/navBar";
import Divider from "@mui/material/Divider";
import CardContainer from "../components/commons/cardContainer";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { loadStripe } from "@stripe/stripe-js";
import userAtom from "../atom/userAtom.js";
import { useRecoilState } from "recoil";

const ProductDescriptionPage = () => {
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null)
  const { pid } = useParams();
  const [user, setUser] = useRecoilState(userAtom)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await fetch(`/api/product/${pid}`);
        const data = await res.json();
        if (data.error) return toast.error(data.error);
        setProduct(data);
        const res2 = await fetch(`/api/category/${data?.category ?? ""}`)
        const data2 = await res2.json()
        if (data2.error) return toast.error(data2.error);
        setRelatedProducts(data2)
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false)
      }
    };
    getProduct();
  }, [pid]);

  const handleWishList = async () => {
    try {
      const res = await fetch(`/api/wishlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          productId: product._id
        })
      });
      const data = await res.json()
      if (data.error) return toast.error(data.error)
      let newUser = {...user, wishlist: data.wishlist}
      toast.success(data.message)
      setUser(newUser)
      localStorage.setItem("user", JSON.stringify(newUser))
    } catch (error) {
      toast.error(error)
    }
  }

  const addToCart = async () => {
    try {
        const res = await fetch(`/api/cart`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                productId: product._id,
                quantity: 1
            })
        })
        const data = await res.json()
        if (data.error) return toast.error(data.error);
        toast.success(data.message);

    } catch (error) {
        toast.error(error);
        console.error(error);
    }
  }

  const handlePlaceOrder = async () => {
    try {
      const stripe = await loadStripe('pk_test_51PBLuuSDQSV2IrRuw6YFhpuSgpxKEr0kpFbhgPbTjXybx27aYJ7EZ4crwEw6xY8dJI28Uz85kQwXFYmiNgGIpr7U00SgMEe0y1')
      const res = await fetch("/api/cart/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user._id,
          products: [{product, quantity: 1}],
          totalAmount: product.price || 0
        }),
      })
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

  if (isLoading) {
    return (
      <Box sx={{display: "grid", placeContent: "center", minHeight: "100%"}}>
        <CircularProgress disableShrink />
      </Box>
    )
  }

  return (
    <>
      <NavBar />
      {product && (
        <Container>
          <Grid
            container
            spacing={6}
            style={{ marginBottom: "2rem", marginTop: "1rem" }}
          >
            <Grid alignContent={"center"} item xs={12} md={6} height={"70vh"} style={{ position: 'relative' }}>
              <img
                src={product.image}
                alt="Product"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />{user &&
                user.wishlist.includes(product._id) ?
                <FavoriteIcon style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'white',borderRadius: '50%', color: "red", padding: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} onClick={handleWishList} />
                :
                <FavoriteBorderIcon style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'white', borderRadius: '50%', padding: '5px', boxShadow: '0 2px 4px rgba(0,0,0,0.2)' }} onClick={handleWishList} /> 
              }
              
            </Grid>
            <Grid item xs={12} md={6} p={1} spacing={2}>
              <Typography variant="h2" gutterBottom sx={{ fontWeight: 700 }}>
                {product.title}
              </Typography>

              <Typography variant="h5" gutterBottom>
                Product Category
              </Typography>
              <Typography variant="body1" mb={2}>
                {product.description}
              </Typography>
              <Divider aria-hidden="true" />
              <Typography variant="h6" mt={1.5} mb={1.5}>
              Price:<b>₹{product.price}</b>  
              </Typography>
              <Button
                variant="contained"
                color="primary"
                style={{ marginRight: "1rem" }}
                onClick={addToCart}
              >
                Add to Cart
              </Button>
              <Button variant="outlined" color="primary" onClick={handlePlaceOrder}>
                Buy Now
              </Button>
            </Grid>
          </Grid>

          <Typography variant="h5" sx={{fontWeight: 700}} gutterBottom>
          You might be interested in
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={12}>
              {relatedProducts &&  <CardContainer cards={relatedProducts} isShowTitle={false}/>
              }
            </Grid>
          </Grid>
        </Container>
      )}
    </>
  );
};

export default ProductDescriptionPage;
