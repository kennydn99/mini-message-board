const { Router } = require("express");
const {
  getAllMessages,
  addMessage,
  getMessageById,
} = require("../db/messages");

const indexRouter = Router();

// GET / - display all messages
indexRouter.get("/", async (req, res) => {
  try {
    const messages = await getAllMessages(); // Fetch messages from the database
    console.log("Fetched messages:", messages);
    res.render("index", { title: "Mini Messageboard", messages });
  } catch (err) {
    console.error("Error in GET /:", err.message);
    res.status(500).send("Error fetching messages");
  }
});

// POST /new - Add a new message
indexRouter.post("/new", async (req, res) => {
  const { messageText, author } = req.body;
  try {
    await addMessage(messageText, author);
    res.redirect("/");
  } catch (err) {
    console.error("Error adding message:", err.message);
    res.status(500).send("Error adding message");
  }
});

// GET /message/:id - Display a single message by ID
indexRouter.get("/message/:id", async (req, res) => {
  const id = parseInt(req.params.id, 10); // Get the id from the URL

  try {
    const message = await getMessageById(id);
    if (!message) {
      return res.status(404).send("Message not found");
    }
    res.render("messageDetails", {
      author: message.author,
      added: message.created_at,
      messageText: message.content,
    });
  } catch (err) {
    console.error("Error fetching message:", err.message);
    res.status(500).send("Error fetching message");
  }
});

module.exports = indexRouter;
