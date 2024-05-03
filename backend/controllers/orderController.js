import { Stripe } from "stripe";
import Order from "./../models/orderModel.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getOrders = async (req, res) => {
    try {
        const user = req.user._id 
        const orders = await Order.find({ user }).populate("products.product").sort({ createdAt: -1 })
        if (orders.length <= 0) {
            return res.status(404).json({ error: "Order not found" })
        }
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getOrder: ${error.message}`)
    }
}

const cancelOrder = async (req, res) => {
    try {
        const { orderId, productId } = req.body;
        const user = req.user._id
        const order = await Order.findById(orderId)
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }
        if(order.user.toString() != user.toString()) {
            return res.status(401).json({ error: "Unauthorized" })
        }
        order.products = order.products.filter(product => product.product != productId)
        if(order.products.length === 0) {
            await Order.findByIdAndDelete(order._id)
        }
        else {
            await order.save()
        }

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in cancelOrder: ${error.message}`)
    }
}

const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({}).populate("products.product").sort({ createdAt: -1 })
        if (orders.length <= 0) {
            return res.status(404).json({ error: "Order not found" })
        }
        res.status(200).json(orders)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in get all orders: ${error.message}`)
    }
}

const placeOrder = async (req, res) => {
    try {
        const { order } = req.body 
        console.log(order)
        
        const newOrder = new Order({
            user: order.user,
            products: order.products,
            totalAmount: order.totalAmount,
            stripeId: order.stripeId
          });

          await newOrder.save();
          res.status(200).json({ message: "Order placed successfully"})

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in place order: ${error.message}`)
    }
}

const getBillingAddress = async (req, res) => {
    try {
        const { stripeId } = req.params
        const order = await stripe.checkout.sessions.retrieve(stripeId)
        if (!order) {
            return res.status(404).json({ error: "Order not found" })
        }

        res.status(200).json({ address: order.customer_details.address })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getBillingAddress: ${error.message}`)
    }
}

const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body;
        const order = await Order.findById(orderId)

        if(!order) {
            return res.status(404).json({ error: "Order not found" })
        }

        order.status = status
        await order.save()

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in updateStatus: ${error.message}`)
    }
}

export { getOrders, cancelOrder, getAllOrders, placeOrder, getBillingAddress, updateStatus } 