const { Router } = require("express");

const indexRouter = Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date(),
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date(),
  },
];

indexRouter.get("/", (req, res) => {
  res.render("index", { title: "Mini Messageboard", messages: messages });
});

indexRouter.post("/new", (req, res) => {
  messages.push({
    text: req.body.messageText,
    user: req.body.author,
    added: new Date(),
  });
  res.redirect("/");
});

indexRouter.get("/message/:id", (req, res) => {
  const id = parseInt(req.params.id); // Get the id from the URL
  const message = messages[id]; // Access the message from the array

  // If the message does not exist, return a 404 error
  if (!message) {
    return res.status(404).send("Message not found");
  }

  // Render the message details view
  res.render("messageDetails", {
    author: message.user,
    added: message.added,
    messageText: message.text,
  });
});

module.exports = indexRouter;
