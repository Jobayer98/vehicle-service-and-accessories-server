const express = require("express");
const Product = require("../models/product.model");

const router = express.Router();

router.get("/products", async (req, res) => {
  const aggregatePipeline = [];
  if (req.query.category) {
    aggregatePipeline.push({
      $match: {
        category: req.query.category,
      },
    });
  }

  if (req.query.rating) {
    aggregatePipeline.push({
      $match: {
        rating: {
          $gte: Number(req.query.rating),
        },
      },
    });
  }

  if (req.query.minprice && req.query.maxprice) {
    aggregatePipeline.push({
      $match: {
        price: {
          $gte: Number(req.query.minprice),
          $lte: Number(req.query.maxprice),
        },
      },
    });
  }

  try {
    let products;

    if (aggregatePipeline.length > 0) {
      products = await Product.aggregate(aggregatePipeline);
    } else {
      products = await Product.find();
    }

    if (!products) {
      return res.status(404).send({ errorMessage: "No products found" });
    }

    res.status(200).send(products);
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.post("/product", async (req, res) => {
  const product = new product(req.body);
  try {
    await product.save();

    res.status(201).send({ message: "product added successfully" });
  } catch (error) {
    res.status(400).send({ errorMessage: error.message });
  }
});

router.patch("/products/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "productType",
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
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).send({ errorMessage: "product not found" });
    }

    res.status(200).send({ message: "product updated successfully" });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

router.delete("/products/:id", async (req, res) => {
  try {
    const product = await product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({ errorMessage: "product not found" });
    }

    res.status(200).send({ message: "product deleted successfully" });
  } catch (error) {
    res.status(500).send({ errorMessage: error.message });
  }
});

module.exports = router;
