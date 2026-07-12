const express = require("express")
const router = express.Router()
const Watchlist = require("../models/Watchlist")

// ADD
router.post("/add", async (req, res) => {
  const { userId, name } = req.body

  const item = new Watchlist({ userId, name })
  await item.save()

  res.json({ message: "Added" })
})

// GET
router.get("/", async (req, res) => {
  const items = await Watchlist.find({ userId: req.query.userId })
  res.json(items)
})

// DELETE
router.post("/remove", async (req, res) => {
  await Watchlist.deleteOne({ _id: req.body.id })
  res.json({ message: "Removed" })
})

module.exports = router
