// import NavBar from "../components/home/navBar";
// import * as React from 'react';
// import Card from '@mui/material/Card';
// import CardActionArea from '@mui/material/CardActionArea';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import CardContainer from "./../components/commons/cardContainer"
// const HomePage = () => {
//   return (
//   <div className="p-0 m-0 w-full">
//     <NavBar />
//     <CardContainer />
//   </div>
//   )
// };

// export default HomePage;



import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardMedia, CardContent, Box, CircularProgress } from '@mui/material';
import CardContainer from '../components/commons/cardContainer';
import NavBar from '../components/home/navBar';
import Stack from '@mui/material/Stack';
import Banner from '../components/home/banner';


const Home = () => {
  const [categories, setCategories] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getCategory = async() => {
      try {
        const res = await fetch("/api/category")
        const data = await res.json()
        setCategories(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
       }
    }
    getCategory()
  }, [])

  if (isLoading) {
    return (
      <Box sx={{display: "grid", placeContent: "center", minHeight: "100%"}}>
        <CircularProgress disableShrink />
      </Box>
    )
  }

  return (
    <div>
      <NavBar />
      <Banner />
      <Container maxWidth="xl">
      <Stack mt={4}>
        {categories.length > 0 && categories.map((category) => {
          return <CardContainer cards={category} />
        })}
      </Stack>
      </Container>
    </div>
  );
}

export default Home;
