import express from "express";
import "dotenv/config";
import connectDB from "./db/connectDB.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import wishListRoutes from "./routes/wishListRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

//Connect with mongoDB
connectDB();

const app = express();
const PORT = process.env.PORT;

// cloudinary for image storing
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
});

// middleware
app.use(express.json({ limit: "50mb" })); // To parse JSON data in req.body
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/product", productRoutes);
app.use("/api/wishlist", wishListRoutes);
app.use("/api/cart", cartRoutes);

app.listen(PORT, () => console.log(`Server is lisenting on Port: ${PORT}`));
