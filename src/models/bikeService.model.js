const mongoose = require("mongoose");

const bikeServiceSchema = new mongoose.Schema({
  serviceName: String,
  description: String,
  price: Number,
});

const bikeService = mongoose.model("bikeService", bikeServiceSchema);

module.exports = bikeService;
