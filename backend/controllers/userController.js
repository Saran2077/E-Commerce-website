import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js";
import User from "./../models/userModel.js"
import bcrypt from "bcrypt"

const signUp = async (req, res) => {
    try {
        const { name, email, password, phone } = req.body;
        if (!name) {
            return res.json({ error: "Name is Required" });
          }
          if (!email) {
            return res.json({ error: "Email is Required" });
          }
          if (!password) {
            return res.json({ error: "Password is Required" });
          }
          if (!phone) {
            return res.json({ error: "Phone no is Required" });
          }

          //check for existing users with same email
          const existingUser = await User.findOne({ email })
          if (existingUser) {
            return res.status(200).json({ error: "User already exisits"})
          }

          //hash the password
          const salt = await bcrypt.genSalt(10)
          const hashedPassword = await bcrypt.hash(password, salt)

          const newUser = new User({
            name,
            email,
            password: hashedPassword,
            phone
          })

          await newUser.save()
          generateTokenAndSetCookie(newUser._id, res)
          res.status(200).json(newUser)
          
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log(`Error in SignUp: ${error.message}`)
    }
}

const login = async (req, res) => {
  try {
    console.log("Inside login")
    const { email, password } = req.body;
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ error: "User does not exist" })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch) {
      res.status(404).json({ error: "Password is not match" })
    }
    generateTokenAndSetCookie(user._id, res)
    res.status(200).json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log(`Error in Login: ${error.message}`)
  }
}
const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {maxAge:1})
    res.status(200).json({ message: "Logout Successfully" })
  } catch (error) {
    console.log(`Error in logout: ${error.message}`)
  }
}

export { signUp, login, logout }