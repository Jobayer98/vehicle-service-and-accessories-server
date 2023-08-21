const stripe = require("stripe")(process.env.PAYMENT_SK);
const express = require("express");
const router = express.Router();

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
      // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
