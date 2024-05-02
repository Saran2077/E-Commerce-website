import * as React from "react";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Link, useNavigate } from "react-router-dom";

const cardStyles = {
  height: 350,
  width: 300, 
  margin: "1rem",
  borderRadius: "10px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  transition: "transform 0.3s ease, background-color 0.3s ease", 
  position: "relative", 
  "&:hover": {
    transform: "scale(1.05)",
    backgroundColor: "rgba(0, 0, 0, 0.05)", 
  },
};

const mediaStyles = {
  height: 200, 
  position: "relative", 
  zIndex: 1, 
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
            {card.title.slice(0, 30)}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="h3">
            Price: ₹{card.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
