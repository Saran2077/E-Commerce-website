import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Banner = () => {
    const navigate = useNavigate()
  return (
    <div style={{ height: '90vh', overflow: 'hidden' }}>
      <Carousel showArrows={true} showThumbs={false} showStatus={false} autoPlay interval={5000} infiniteLoop>
        <div onClick={() => navigate(`/category/6630a32cf82d5a145395270a`)}>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://marketplace.canva.com/EAFVHstxnwk/1/0/1600w/canva-beige-aesthetic-exclusive-fashion-wear-collection-clothing-banner-BZb4KkCdNP0.jpg" alt="Image 1" />
          <Paper elevation={3} style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
            <Typography variant="h4" gutterBottom>
              Featured Collection
            </Typography>
            <Typography variant="body1">
              Explore our latest arrivals and discover your new favorites.
            </Typography>
          </Paper>
        </div>
        <div onClick={() => navigate(`/category/662fe737dcf6bcdc45f0abc1`)}>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://www.elryan.com/img/0/0/resize/vaimo/carousel/images/m/a/main-banner-mobile-_-_-_-_-en.jpg" alt="Image 2" />
          <Paper elevation={3} style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
            <Typography variant="h4" gutterBottom>
              Limited-Time Offer
            </Typography>
            <Typography variant="body1">
              Don't miss out! Shop now and enjoy exclusive discounts.
            </Typography>
          </Paper>
        </div>
        <div onClick={() => navigate("/category/6630a407f82d5a1453952716")}>
          <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="https://images.unsplash.com/opengraph/1x1.png?blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1628102491629-778571d893a3%3Fblend%3D000000%26blend-alpha%3D10%26blend-mode%3Dnormal%26crop%3Dfaces%252Cedges%26h%3D630%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fh%253D84%2526txt%253Dgrocery%252Bstore%2526txt-align%253Dmiddle%25252Cleft%2526txt-clip%253Dellipsis%2526txt-color%253D000000%2526txt-pad%253D80%2526txt-size%253D40%2526txt-width%253D660%2526w%253D750%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26mark-align%3Dmiddle%252Ccenter%26mark-w%3D750%26w%3D1200%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8NHx8Z3JvY2VyeSUyMHN0b3JlfGVufDB8fHx8MTcxNDQ0NzY1M3ww%26ixlib%3Drb-4.0.3&blend-w=1&h=630&mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-align=top%2Cleft&mark-pad=50&mark-w=64&w=1200&auto=format&fit=crop&q=60" alt="Image 3" />
          <Paper elevation={3} style={{ position: 'absolute', bottom: '20px', padding: '10px' }}>
            <Typography variant="h4" gutterBottom>
              Limited-Time Offer
            </Typography>
            <Typography variant="body1">
              Don't miss out! Shop now and enjoy exclusive discounts.
            </Typography>
          </Paper>
        </div>
        {/* Add more slides as needed */}
      </Carousel>
    </div>
  );
};

export default Banner;
