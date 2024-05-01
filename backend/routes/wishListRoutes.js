import express from 'express';
import protectRoute from '../middlewares/protectRoute.js';
import { addRemoveWishlist, getWishList } from '../controllers/wishListController.js';

const router = express.Router()

router.get("/", protectRoute, getWishList)

router.post("/", protectRoute, addRemoveWishlist)

export default router 