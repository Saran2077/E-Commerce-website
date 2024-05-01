import * as React from "react";
import { Box, Stack, Typography } from "@mui/material";
import AmazonCard from "./card"
import { useNavigate } from "react-router-dom";

export default function CardContainer({ cards, isShowTitle=true, showAll=false,showViewAllButton=true}) {
  cards.products = showAll ? cards.products : cards.products.slice(0, 5)
  const navigate = useNavigate()
  const styles = {
    display: "flex",
    overflowX: "auto", // Enable horizontal overflow
    maxWidth: "100%", // Ensure the container doesn't exceed its parent
    flexWrap: showAll ? "wrap" : "nowrap" // Adjust flexWrap dynamically
  };
  return (
    <Stack>
      {isShowTitle && 
        <Box sx={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
        <Typography variant="h3" ml={1} fontWeight={700}> { cards.title }</Typography>
        { showViewAllButton && <Typography fontSize={16} onClick={() => navigate(`/category/${cards._id}`)} fontWeight={400} ml={1} sx={{cursor: "pointer"}}> View All</Typography>}
        </Box>}
      <div 
        style={styles}
      >
        {cards.products &&
          cards.products.map((card) => (
            <AmazonCard
              key={card.id}
              card={card}
            />
          ))}
      </div>
    </Stack>
  );
}
