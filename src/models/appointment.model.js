const mongoose = require("mongoose");
const validator = require("validator");
const appointmentSchema = new mongoose.Schema({
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
  date: {
    type: String,
    required: true
  },
  vehicle: {
    type: String,
    required: true,
  },
  serviceName: String,
  servicePrice: Number,
  serviceDuration: String,
  status: {
    type: String,
  default: "pending"
  }

});

const Appointment = mongoose.model("Appointment", appointmentSchema);

module.exports = Appointment;
