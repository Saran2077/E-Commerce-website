import React from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { Link, Route, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import userAtom from '../atom/userAtom';
import NotAuthorized from '../components/admin/notAuthorized';
import ProductsManagement from '../components/admin/productsManagement';
import CategoryManagement from '../components/admin/categoryManagement';
import OrdersManagement from '../components/admin/ordersManagement';

const AdminDashboard = () => {
  const user = useRecoilValue(userAtom);

  if (!user || user.role !== 1) {
    return <NotAuthorized />;
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Admin Dashboard
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button component={Link} to="/dashboard/products" variant="contained" color="primary" fullWidth>
            Product Management
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button component={Link} to="/dashboard/categories" variant="contained" color="primary" fullWidth>
            Category Management
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button component={Link} to="/dashboard/orders" variant="contained" color="primary" fullWidth>
            Orders Management
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
