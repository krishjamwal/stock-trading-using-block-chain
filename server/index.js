const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const cron = require("node-cron")
const Stock = require("./models/Stock")

const app = express()

// ✅ MIDDLEWARE FIRST (FIXED ORDER)
app.use(cors({
  origin: [
    "http://localhost:5174",
    "http://localhost:5177",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "http://127.0.0.1:5174"
  ],
  credentials: true
}))
app.use(express.json())

// ✅ ROUTES AFTER MIDDLEWARE
const authRoutes = require("./routes/authRoutes")
const stockRoutes = require("./routes/stockRoutes")
const historyRoutes = require("./routes/history")
const watchlistRoutes = require("./routes/watchlist")

app.use("/api/auth", authRoutes)
app.use("/api/stocks", stockRoutes)
app.use("/api/history", historyRoutes)
app.use("/api/watchlist", watchlistRoutes) // ✅ moved down

// MongoDB connection
mongoose.connect("mongodb://ajayjamwal401_db_user:f97jLayRPfjTkM91@ac-8w08dzs-shard-00-00.0jimkhv.mongodb.net:27017,ac-8w08dzs-shard-00-01.0jimkhv.mongodb.net:27017,ac-8w08dzs-shard-00-02.0jimkhv.mongodb.net:27017/stockapp?ssl=true&replicaSet=atlas-4h5h0o-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err))


// 🔄 AUTO UPDATE STOCK PRICES EVERY 5 MINUTES
cron.schedule("*/5 * * * *", async () => {
  try {

    console.log("Updating stock prices...")

    const stocks = await Stock.find()

    for (let stock of stocks) {

      // Random change between -5 and +5
      const change = Math.floor(Math.random() * 11) - 5

      // Update price
      stock.price = Math.max(
        1,
        Number(stock.price) + change
      )

      // Save price history for graph
      stock.history.push({
        time: new Date().toLocaleTimeString(),
        price: stock.price
      })

      // Keep only last 12 updates
      // 12 × 5 minutes = 60 minutes
      if (stock.history.length > 12) {
        stock.history.shift()
      }

      await stock.save()
    }

    console.log("Stock prices updated successfully")

  } catch (error) {
    console.log("Cron Error:", error)
  }
})
// Test route
app.get("/", (req, res) => {
  res.send("Backend running 🚀")
})

app.listen(5000, () => {
  console.log("Server running on port 5000")
})

