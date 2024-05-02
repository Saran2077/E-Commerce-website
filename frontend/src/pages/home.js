import React, { useEffect, useState } from "react";
import { Container, Grid, Box, CircularProgress } from "@mui/material";
import CardContainer from "../components/commons/cardContainer";
import Stack from "@mui/material/Stack";
import Banner from "../components/home/banner";
import styles from "../home.module.css";
import { useNavigate } from "react-router-dom";
import CustomCarousel from "../components/home/caurosel";

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

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
      <Container className={styles.why_section}>
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

        <h2
          style={{
            textAlign: "center",
            fontSize: "60px",
            lineHeight: 0.5,
            marginTop: "100px",
          }}
        >
          Explore by categories
        </h2>

        <div className={styles.explore_by_category}>
          <div
            className={styles.rounded_box}
            onClick={() => navigate("/category/662fe737dcf6bcdc45f0abc1")}
          >
            <img
              src="assets/images/pngs/homeappliance.jpg"
              width={"100%"}
              height={"100%"}
              class={styles.rounded_img}
              alt=""
            />
          </div>
          <div
            className={styles.rounded_box}
            onClick={() => navigate("/category/6630a32cf82d5a145395270a")}
          >
            <img
              src="assets/images/pngs/fasion.jpg"
              width={"100%"}
              height={"100%"}
              class={styles.rounded_img}
              alt=""
            />
          </div>
          <div
            className={styles.rounded_box}
            onClick={() => navigate("/category/66321227b9dab47b78660afd")}
          >
            <img
              src="assets/images/pngs/accessories.jpg"
              width={"100%"}
              height={"100%"}
              class={styles.rounded_img}
              alt=""
            />
          </div>
          <div
            className={styles.rounded_box}
            onClick={() => navigate("/category/6632051c55cd2e0d030cd965")}
          >
            <img
              src="assets/images/pngs/skincare.jpg"
              width={"100%"}
              height={"100%"}
              class={styles.rounded_img}
              alt=""
            />
          </div>
        </div>
      </Container>

      <CustomCarousel />
      <Container>
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
