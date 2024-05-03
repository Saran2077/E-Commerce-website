import express from "express";
import { createCategory, getCategories, getCategory, updateCategory } from "../controllers/categoryController.js";
import protectRoute from "../middlewares/protectRoute.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router()

router.get("/", getCategories)

router.get("/:id", getCategory)

router.put("/:id", protectRoute, isAdmin, updateCategory)

router.post("/create", protectRoute, isAdmin, createCategory)

export default router