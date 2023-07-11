const mongoose = require("mongoose");

const fuelSchema = new mongoose.Schema({
  fuelType: String,
  quantity: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  price: {
    type: Number,
    required: true,
  },
  shopName: String,
  shopLocation: String,
});

const Fuel = mongoose.model("Fuel", fuelSchema);

module.exports = Fuel;
