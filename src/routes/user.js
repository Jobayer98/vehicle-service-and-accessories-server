const express = require("express");
//internal module
const User = require("../models/user.model");

const router = express.Router();

router.post("/login", (req, res) => {});

router.post("/register", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ message: "User added successfully" });
  } catch (e) {
    res.status(400).send({ errorMessage: e.message });
  }
});

module.exports = router;
