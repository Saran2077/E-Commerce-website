import User from "./../models/userModel.js"

const getWishList = async (req, res) => {
    try {
        const user = req.user 
        const wishlist = await User.findById(user._id).populate("wishlist")
        res.status(200).json(wishlist.wishlist)
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(`Error in get wishlist: ${error.message}`)
    }
}

const addRemoveWishlist = async (req, res) => {
    try {
        const user = req.user 
        const { productId } = req.body;
        let wishlist;
        if(user.wishlist.includes(productId)) {
            wishlist = await User.findByIdAndUpdate(user._id, {
                $pull: { wishlist: productId }
            })
            user.wishlist = user.wishlist.filter((id) => id != productId)
            res.status(200).json({ message: "Removed from wishlist", wishlist: user.wishlist })
        }
        else {
            wishlist = await User.findByIdAndUpdate(user._id, {
                $push: { wishlist: productId }
            })
            user.wishlist.push(productId)
            res.status(200).json({ message: "Added to wishlist", wishlist: user.wishlist })
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
        console.log(`Error in get wishlist: ${error.message}`)
    }
}

export { getWishList, addRemoveWishlist }