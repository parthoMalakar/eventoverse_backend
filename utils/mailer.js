const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail", // or use SMTP config
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOrderEmail = async (order) => {
  const mailOptions = {
    from: `"Weddingz Site" <${process.env.EMAIL_USER}>`,
    to: "ronitdasakard@gmail.com", //reciepent/
    subject: `New Event Order from ${order.full_name}`,
    html: `
      <h2>New Order Received</h2>
      <p><strong>Name:</strong> ${order.full_name}</p>
      <p><strong>Email:</strong> ${order.email}</p>
      <p><strong>Event:</strong> ${order.event_type}</p>
      <p><strong>Phone:</strong> ${order.phone_number}</p>
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Message:</strong> ${order.message}</p>
      <p><strong>Subscribed:</strong> ${order.subscribe ? "Yes" : "No"}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
};

module.exports = { sendOrderEmail };
