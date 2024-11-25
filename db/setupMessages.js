#!/usr/bin/env node

const { Client } = require("pg"); // Import the pg Client
require("dotenv").config();

// Define the SQL to create the table and seed it with data
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  content TEXT NOT NULL,
  author VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO messages (content, author) 
VALUES
  ('Hello, world!', 'Admin'),
  ('This is a persistent message.', 'User1'),
  ('PostgreSQL is awesome!', 'User2')
ON CONFLICT DO NOTHING; -- Prevent duplicate inserts
`;

async function main() {
  console.log("Setting up messages table...");

  // Initialize the client with connection info from your .env file
  const client = new Client({
    connectionString: process.env.DB_URL, // Ensure this is set in your .env file
    ssl: {
      rejectUnauthorized: false, // Necessary for most hosted databases like Railway or Heroku
    },
  });

  try {
    await client.connect(); // Connect to the database
    await client.query(SQL); // Run the SQL commands
    console.log("Messages table created and seeded.");
  } catch (err) {
    console.error("Error setting up the messages table:", err.message);
  } finally {
    await client.end(); // Close the database connection
  }
}

main();
