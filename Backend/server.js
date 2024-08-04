const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoute.js");
const categoryRoutes = require("./routes/categoryRoute.js");
const productRoutes = require("./routes/productRoute.js");
const cors = require("cors");

// configure env
dotenv.config();

// Database Connection
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// define routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// create api
app.get("/", (req, res) => {
  res.send({
    message: "wellcome to new project",
  });
});

// Port
const PORT = process.env.PORT || 4000;

// api listenning
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT} `.bgCyan.white);
});
