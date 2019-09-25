const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();

// Connect to mongoose
mongoose
  .connect("mongodb://localhost/vidjot-dev", {
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => console.log("MongoDB Connected..."))
  .catch(err => console.log(err));

// Load Idea Model
require("./models/Idea"); //bring it
const Idea = mongoose.model("ideas"); // load it into a variable

//Handlebars middleware
app.engine("handlebars", exphbs());
app.set("view engine", "handlebars");

//Index Route
app.get("/", (req, res) => {
  const title = "Welcome";
  res.render("index", {
    title: title
  });
});

//About Route
app.get("/about", (req, res) => {
  res.render("about");
});

const port = 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
