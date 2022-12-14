const mongoose = require('mongoose')
const Schema = mongoose.Schema

const book = new Schema({
  author: String,
  publisher: String,
  isbn: String,
  title: String,
  year: Number,
})

module.exports = mongoose.model('book', book)
