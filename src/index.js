const express = require("express");

// internal module
require("./config/db");
const fuelRoutes = require("./routes/fuel");
const serviceRoutes = require("./routes/service");
const userRoutes = require("./routes/user");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(fuelRoutes);
app.use(serviceRoutes);
app.use(userRoutes);

app.use((error, req, res, next) => {
  if (error) {
    return res.status(500).send({ errorMessage: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
