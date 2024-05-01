import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { cancelOrder, getOrders, getAllOrders } from "../controllers/orderController.js"

const router = express.Router()

router.get("/",protectRoute, getOrders)

router.get("/all",protectRoute, getAllOrders)

router.post("/",protectRoute, cancelOrder)

export default router 