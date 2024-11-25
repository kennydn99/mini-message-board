const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false }, // Necessary for secure connections in hosted environments
});

// Function to get all messages
const getAllMessages = async () => {
  try {
    const { rows } = await pool.query(
      "SELECT * FROM messages ORDER BY created_at DESC"
    );
    return rows;
  } catch (error) {
    console.error("Error fetching messages:", error.message); // Log error
    throw error; // Re-throw the error to be caught by the calling function
  }
};

// Function to add a new message
const addMessage = async (text, author) => {
  try {
    await pool.query("INSERT INTO messages (content, author) VALUES ($1, $2)", [
      text,
      author,
    ]);
  } catch (error) {
    console.error("Error adding message:", error.message); // Log error
    throw error;
  }
};

// Function to get a message by ID
const getMessageById = async (id) => {
  try {
    const { rows } = await pool.query("SELECT * FROM messages WHERE id = $1", [
      id,
    ]);
    return rows[0]; // Return the first result (or undefined if not found)
  } catch (error) {
    console.error("Error fetching message by ID:", error.message); // Log error
    throw error;
  }
};

module.exports = { getAllMessages, addMessage, getMessageById };
