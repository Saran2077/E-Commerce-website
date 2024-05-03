import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
} from "@mui/material";
import { Add as AddIcon, Edit, Image } from "@mui/icons-material";
import { toast } from "react-toastify";
import userAtom from "../../atom/userAtom.js"
import NotAuthorized from './notAuthorized.js';
import { useRecoilValue } from 'recoil';

const CategoryManagement = () => {
  const [categories, setCategories] = useState([]);
  const [openCategoryDialog, setOpenCategoryDialog] = useState(false);
  const user = useRecoilValue(userAtom);
  const [categoryFormData, setCategoryFormData] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/category");
      const data = await response.json();
      if (data) {
        setCategories(data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleAddCategory = async () => {
    try {
      const res = await fetch("/api/category/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryFormData),
      });
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      }
      fetchCategories();
      setCategoryFormData({ title: "", description: "" });
      setOpenCategoryDialog(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  const handleEditCategory = (data) => {
    setOpenCategoryDialog(true);
    setCategoryFormData({ ...data });
  };

  const handleEdit = async () => {
    try {
      const res = await fetch(`/api/category/${categoryFormData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newCategory: categoryFormData }),
      });
      const data = await res.json();
      if (data.error) return toast.error(data.error);
      setOpenCategoryDialog(false);
      toast.success(data.message);

      setCategories(
        categories.map((category) => {
          if (category._id === categoryFormData._id) {
            return data.category;
          }
          return category;
        })
      );
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCategoryFormChange = (e) => {
    setCategoryFormData({
      ...categoryFormData,
      [e.target.name]: e.target.value,
    });
  };

  if (!user || user.role !== 1) {
      return <NotAuthorized />;
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Category Management
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={() => setOpenCategoryDialog(true)}
      >
        Add Category
      </Button>

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
                  <IconButton onClick={() => handleEditCategory(category)}>
                    <Edit />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openCategoryDialog}
        onClose={() => setOpenCategoryDialog(false)}
        fullWidth
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          <TextField
            label="Title"
            name="title"
            value={categoryFormData.title}
            onChange={handleCategoryFormChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={categoryFormData.description}
            onChange={handleCategoryFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategoryDialog(false)}>Cancel</Button>
          <Button onClick={openCategoryDialog ? handleEdit : handleAddCategory} color="primary">
            {!openCategoryDialog ? "Add" : "Update"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CategoryManagement;
