require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const orderRoutes = require('./routes/orderRoutes');
const pool = require('./models/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Log environment variables for debugging (without sensitive data)
console.log('Environment check:');
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_NAME:', process.env.DB_NAME);
console.log('DB_PORT:', process.env.DB_PORT);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Optional: Test DB connection on startup
pool.connect()
  .then((client) => {
    console.log('Database connected successfully');
    client.release();
    // Start the server only after DB connection
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err.message);
    console.error('Error code:', err.code);
    console.error('Error detail:', err.detail);
    console.error('Error hint:', err.hint);
    
    // In production, you might want to exit, but for debugging, let's continue
    if (process.env.NODE_ENV === 'production') {
      console.error('Exiting due to database connection failure in production');
      process.exit(1);
    } else {
      console.log('Continuing without database connection for development...');
      const PORT = process.env.PORT || 5000;
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (without database)`);
      });
    }
  });

app.use('/api/orders', orderRoutes);