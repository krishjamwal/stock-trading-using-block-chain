const express = require("express")
const router = express.Router()
const History = require("../models/History")

// ✅ SAVE HISTORY
router.post("/add", async (req, res) => {
  try {
    console.log("BODY:", req.body) // debug

    const { value } = req.body

    if (!value) {
      return res.status(400).json({ message: "Value missing" })
    }

    const newHistory = new History({ value })
    await newHistory.save()

    res.json({ message: "Saved" })
  } catch (err) {
    console.log("ERROR:", err)
    res.status(500).json({ message: "Server error" })
  }
})

// ✅ GET HISTORY
router.get("/", async (req, res) => {
  try {
    const data = await History.find().sort({ date: 1 })
    res.json(data)
  } catch (err) {
    res.status(500).json({ message: "Error fetching history" })
  }
})

module.exports = router
