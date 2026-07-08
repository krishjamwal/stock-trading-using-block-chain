const express = require("express")
const router = express.Router()
const User = require("../models/User")
const jwt = require("jsonwebtoken")

// ================= REGISTER =================
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body

    const newUser = new User({
      username,
      email,
      password
    })

    await newUser.save()

    res.json({ message: "User registered successfully" })
  } catch (error) {
    console.log("ERROR:", error)
    res.status(500).json({ error: error.message })
  }
})


// ================= LOGIN =================
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" })
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(400).json({ message: "User not found" })
    }

    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" })
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1h" }
    )

    // ✅ FIX: SEND USER ID ALSO
    res.json({
      message: "Login successful",
      token: token,
      userId: user._id   // 🔥 IMPORTANT FIX
    })

  } catch (error) {
    console.log("ERROR:", error)
    res.status(500).json({ error: error.message })
  }
})


// ================= PROTECTED =================
const authMiddleware = require("../middleware/authMiddleware")

router.get("/profile", authMiddleware, (req, res) => {
  res.json({
    message: "Protected data",
    user: req.user
  })
})

module.exports = router
