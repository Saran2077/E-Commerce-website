import Order from "../models/orderModel.js"

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
        await order.save()

        res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in cancelOrder: ${error.message}`)
    }
}

export { getOrders, cancelOrder } 