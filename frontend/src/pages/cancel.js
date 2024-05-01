import React from 'react';
import { Typography, Button, Container, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const TransactionFailedPage = () => {
  return (
    <Container maxWidth="sm" sx={{ textAlign: 'center', marginTop: '4rem', margin: 'auto', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <Box sx={{ color: 'red', marginBottom: '2rem' }}>
        <ErrorOutlineIcon sx={{ fontSize: '4rem' }} />
      </Box>
      <Typography variant="h4" gutterBottom>
        Transaction Failed
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '2rem' }}>
        Oops! Something went wrong with your transaction. Please try again later.
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

export default TransactionFailedPage;
