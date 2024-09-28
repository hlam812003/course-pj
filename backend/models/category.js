const mongoose = require('mongoose')
const categorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
  })
  
exports.Category = mongoose.model('Category', categorySchema)
  