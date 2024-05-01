import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  product: 
  { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Product', 
    required: true 
  },
  quantity: { 
    type: Number, 
    default: 1 
  },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    cart: [cartItemSchema],
    wishlist:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
      default: []
    }],
    role: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;