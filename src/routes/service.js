const express = require("express");
const Service = require("../models/service.model");

const router = express.Router();

router.get("/services", async (req, res) => {
  try {
    const services = await Service.find({});

    if (!services) {
      return res.status(404).send({ errorMessage: "No services found" });
    }

    res.status(200).send(services);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.post("/service", async (req, res) => {
  const service = new Service(req.body);
  try {
    await service.save();
    res.status(201).send({ message: "Service added successfully" });
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
});

router.patch("/services/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["serviceName", "description", "price", "location"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ errorMessage: "Invalid updates" });
  }

  try {
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!service) {
      return res.status(404).send({ errorMessage: "Service not found" });
    }

    res.status(200).send({ message: "Service updated successfully" });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.delete("/services/:id", async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);

    if (!service) {
      return res.status(404).send({ errorMessage: "Service not found" });
    }

    res.status(200).send({ message: "Service deleted successfully" });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
