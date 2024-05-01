import React, { useState, useEffect, useRef } from "react";
import {
  Container,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Input,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Add as AddIcon, Delete as DeleteIcon, Edit, Image } from "@mui/icons-material";
import usePreviewImg from "../hooks/usePreviewImg.js";
import { toast } from "react-toastify";

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [openProductDialog, setOpenProductDialog] = useState(false);
  const [productFormData, setProductFormData] = useState({
    title: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    image: "",
  });
  const fileRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const { imgUrl, handleImageChange, setImgUrl } = usePreviewImg();

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch("/api/category");
      const data = await res.json();
      setCategories(data);
      console.log("fetch", data);
    } catch (error) {
      console.error("Error in fetching categories:", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/product");
      const data = await response.json();
      if(data) {
          setProducts(data);
      }
      console.log(data)
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddProduct = async () => {
    try {
      productFormData.image = imgUrl;
      const response = await fetch("/api/product/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      });
      const data = await response.json();
      if (data.error) {
        return toast.error(data.error);
      }
      fetchProducts();
      setProductFormData({
        title: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        image: "",
      });
      setOpenProductDialog(false);
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (data) => {
    setOpenProductDialog(true)
    setProductFormData({...data})
  }

  const handleEdit = async () => {
    try {
      const res = await fetch("/api/product", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productFormData),
      })
    } catch (error) {
      toast.error(error)
    }
  }

  const handleDeleteProduct = async (productId) => {
    try {
      await fetch(`/api/product/${productId}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleProductFormChange = (e) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
  };

  const handleCategoryFormChange = (e) => {
    setProductFormData({ ...productFormData, category: e.target.value });
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Product Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenProductDialog(true)}
      >
        Add Product
      </Button>

      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell><img height={"100px"} width={"100px"} src={product.image} /></TableCell>
                <TableCell>{product.title}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{product.category.title}</TableCell>
                <TableCell>
                  <IconButton disabled={true} onClick={() => handleDeleteProduct(product._id)}>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleEditProduct(product)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openProductDialog}
        onClose={() => setOpenProductDialog(false)}
        fullWidth
      >
        <DialogTitle>Add Product</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
          fullWidth
        >
          <TextField
            label="Title"
            name="title"
            value={productFormData.title}
            onChange={handleProductFormChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={productFormData.description}
            onChange={handleProductFormChange}
            fullWidth
          />
          <TextField
            label="Price"
            name="price"
            value={productFormData.price}
            onChange={handleProductFormChange}
            fullWidth
          />
          <TextField
            label="Quantity"
            name="quantity"
            value={productFormData.quantity}
            onChange={handleProductFormChange}
            fullWidth
          />
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={productFormData.category}
              label="category"
              onChange={handleCategoryFormChange}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Input
            type="file"
            ref={fileRef}
            hidden
            onChange={handleImageChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProductDialog(false)}>Cancel</Button>
          <Button onClick={openProductDialog ? handleEdit: handleAddProduct} color="primary">
            {openProductDialog ? "Update" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ProductsManagement;
