import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions, TextField, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, IconButton } from '@mui/material';
import { Add as AddIcon, Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { toast } from 'react-toastify';
import ProductsManagement from './productsManagement';
// import axios from 'axios';

const AdminDashboard = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
    const [categoryFormData, setCategoryFormData] = useState({
        title: '',
        description: ''
    });

    useEffect(() => {
        fetchCategories();
        // fetchProducts();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await fetch('/api/category');
            const data = await response.json();
            if(data) {
                setCategories(data)
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch('/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleAddCategory = async () => {
        try {
            const res = await fetch('/api/category/create', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(categoryFormData)
            });
            const data = await res.json()
            if(data.error) {
                toast.error(data.error)
            }
            fetchCategories();
            setCategoryFormData({ title: '', description: '' });
            setOpenCategoryDialog(false);
        } catch (error) {
            console.error('Error adding category:', error);
        }
    };

    const handleDeleteCategory = async (categoryId) => {
        try {
            await fetch(`/api/category`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categoryId })
            });
            fetchCategories();
        } catch (error) {
            console.error('Error deleting category:', error);
        }
    };

    const handleCategoryFormChange = (e) => {
        setCategoryFormData({ ...categoryFormData, [e.target.name]: e.target.value });
    };

    return (
        <Container>
            <ProductsManagement />
            {/* <Typography variant="h4" gutterBottom>Category Management</Typography>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => setOpenCategoryDialog(true)}>Add Category</Button>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {categories.map((category) => (
                            <TableRow key={category._id}>
                                <TableCell>{category.title}</TableCell>
                                <TableCell>{category.description}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => handleDeleteCategory(category._id)}><DeleteIcon /></IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            <Dialog open={openCategoryDialog} onClose={() => setOpenCategoryDialog(false)} fullWidth>
                <DialogTitle>Add Category</DialogTitle>
                <DialogContent sx={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    <TextField label="Title" name="title" value={categoryFormData.title} onChange={handleCategoryFormChange} fullWidth />
                    <TextField label="Description" name="description" value={categoryFormData.description} onChange={handleCategoryFormChange} fullWidth />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
                    <Button onClick={handleAddCategory} color="primary">Add</Button>
                </DialogActions>
            </Dialog> */}
        </Container>
    );
};

export default AdminDashboard;
