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

    // Create a new Product object with the uploaded image URL
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

export { createProduct, getProduct, getProducts };