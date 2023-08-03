const express = require("express");
const Booking = require("../models/booking.model");

const router = express.Router();

router.post("/book-now", async (req, res) => {
  try {
    const booking = await Booking.create(req.body);
    res.status(201).send(booking);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.get("/my-bookings/:email", async (req, res) => {
  try {
    const bookings = await Booking.find({ userEmail: req.params.email });

    if (!bookings || bookings.length === 0) {
      return res.status(404).send({ errorMessage: "No bookings found" });
    }

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.patch("/my-bookings/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["bookingDate", "description"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ errorMessage: "Invalid updates" });
  }

  try {
    const booking = await Booking.findById(req.params.id);

    updates.forEach((update) => (booking[update] = req.body[update]));
    await booking.save();

    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.delete("/my-bookings/:id", async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ errorMessage: "Booking not found" });
    }
    res.send(booking);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
