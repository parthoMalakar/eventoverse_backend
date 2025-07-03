// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Correct path to controller and names
const { getOrders, addOrder } = require("../controllers/orderController");

// GET /api/orders
router.get("/", getOrders);

// POST /api/orders
router.post("/", addOrder);

module.exports = router;
