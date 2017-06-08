const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  description: String,
  color: String,
  size: String,
  image_url: String,
  created_at: {
    type: Date,
    default: Date.now()
  },
  updated_at: {
    type: Date,
    default: Date.now()
  }
})

let Item = mongoose.model('Item', itemSchema)

module.exports = Item