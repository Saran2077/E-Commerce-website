import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import ProductsManagement from '../components/admin/productsManagement';
import CategoryManagement from '../components/admin/categoryManagement';
import OrdersManagement from '../components/admin/ordersManagement';

const AdminDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [categoryFormData, setCategoryFormData] = useState({
        title: '',
        description: ''
    });

    return (
        <Container>
            {/* <ProductsManagement />
           <CategoryManagement /> */}
           <OrdersManagement />
        </Container>
    );
};

export default AdminDashboard;
