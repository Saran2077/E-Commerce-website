import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

const cardStyles = {
  height: 350,
  width: 300, // Set fixed width for the card
  margin: "1rem",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, background-color 0.3s ease", // Include background-color transition
  position: "relative", // Set position relative to handle z-index
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "rgba(0, 0, 0, 0.05)", // Change background color on hover
  },
};

const mediaStyles = {
  height: 200, // Set fixed height for the media
  position: "relative", // Set position relative
  zIndex: 1, // Ensure image stays above the card background
};

export default function AmazonCard({ card }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${card._id}`);
  };

  return (
    <Card sx={cardStyles} onClick={handleClick}>
      <CardActionArea>
        <CardMedia sx={mediaStyles} image={card.image} title={card.title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {card.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h3">
            Price: ₹{card.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
