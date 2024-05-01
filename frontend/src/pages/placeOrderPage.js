import React, { useState } from 'react';
import { Card, CardContent, Typography, TextField, Button } from '@mui/material';

const PlaceOrderPage = ({ products }) => {
  const [address, setAddress] = useState('');

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePayNow = () => {
    // Add logic to handle payment process
    console.log('Payment process initiated');
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Place Your Order
      </Typography>
      <Card variant="outlined" sx={{ marginBottom: '1rem' }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Delivery Address
          </Typography>
          <TextField
            id="address"
            label="Enter Address"
            variant="outlined"
            fullWidth
            value={address}
            onChange={handleAddressChange}
          />
        </CardContent>
      </Card>
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Ordered Products
          </Typography>
          {products.map((product) => (
            <Typography key={product.id} variant="body1" gutterBottom>
              {product.name} - ₹{product.price}
            </Typography>
          ))}
        </CardContent>
      </Card>
      <Button
        variant="contained"
        color="primary"
        onClick={handlePayNow}
        sx={{ marginTop: '1rem' }}
      >
        Pay Now
      </Button>
    </div>
  );
};

export default PlaceOrderPage;
