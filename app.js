// WARNING: Only use this in development!
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const orderRoutes = require("./routes/orderRoutes");
const pool = require("./models/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// DB connection check
pool
  .query("SELECT NOW()")
  .then(() => {
    console.log("✅ Connected to Supabase Postgres DB");

    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
    process.exit(1);
  });

app.use("/api/orders", orderRoutes);
