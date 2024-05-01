import Product from "../models/productModel.js";
import User from "./../models/userModel.js"
import { Stripe } from "stripe"
import Order from "./../models/orderModel.js"

const getCart = async (req, res) => {
    try {
        const user = req.user;
        const cart = await User.findById(user._id).populate("cart.product")
        res.status(200).json(cart.cart)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getCart: ${error.message}`)
    }
}

const addToCart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        const user = req.user;
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" })
        }
        const existingProduct = user.cart?.filter((product) => product.product == productId)

        if (existingProduct.length > 0) {
            user.cart = user.cart?.map(product => {
                if (product.product == productId) {
                    product.quantity += quantity
                }
                return product
            })
        }
        else {
            user.cart.push({ product: productId, quantity })
        }
        await user.save()
        res.status(200).json({message: "Added to cart successfully", cart: user.cart})
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in addToCart: ${error.message}`)
    }
}

const updateCart = async (req, res) => {
    try {
        const user = req.user
        const { productId, quantity } = req.body
        const existingProduct = user.cart?.filter((product) => product.product == productId)
        if (!existingProduct) {
            return res.status(404).json({ error: "Product not found" })
        }
        user.cart = user.cart?.map(product => {
            if(product.product == productId) {
                return { product: productId, quantity: quantity}
            }
            return product
        })
        await user.save()
        res.status(200).json(user.cart)
        

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in updateCart: ${error.message}`)
    }
}

const deleteFromCart = async (req, res) => {
    try {
        const user = req.user 
        const { productId } = req.body
        user.cart = user.cart?.filter(product => product.product!= productId)
        await user.save()
        res.status(200).json({cart: user.cart})
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in deleteFromCart: ${error.message}`)
    }
}

const createCheckoutSession = async (req, res, next) => {
    try {
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
        const { products } =  req.body
        const lineItems = products.map((item) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: item.product.title,
                    images: [item.product.image] 
                },
                unit_amount: item.product.price * 100
            },
            quantity: item.quantity
        }))

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        })
        next()
        res.status(200).json({ id: session.id })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in createCheckoutSession: ${error.message}`)
    }
}

const addOrders = async (req, res) => {
  try {
    const { user, products, totalAmount } = req.body;

    const newOrder = new Order({
      user,
      products,
      totalAmount,
    });
    console.log(newOrder)
    await newOrder.save();
  } catch (error) {
    console.log(`Error in add Orders: ${error.message}`);
  }
};


export { getCart, addToCart, updateCart, deleteFromCart, createCheckoutSession, addOrders }