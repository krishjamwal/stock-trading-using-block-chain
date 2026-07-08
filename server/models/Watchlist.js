const mongoose = require("mongoose")

const watchlistSchema = new mongoose.Schema({
  userId: String,
  name: String
})

module.exports = mongoose.model("Watchlist", watchlistSchema)
