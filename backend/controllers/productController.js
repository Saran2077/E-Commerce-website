import Product from "./../models/productModel.js";
import Category from "./../models/categoryModel.js";
import {v2 as cloudinary} from 'cloudinary';

const createProduct = async (req, res) => {
  try {
    const { title, description, price, quantity, category, image } = req.body;
    if (!title || !description || !price || !quantity || !category || !image) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    const existingCategory = await Category.findById(category);

    if (!existingCategory) {
      return res.status(404).json({ error: "Category does not exist" });
    }

    const product = new Product({
      title,
      description,
      price,
      quantity,
      category
    });

    const uploadedResponse = await cloudinary.uploader.upload(image)
    product.image = uploadedResponse.secure_url;

    existingCategory.products.push(product._id);

    // Save the product to the database
    await Promise.all([
        product.save(),
        existingCategory.save()
    ])

    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
      
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(`Error in get Product: ${error.message}`);
    }
}

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).populate("category")
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(`Error in get Products: ${error.message}`)
  }
}

const deleteProduct = async (req, res) => {
  try {
    console.log("Inside delete")
    const { id } = req.params 
    const product = await Product.findByIdAndDelete(id)
    res.status(200).json({ message: "Product deleted successfully" })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(`Error in delete Product: ${error.message}`)
  }
}

const updateProduct = async (req, res) => {
  try {
    const { newProduct } = req.body
    const { id } = req.params;
    const product = await Product.findById(id);

    

    if(!product) {
      return res.status(404).json({ error: "Product does not exist" })
    }

    if (newProduct.image) {
      await cloudinary.uploader.destroy(product.image.split("/").pop().split(".")[0])
      
      const uploaderImage = await cloudinary.uploader.upload(newProduct.image);
      newProduct.image = uploaderImage.secure_url
    }
    else {
      newProduct.image = product.image
    }
    const updatedProduct = await Product.findByIdAndUpdate(id, newProduct)
    res.status(200).json({ message: "Product updated successfully", newProduct })
  } catch (error) {
    console.log(`Error in update product: ${error.message}`)
  }
}

export { createProduct, getProduct, getProducts, deleteProduct, updateProduct };