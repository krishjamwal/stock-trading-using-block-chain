const mongoose = require("mongoose")

const stockSchema = new mongoose.Schema({
  name: String,

  price: Number,

  quantity: Number,

  userId: String,

  buyPrice: {
    type: Number,
    default: 0
  },

  history: [
    {
      time: String,
      price: Number
    }
  ]
})

module.exports = mongoose.model("Stock", stockSchema)
