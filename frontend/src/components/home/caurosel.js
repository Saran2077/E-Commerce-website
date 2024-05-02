// import React from "react";
// import { Carousel } from "react-responsive-carousel";
// import "react-responsive-carousel/lib/styles/carousel.min.css";
// import { Typography, Paper, Container } from "@mui/material";
// import { useNavigate } from "react-router-dom";
// import styles from "./curosel.module.css"; // Import your CSS module

// const CustomCarousel = () => {
//   const navigate = useNavigate();

//   return (
//     <div className={styles.carouselContainer}>
//       <Carousel
//         showArrows={true}
//         showThumbs={false}
//         showStatus={false}
//         autoPlay
//         interval={5000}
//         infiniteLoop
//       >
//         {/* <div className={styles.carouselItem}>
//           <Paper
//             className={styles.carouselPaper}
//             style={{
//               backgroundImage:
//                 "url('https://img.freepik.com/free-vector/abstract-blue-background-with-curve-lines_53876-117179.jpg?t=st=1714594082~exp=1714597682~hmac=c378caafaffd7995324ca90bc69d7723f0ccc6520a2830232efcdbd77cfdf68b&w=1380')",
//             }}
//           >
//             <Container className={styles.content}>
//               <Typography
//                 variant="h2"
//                 align="center"
//                 style={{ fontWeight: 700, color: "#fff" }}
//               >
//                 Revolutionize your home <br /> with our modern appliances.
//               </Typography>
//               <img
//                 src="https://img.freepik.com/premium-psd/living-room-have-sofa-decoration-3d-rendering_252032-387.jpg?w=1380"
//                 alt="Home Appliances"
//               />
//             </Container>
//           </Paper>
//         </div> */}
//         <div className={styles.carouselItem}>
//           <Paper
//             className={styles.carouselPaper}
//             style={{
//               backgroundImage:
//                 "url('https://img.freepik.com/premium-photo/cosmetic-face-mask-spa-procedures-girl-with-mask-her-face-pink-background-banner_164357-11860.jpg?w=1380')",
//               objectFit: "cover",
//               backgroundRepeat: "no-repeat",
//             }}
//           >
//             <Container className={styles.content}>
//               <Typography
//                 variant="h2"
//                 align="center"
//                 style={{ fontWeight: 700, color: "#fff" }}
//               >
//                 Pamper Your Skin, <br /> Pamper Yourself.
//               </Typography>
//             </Container>
//           </Paper>
//         </div>
//       </Carousel>
//     </div>
//   );
// };

// export default CustomCarousel;

import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Typography, Paper, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import styles from "./curosel.module.css"; // Import your CSS module

const CustomCarousel = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.carouselContainer}>
      <Carousel
        showArrows={true}
        showThumbs={false}
        showStatus={false}
        // autoPlay
        interval={5000}
        infiniteLoop
      >
        <div className={styles.carouselItem}>
          <Paper
            className={styles.carouselPaper}
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-vector/abstract-blue-background-with-curve-lines_53876-117179.jpg?t=st=1714594082~exp=1714597682~hmac=c378caafaffd7995324ca90bc69d7723f0ccc6520a2830232efcdbd77cfdf68b&w=1380')",
            }}
          >
                    <Container className={styles.content}>
          
          <Typography
            variant="h2"
            align="center"
            style={{ fontWeight: 700, color: "#fff" }}
          >
            Revolutionize your home <br /> with our modern appliances.
          </Typography>
          <img
            className={styles.carouselImg}
            src="https://img.freepik.com/free-psd/comfortable-modern-chair-isolated_176382-1216.jpg?t=st=1714602218~exp=1714605818~hmac=c165eeed34b805bf637bfb2ff7b1ad446eb5d90452c17faff7399b10276bf9ea&w=826"
          ></img>
        </Container>
    
          </Paper>
        </div>
        <div className={styles.carouselItem}>
          <Paper
            className={styles.carouselPaper}
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/photographic-pink-gradient-seamless-studio-backdrop-background_1258-102468.jpg?t=st=1714599592~exp=1714603192~hmac=4b74bdf99e8824d6d3d54529804d43187996830b9664cb1dc93a175676abeb40&w=1380')",
              backgroundSize: "cover",
              height: "100%", // Ensure full height
            }}
          >
            <Container className={styles.content}>
              <img
                className={styles.carouselImg}
                src="https://img.freepik.com/free-photo/woman-towel-making-cucumber-eye-mask_1187-5486.jpg?t=st=1714599443~exp=1714603043~hmac=07dc3cfaf43be5ce365d9e0caa1406387a4cb1bf6397494df1e9f4669d63ff21&w=740"
              ></img>
              <Typography
                variant="h2"
                align="center"
                style={{ fontWeight: 700, color: "#fff" }}
              >
                Pamper Your Skin, <br /> Pamper Yourself.
              </Typography>
            </Container>
          </Paper>
        </div>
        <div className={styles.carouselItem}>
          <Paper
            className={styles.carouselPaper}
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products_1258-63752.jpg?t=st=1714598705~exp=1714602305~hmac=88ab425a741fc07edcc155c62f1adcc89eec76fa75c2d2d3142603c6faf02fdd&w=1800')",
              backgroundSize: "cover",
              height: "100%", // Ensure full height
            }}
          >
            <Container className={styles.content}>
          
              <Typography
                variant="h2"
                align="center"
                style={{ fontWeight: 700, color: "#fff" }}
              >
                Elevate Your Look, <br /> Elevate Your Life.
              </Typography>
              <img
                className={styles.carouselImg}
                src="https://img.freepik.com/free-photo/closeup-female-wearing-beautiful-silver-necklace_181624-23666.jpg?t=st=1714601750~exp=1714605350~hmac=7c1d3fee953e7cd879ed713ea4b6d0a0243e6141008ce56181b18b4a447643a0&w=740"
              ></img>
            </Container>
          </Paper>
        </div>
        <div className={styles.carouselItem}>
          <Paper
            className={styles.carouselPaper}
            style={{
              backgroundImage:
                "url('https://img.freepik.com/free-photo/empty-photographer-studio-background-abstract-background-texture-beauty-dark-light-clear-blue-cold-gray-snowy-white-gradient-flat-wall-floor_1258-88221.jpg?t=st=1714598990~exp=1714602590~hmac=376f08966e1a72a58e0507ef3b0a0f8061cafb46bfda9435a6d66fcf5d07cba3&w=1380')",
              backgroundSize: "cover",
              height: "100%", // Ensure full height
            }}
          >
              <Container className={styles.content}>
              <img
                className={styles.carouselImg}
                src="assets/images/pngs/fashion.png"
              ></img>
              <Typography
                variant="h2"
                align="center"
                style={{ fontWeight: 700, color: "#fff" }}
              >
                 Dare to be different, <br /> embrace your uniqueness.
              </Typography>
            </Container>
        
          </Paper>
        </div>
      </Carousel>
    </div>
  );
};

export default CustomCarousel;
