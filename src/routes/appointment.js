const express = require("express");
const Appointment = require("../models/appointment.model")

const router = express.Router();

router.post("/appointment", async (req, res) => {
  try {
    const appointment = await Appointment.create(req.body);
    res.status(201).send(appointment);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.get("/my-bookings", async (req, res) => {
  try {
    const bookings = await Appointment.find();

    if (!bookings || bookings.length === 0) {
      return res.status(404).send();
    }

    res.status(200).send(bookings);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.get("/my-bookings/:id", async (req, res) => {
  try {
    const bookings = await Appointment.find({_id: req.params.id});

    if (!bookings || bookings.length === 0) {
      return res.status(404).send();
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
    const booking = await Appointment.findById(req.params.id);

    updates.forEach((update) => (booking[update] = req.body[update]));
    await booking.save();

    res.status(200).send(booking);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.delete("/my-bookings/:id", async (req, res) => {
  try {
    const booking = await Appointment.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).send({ errorMessage: "Booking not found" });
    }
    res.send({status: true});
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
