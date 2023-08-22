const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  transactionId: {
    type: String,
  },
  userEmail: {
    type: String,
  },
});

const Payment = mongoose.model("Payment", paymentSchema);

module.exports = Payment;
