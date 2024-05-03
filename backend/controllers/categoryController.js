import Category from "../models/categoryModel.js";

const createCategory = async (req, res) => {
    try {
        const { title, description } = req.body 
        if(!title) {
            return res.json({ error: "Title is Required" });
        }
        if(!description) {
            return res.json({ error: "Description is Required" });
        }
        const existingCategory = await Category.findOne({ title })
        if(existingCategory) {
            return res.status(400).json({ error: "Category already exists" })
        }
        // create new category
        const category = new Category({ title, description })
        
        await category.save()

        res.status(201).json(category)
    } catch (error) {
        console.log(`Error in create Category: ${error.message}`)
        res.status(500).json({ error: error.message })
    }
}

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate({
            "path": "products"
        })
        categories.forEach(category => {
            category.products = shuffleArray(category.products);
        });

        res.status(200).json(categories)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getCategories: ${error.message}`)
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const getCategory = async (req, res) => {
    try {
        const { id } = req.params
        const category = await Category.findById(id).populate({
            "path": "products"
        })
        if(!category) {
            return res.status(404).json({ error: "Category not found" })
        }
        category.products = shuffleArray(category.products);

        res.status(200).json(category)
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in getCategory: ${error.message}`)
    }
}

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params
        const { newCategory } = req.body

        const category = await Category.findById(id)

        if (!category) {
            return res.status(404).json({ error: "Category not found" })
        }

        category.title = newCategory.title
        category.description = newCategory.description

        await category.save()

        res.status(200).json({ message: "Category updated successfully", category : category })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in updateCategory: ${error.message}`)
    }
}

export { createCategory, getCategories, getCategory, updateCategory }