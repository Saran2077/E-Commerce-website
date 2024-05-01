const isAdmin = async (req, res, next) => {
    try {
        const user = req.user
        if(user.role === 0) {
            return res.status(401).json({ error: "UnAuthorised"})
        }
        next()
    } catch (error) {
        console.log(`Error in isAdmin: ${error.message}`)
    }
}

export default isAdmin