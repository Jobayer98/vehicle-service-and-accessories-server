const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: String,
  price: {
    type: Number,
    required: true,
    min: [1, "Price must be above 1"],
  },

  rating: {
    type: Number,
    default: 0,
  },
  quantity: {
    type: Number,
    default: 1,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
