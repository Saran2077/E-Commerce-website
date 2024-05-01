import express from "express";
import { createCategory, getCategories, getCategory } from "../controllers/categoryController.js";
import protectRoute from "../middlewares/protectRoute.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = express.Router()

router.get("/", getCategories)

router.get("/:id", getCategory)

router.post("/create", protectRoute, isAdmin, createCategory)

export default router