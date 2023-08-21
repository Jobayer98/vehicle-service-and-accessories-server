require("dotenv").config();
const express = require("express");
const cors = require("cors");

// internal module
require("./config/db");
const serviceRoutes = require("./routes/service");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const bookingRoutes = require("./routes/booking");
const appiontment = require("./routes/appointment");
const paymentRoutes = require("./routes/payment");

const app = express();
const port = process.env.PORT || 9000;

app.use(cors());
app.use(express.json());
app.use(serviceRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(bookingRoutes);
app.use(appiontment);
app.use(paymentRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
