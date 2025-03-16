import User from "../models/user.model.js"
import bcrypt from "bcryptjs"

import { generateToken } from "../lib/utils.js"
import cloudinary from "../lib/cloudinary.js"
import { set } from "mongoose"
let count = 0
const incorrectCredentials = ["Uhhhh.... That wasn't right?", "Woops, that wasn't right", "Hmmmm.... That wasn't right", "You uhhhh.... didn't get that right", "Hmmmm.... Try again?", "Woops, try again?", "Hmmmm.... Try again?"]
// Importing functions
export const signup = async (req, res) => {
  const { fullName, email, password, age } = req.body
  try {
    if (!fullName) return res.status(400).json({ message: "Full name is required" })
    if (!email) return res.status(400).json({ message: "Email is required" })
    if (!password) return res.status(400).json({ message: "Password is required" })
    if (age < 18 || age > 100) return res.status(400).json({ message: "Age must be between 18 and 100" })
    if (password.length < 6) return res.status(400).json({ message: "Password must be at least 6 characters long" })

    const user = await User.findOne({ email })

    if (user) return res.status(400).json({ message: "Someone's already got that, is it you? LOGIN!" })

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const correctedName = fullName
      .trim()
      .split(" ")
      .map((name) => name.charAt(0).toUpperCase() + name.slice(1).toLowerCase())
      .join(" ")

    const newUser = new User({
      fullName: correctedName,
      email,
      password: hashedPassword,
      age,
      loginAttempts: 0
    })

    if (newUser) {
      generateToken(newUser._id, res)
      await newUser.save()

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
        age: newUser.age
      })
    } else {
      return res.status(400).json({ message: "Invalid user data" })
    }
  } catch (error) {
    console.log("Error in signup controller", error.message)
    res.status(500).json({ message: "Woops, there was a server error! My bad!" })
  }
}

export const login = async (req, res) => {
  const randomIndex = Math.floor(Math.random() * incorrectCredentials.length)
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    let count = user.loginAttempts
    if (!user) {
      return res.status(400).json({ message: `${incorrectCredentials[randomIndex]}` })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (!isPasswordCorrect && count >= 5) {
      return res.status(400).json({ message: "You've tried too many times, try again later" })
    } else if (!isPasswordCorrect) {
      count++
      user.loginAttempts = count
      await user.save()
      return res.status(400).json({ message: `${incorrectCredentials[randomIndex]}` })
    } else if (isPasswordCorrect && email) {
      count = 0
      user.loginAttempts = count
      await user.save()
    }

    generateToken(user._id, res)
    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      profilePic: user.profilePic,
      age: user.age,
      loginAttempts: count
    })
  } catch (error) {
    res.status(500).json({ message: "Woops, there was a server error! My bad!" })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(200).json({ message: "Logged out successfully, see you soon!" })
  } catch (error) {
    console.log("Error in logout controller", error.message)
    res.status(500).json({ message: "Woops, there was a server error! My bad!" })
  }
}

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body
    const userId = req.user._id

    if (!profilePic) return res.status(400).json({ message: "Profile picture is required" })

    const uploadResponse = await cloudinary.uploader.upload(profilePic)
    const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true })

    res.status(200).json(updatedUser)
  } catch (error) {
    console.log("Error in updateProfile controller", error.message)
    res.status(500).json({ message: "Woops, there was a server error! My bad!" })
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user)
  } catch (error) {
    res.status(500).json({ message: "Woops, there was a server error! My bad!" })
  }
}
