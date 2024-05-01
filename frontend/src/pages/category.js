import { Box, CircularProgress, Container } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CardContainer from '../components/commons/cardContainer'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NavBar from '../components/home/navBar'

const Category = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(null)
  const { cid } = useParams()
  useEffect(() => {
    if(!cid) return 
    const getCategory = async () => {
        try {
            const res = await fetch(`/api/category/${cid}`)
            const data = await res.json()
            if (data.error) return toast.error(data.error)
            setCategory(data)
        } catch (error) {
            toast.error(error)
            console.error(error)
        } finally {
          setIsLoading(false)
        }
    }
    getCategory()
  }, [cid])

  if (isLoading) {
    return (
      <Box sx={{display: "grid", placeContent: "center", minHeight: "100%"}}>
        <CircularProgress disableShrink />
      </Box>
    )
  }

  return (
    <Container sx={{alignContent: "center"}} maxWidth={"xl"}>
        {category && <CardContainer cards={category} showAll={true} showViewAllButton={false} />}
    </Container>
  )
}

export default Category