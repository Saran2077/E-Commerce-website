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
  Input
} from "@mui/material";
import { Add as AddIcon, Edit, Image } from "@mui/icons-material";
import usePreviewImg from "../../hooks/usePreviewImg.js";
import { toast } from "react-toastify";
import { useRecoilValue } from 'recoil';
import userAtom from "../../atom/userAtom.js"
import NotAuthorized from "./notAuthorized.js";

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
  const user = useRecoilValue(userAtom);

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
      productFormData.image = imgUrl
      const res = await fetch(`/api/product/${productFormData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({newProduct: productFormData}),
      })
      const data = await res.json();
      if (data.error) return toast.error(data.error)
      setOpenProductDialog(false)
      toast.success(data.message)

      setProducts(products.map((product) => {
        if (product._id === productFormData._id) {
          return data.newProduct;
        }
        return product
      }))
    } catch (error) {
      toast.error(error)
    }
  }

  const handleProductFormChange = (e) => {
    setProductFormData({ ...productFormData, [e.target.name]: e.target.value });
  };

  const handleCategoryFormChange = (e) => {
    setProductFormData({ ...productFormData, category: e.target.value });
  };

  if (!user || user.role !== 1) {
      return <NotAuthorized />;
  }

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
