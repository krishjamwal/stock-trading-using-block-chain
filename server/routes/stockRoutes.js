const express = require("express")
const router = express.Router()
const Stock = require("../models/Stock")
const authMiddleware = require("../middleware/authMiddleware")
const Transaction = require("../models/Transaction")

// ➕ ADD STOCK
router.post("/add", authMiddleware, async (req, res) => {
  try {
    const { name, price, quantity } = req.body

   const stock = new Stock({
  name,
  price,
  quantity,
  userId: req.user.id,

  history: [
    {
      time: new Date().toLocaleTimeString(),
      price: Number(price)
    }
  ]
})

    await stock.save()

    res.json({ message: "Stock added", stock })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 📥 GET STOCKS
router.get("/", authMiddleware, async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.user.id })
    res.json(stocks)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🟢 BUY STOCK (FIXED)
router.post("/buy", authMiddleware, async (req, res) => {
  const { id, quantity } = req.body

  const stock = await Stock.findById(id)

  if (!stock) {
    return res.status(404).json({ message: "Stock not found" })
  }

  stock.quantity += quantity
  stock.buyPrice = stock.price
  await stock.save()

  await Transaction.create({
  userId: req.user.id,
  stockName: stock.name,
  type: "buy",
  quantity,
  price: stock.price
})

  res.json({ message: "Stock bought", stock })
})

// 🔴 SELL STOCK (FIXED)
router.post("/sell", authMiddleware, async (req, res) => {
  const { id, quantity } = req.body

  const stock = await Stock.findById(id)

  if (!stock) {
    return res.status(404).json({ message: "Stock not found" })
  }

  if (stock.quantity < quantity) {
    return res.status(400).json({ message: "Not enough stock" })
  }

  stock.quantity -= quantity
  await stock.save()

  await Transaction.create({
  userId: req.user.id,
  stockName: stock.name,
  type: "sell",
  quantity,
  price: stock.price
})

  res.json({ message: "Stock sold", stock })
})

// 📊 PORTFOLIO VALUE
router.get("/portfolio", authMiddleware, async (req, res) => {
  try {
    const stocks = await Stock.find({ userId: req.user.id })

    let totalValue = 0

    stocks.forEach(stock => {
      totalValue += stock.price * stock.quantity
    })

    res.json({
      totalValue,
      totalStocks: stocks.length,
      stocks
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 📜 GET TRANSACTIONS
router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const transactions = await Transaction.find({
      userId: req.user.id
    }).sort({ date: -1 })

    res.json(transactions)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
})

// 🔄 PRICE UPDATE SIMULATION
router.post("/update-prices", authMiddleware, async (req, res) => {
  try {

    const stocks = await Stock.find({
      userId: req.user.id
    })

    for (let stock of stocks) {

      // Random price change between -5 and +5
      const change = Math.floor(Math.random() * 11) - 5

      // Prevent price from going below 1
      stock.price = Math.max(1, Number(stock.price) + change)

      await stock.save()
    }

    res.json({
      message: "Prices updated successfully"
    })

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})
router.get("/:id", authMiddleware, async (req, res) => {
  try {

    const stock = await Stock.findById(req.params.id)

    if (!stock) {
      return res.status(404).json({
        message: "Stock not found"
      })
    }

    res.json(stock)

  } catch (error) {
    res.status(500).json({
      error: error.message
    })
  }
})

module.exports = router
