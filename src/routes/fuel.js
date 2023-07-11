const express = require("express");
const Fuel = require("../models/fuel.model");

const router = express.Router();

router.get("/fuels", async (req, res) => {
  try {
    const fuels = await Fuel.find();

    if (!fuels) {
      return res.status(404).send({ errorMessage: "No fuels found" });
    }

    res.status(200).send(fuels);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.post("/fuel", async (req, res) => {
  const fuel = new Fuel(req.body);
  try {
    await fuel.save();

    res.status(201).send({ message: "Fuel added successfully" });
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
});

router.patch("/fuels/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "fuelType",
    "quantity",
    "price",
    "shopName",
    "shopLocation",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ errorMessage: "Invalid updates" });
  }

  try {
    const fuel = await Fuel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!fuel) {
      return res.status(404).send({ errorMessage: "Fuel not found" });
    }

    res.status(200).send({ message: "Fuel updated successfully" });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.delete("/fuels/:id", async (req, res) => {
  try {
    const fuel = await Fuel.findByIdAndDelete(req.params.id);

    if (!fuel) {
      return res.status(404).send({ errorMessage: "Fuel not found" });
    }

    res.status(200).send({ message: "Fuel deleted successfully" });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
