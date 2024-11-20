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
  console.log(req.body);
  res.redirect("/");
});

module.exports = indexRouter;
