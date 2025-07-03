# Event Backend

A simple Express backend for handling contact form submissions and storing them in a MySQL database.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the root directory with your database credentials (see `.env` example).
3. Make sure you have a MySQL database and a `contacts` table:
   ```sql
   CREATE TABLE contacts (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL,
     message TEXT NOT NULL,
     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
   );
   ```
4. Start the server:
   ```bash
   npm start
   ```

## API

- `POST /api/contact`
  - Body: `{ "name": "...", "email": "...", "message": "..." }`
  - Response: `{ "message": "Contact submitted successfully." }` 