const mongoose = require("mongoose");

const carServiceSchema = new mongoose.Schema({
  serviceName: String,
  description: String,
  price: Number,
});

const carService = mongoose.model("carService", carServiceSchema);

module.exports = carService;
