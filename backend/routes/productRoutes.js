import express from "express";
import isAdmin from "../middlewares/isAdmin.js";
import protectRoute from "../middlewares/protectRoute.js";
import { createProduct, getProduct, getProducts } from "../controllers/productController.js";

const router = express.Router()

router.get("/", getProducts)

router.post("/create", protectRoute, isAdmin, createProduct)

router.get("/:id", getProduct)

export default router