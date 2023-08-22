const mongoose = require("mongoose");
const validator = require("validator");
const bookingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  phone: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  vehicle: {
    type: String,
    required: true
  },
  description: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
  default: "pending"
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
