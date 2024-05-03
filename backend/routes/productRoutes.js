import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import protectRoute from "../middlewares/protectRoute.js";
import { createProduct, getProduct, getProducts, deleteProduct, updateProduct } from "../controllers/productController.js";

const router = express.Router()

router.get("/", getProducts)

router.post("/create", protectRoute, isAdmin, createProduct)

router.get("/:id", getProduct)

router.put("/:id", protectRoute, isAdmin, updateProduct)

router.delete("/:id", deleteProduct)

export default router