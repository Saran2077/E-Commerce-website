import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true
    },
    description: {
        type: String 
    },
    products: [
        { 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Product',
            default: []
        }
    ]
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;