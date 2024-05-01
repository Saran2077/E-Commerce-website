import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const TransactionSuccessPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '4rem', margin: 'auto', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ color: 'green', marginBottom: '2rem' }}>
        <CheckCircleIcon sx={{ fontSize: '4rem' }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Transaction Successful!
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        Thank you for your purchase. Your order has been successfully processed.
      </Typography>
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/"
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default TransactionSuccessPage;
