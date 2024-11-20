const express = require("express");
const app = express();
const indexRouter = require("./routes/indexRouter");
const newRouter = require("./routes/newRouter");
const path = require("node:path");

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use("/new", newRouter);
app.use("/", indexRouter);

app.listen(3000, () => {
  console.log("mini message board app - listening on port 3000");
});
