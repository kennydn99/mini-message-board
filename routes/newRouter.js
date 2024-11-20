const { Router } = require("express");

const newRouter = Router();

newRouter.get("/", (req, res) => {
  res.send("This is the new message page, from newRouter!");
});

module.exports = newRouter;
