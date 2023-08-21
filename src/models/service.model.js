const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  serviceName: String,
  description: String,
  price: Number,
  vehicle: String
});

const Service = mongoose.model("Service", serviceSchema);

module.exports = Service;
