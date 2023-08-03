const mongoose = require("mongoose");
const validator = require("validator");
const bookingSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    trim: true,
  },
  userEmail: {
    type: String,
    required: true,
    trim: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error("Invalid email");
      }
    },
  },
  userPhone: {
    type: String,
    required: true,
    trim: true,
  },
  userAddress: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
