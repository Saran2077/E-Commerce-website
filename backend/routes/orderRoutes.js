import express from "express"
import protectRoute from "../middlewares/protectRoute.js"
import { cancelOrder, getOrders } from "../controllers/orderController.js"

const router = express.Router()

router.get("/",protectRoute, getOrders)

router.post("/",protectRoute, cancelOrder)

export default router 