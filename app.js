require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const orderRoutes = require("./routes/orderRoutes");
const pool = require("./models/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Optional: Test DB connection on startup
pool
  .connect()
  .then(() => {
    console.log("Database connected successfully");
    // Start the server only after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err);
    process.exit(1);
  });

app.use("/api/orders", orderRoutes);
