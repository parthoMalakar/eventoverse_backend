# Event Backend

A simple Express backend for handling event orders and storing them in a PostgreSQL database.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env` file in the root directory with your database credentials:
   ```env
   # Database Configuration
   DB_USER=your_db_user
   DB_HOST=your_db_host
   DB_NAME=your_db_name
   DB_PASSWORD=your_db_password
   DB_PORT=5432

   # Application Configuration
   NODE_ENV=development
   PORT=5000
   ```

3. Make sure you have a PostgreSQL database and an `orders` table:
   ```sql
   CREATE TABLE orders (
     id SERIAL PRIMARY KEY,
     event_id VARCHAR(255) NOT NULL,
     user_id VARCHAR(255) NOT NULL,
     quantity INTEGER NOT NULL,
     total_amount DECIMAL(10,2) NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```

4. Start the server:
   ```bash
   npm start
   ```

## API

- `GET /api/orders` - Retrieve all orders
- `POST /api/orders` - Create a new order
  - Body: `{ "eventId": "...", "userId": "...", "quantity": 1, "totalAmount": 99.99 }`
  - Response: `{ "message": "Order created successfully." }`

## Deployment

This application is configured for deployment on Choreo. The database credentials are managed through Choreo secrets:

1. Create a secret named `db-password-secret` in your Choreo project
2. Add a key named `password` with your database password
3. Deploy the application through Choreo console 