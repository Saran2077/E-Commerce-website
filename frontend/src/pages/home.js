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
    <>
      <Banner />
      <Container maxWidth="lg">
      <Stack mt={4}>
        {categories.length > 0 && categories.map((category) => {
          return <CardContainer cards={category} />
        })}
      </Stack>
      </Container>
    </>
  );
}

export default Home;
