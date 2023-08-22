const stripe = require("stripe")(process.env.PAYMENT_SK);
const express = require("express");
const router = express.Router();

const Payment = require("../models/payment.model");

router.post("/create-payment-intent", async (req, res) => {
  const calculateOrderAmount = (items) => {
    const totalPrice = items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    return totalPrice;
  };
  // Create a PaymentIntent with the order amount and currency
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: calculateOrderAmount(req.body.product) * 100,
      currency: "usd",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    await Payment.create({
      transactionId: paymentIntent.id,
      amount: calculateOrderAmount(req.body.product),
      userEmail: req.body.email,
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.get("/payment-history", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.send(payments);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
