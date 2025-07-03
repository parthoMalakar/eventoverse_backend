// controllers/orderController.js
const pool = require("../models/db");
const { sendOrderEmail } = require("../utils/mailer");

const getOrders = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM orders");
    res.json(result.rows);
  } catch (err) {
    console.error("GET /api/orders error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

const addOrder = async (req, res) => {
  const {
    full_name,
    email,
    event_type,
    phone_number,
    date,
    message,
    subscribe,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (
        full_name,
        email,
        event_type,
        phone_number,
        date,
        message,
        subscribe
      ) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
      [full_name, email, event_type, phone_number, date, message, subscribe]
    );

    await sendOrderEmail({
      full_name,
      email,
      event_type,
      phone_number,
      date,
      message,
      subscribe,
    });

    res.json({
      id: result.rows[0].id,
      full_name,
      email,
      event_type,
      phone_number,
      date,
      message,
      subscribe,
    });
  } catch (err) {
    console.error("POST /api/orders error:", err);
    res.status(500).json({ error: err.message || "Internal Server Error" });
  }
};

// ✅ Export both
module.exports = { getOrders, addOrder };
