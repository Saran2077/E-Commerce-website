import express from "express"
import protectRoute from "./../middlewares/protectRoute.js"
import { getCart, addToCart, updateCart, deleteFromCart, createCheckoutSession } from "../controllers/cartController.js"

const router = express.Router()

router.get("/", protectRoute, getCart)

router.post("/", protectRoute, addToCart)

router.post("/create-checkout-session", protectRoute, createCheckoutSession)

router.put("/", protectRoute, updateCart)

router.delete("/", protectRoute, deleteFromCart)

export default router