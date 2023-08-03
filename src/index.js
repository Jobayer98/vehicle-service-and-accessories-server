const express = require("express");

// internal module
require("./config/db");
const fuelRoutes = require("./routes/fuel");
const serviceRoutes = require("./routes/service");
const userRoutes = require("./routes/user");
const productRoutes = require("./routes/products");
const bookingRoutes = require("./routes/booking");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fuelRoutes);
app.use(serviceRoutes);
app.use(userRoutes);
app.use(productRoutes);
app.use(bookingRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
