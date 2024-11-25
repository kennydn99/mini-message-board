const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }, // Necessary for secure connections in hosted environments
});

// Function to get all messages
const getAllMessages = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM messages ORDER BY created_at DESC"
  );
  return rows;
};

// Function to add a new message
const addMessage = async (text, author) => {
  await pool.query("INSERT INTO messages (content, author) VALUES ($1, $2)", [
    text,
    author,
  ]);
};

// Function to get a message by ID
const getMessageById = async (id) => {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
    id,
  ]);
  return rows[0]; // Return the first result (or undefined if not found)
};

module.exports = { getAllMessages, addMessage, getMessageById };
