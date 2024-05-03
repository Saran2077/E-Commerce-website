import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import isAdmin from "../middlewares/isAdmin.js"
import { cancelOrder, getOrders, getAllOrders, placeOrder, getBillingAddress, updateStatus } from "../controllers/orderController.js"

const router = express.Router()

router.get("/",protectRoute, getOrders)

router.get("/all", protectRoute, isAdmin, getAllOrders)

router.post("/",protectRoute, cancelOrder)

router.post("/placeOrder",protectRoute, placeOrder)

router.post("/status",protectRoute, isAdmin, updateStatus)

router.get("/address/:stripeId",protectRoute, getBillingAddress)

export default router 