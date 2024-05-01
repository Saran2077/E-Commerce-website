// import React from 'react';
// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css';
// import { Typography, Paper } from '@mui/material';
// import { useNavigate } from 'react-router-dom';

// const Banner = () => {
//     const navigate = useNavigate()
//   return (
//     <div style={{ height: '90vh', overflow: 'hidden' }}>
//       <Carousel showArrows={true} showThumbs={false} showStatus={false} autoPlay interval={5000} infiniteLoop>
//         <div onClick={() => navigate(`/category/6630a32cf82d5a145395270a`)}>
//           <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://marketplace.canva.com/EAFGKRRskMs/1/0/1600w/canva-brown-and-beige-minimalist-fashion-banner-lYcbGpUSVGo.jpg" alt="Image 1" />
//           <Paper elevation={3} style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
//             <Typography variant="h4" gutterBottom>
//               Featured Collection
//             </Typography>
//             <Typography variant="body1">
//               Explore our latest arrivals and discover your new favorites.
//             </Typography>
//           </Paper>
//         </div>
//         <div onClick={() => navigate(`/category/662fe737dcf6bcdc45f0abc1`)}>
//           <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/83d1d6125057525.61116ac594b08.png" alt="Image 2" />
//           <Paper elevation={3} style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
//             <Typography variant="h4" gutterBottom>
//               Limited-Time Offer
//             </Typography>
//             <Typography variant="body1">
//               Don't miss out! Shop now and enjoy exclusive discounts.
//             </Typography>
//           </Paper>
//         </div>
//         <div onClick={() => navigate("/category/6632051c55cd2e0d030cd965")}>
//           <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://media.licdn.com/dms/image/D5612AQGH1yzV3kKscA/article-cover_image-shrink_720_1280/0/1705072784506?e=2147483647&v=beta&t=7U63QMQrTdRZQVKFm_gz8ZdD8u-XAMoLKmif9mmEUNY" alt="Image 3" />
//           <Paper elevation={3} style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
//             <Typography variant="h4" gutterBottom>
//               Limited-Time Offer
//             </Typography>
//             <Typography variant="body1">
//               Don't miss out! Shop now and enjoy exclusive discounts.
//             </Typography>
//           </Paper>
//         </div>
//         {/* Add more slides as needed */}
//       </Carousel>
//     </div>
//   );
// };

// export default Banner;

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Paper, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        height: "90vh",
        overflow: "hidden",
        background: "linear-gradient(to,right, rgb(246,217,79), rgb(246,217,77), rgb(246,218,76),rgb(247,219,75), rgb(253,224,64), rgb(253,227,74),rgb(227,197,13),rgb(188,159,5))",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          src="assets/images/pngs/banner.png"
          alt="Image 2"
        />
        <Paper
          elevation={3}
          style={{
            position: "absolute",
            padding: "10px",
            left: "15%",
            backgroundColor: "transparent",
            boxShadow: "none",
          }}
        >
          <Typography
            component={"div"}
            sx={{ fontSize: "60px", fontWeight: 700, textAlign: "center" }}
            gutterBottom
          >
            Explore the Wide Range <br /> of Electronics
          </Typography>
          <Typography
            component={"div"}
            sx={{ fontSize: "20px", fontWeight: 700, textAlign: "center" }}
          >
            Don't miss out! Shop now and enjoy exclusive discounts.
          </Typography>
          <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
          <Button
            variant="contained"
            onClick={() => navigate("/category/662fe737dcf6bcdc45f0abc1")}
            sx={{
              width: "200px",
              marginTop: "20px",
              justifyContent: "center",
              display: "flex",
              padding: 1,
              borderRadius: "30px",
              backgroundColor: "#fb641b",
              color: "#fff",
              fontWeight: "bold",
              boxShadow: "0 1px 4px rgba(0, 0, 0, 0.3)",
              "&:hover": {
                backgroundColor: "#fb641b",
              },
            }}
          >
            Shop now
          </Button>
          </div>
     
        </Paper>
      </div>
    </div>
  );
};

export default Banner;