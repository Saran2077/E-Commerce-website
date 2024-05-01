import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Box,
  CircularProgress,
} from "@mui/material";
import CardContainer from "../components/commons/cardContainer";
import NavBar from "../components/home/navBar";
import Stack from "@mui/material/Stack";
import Banner from "../components/home/banner";
import styles from "../home.module.css";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const res = await fetch("/api/category");
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getCategory();
  }, []);

  if (isLoading) {
    return (
      <Box sx={{ display: "grid", placeContent: "center", minHeight: "100%" }}>
        <CircularProgress disableShrink />
      </Box>
    );
  }

  return (
    <>
      <Banner />
      <Container maxWidth="lg" className={styles.why_section}>
        <h2 style={{ textAlign: "center", fontSize: "60px", lineHeight: 0.5 }}>
          Why shop with us ?
        </h2>

        <Grid container spacing={4}>
          <Grid item xs={4}>
            <div className={styles.box}>
              <img
                src="/assets/images/svgs/freeDelivery.svg"
                alt=""
                className={styles.svg}
              />
              <br />
              Fast delivery
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.box}>
              <img
                src="/assets/images/svgs/freeShipping.svg"
                alt=""
                className={styles.svg}
              />
              <br />
              Fast Shipping
            </div>
          </Grid>
          <Grid item xs={4}>
            <div className={styles.box}>
              <img
                src="/assets/images/svgs/bestQuality.svg"
                alt=""
                className={styles.svg}
              />
              <br />
              Best Quality
            </div>
          </Grid>
        </Grid>

        <h2 style={{ textAlign: "center", fontSize: "60px", lineHeight: 0.5 }}>
          Explore by categories
        </h2>

        {/* <div style={styles.explore_by_category}>
          <div style={styles.rounded_box}>
            <img src="assets/images/pngs/homeappliances.jpg" alt="" />
          </div>
          <div>
            <img src="assets/images/pngs/fasion.jpg" alt="" />
          </div>
          <div>
            <img src="assets/images/pngs/accessories.jpg" alt="" />
          </div>
          <div>
            <img src="assets/images/pngs/skincare.jpg" alt="" />
          </div>
        </div> */}



        <Stack>
          {categories.length > 0 &&
            categories.map((category) => {
              return <CardContainer cards={category} />;
            })}
        </Stack>
      </Container>
    </>
  );
};

export default Home;
