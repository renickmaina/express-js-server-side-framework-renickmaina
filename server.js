const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const logger = require("./middleware/log");
const errorHandler = require("./utility/errorHandler");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(logger);

// Connect DB
connectDB();

// Routes
app.use("/api/products", require("./routes/ProductRoutes"));

// Default route
app.get("/", (req, res) => {
  res.send("API Server for Express.js is up and running ");
});

// Error handling middleware
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
