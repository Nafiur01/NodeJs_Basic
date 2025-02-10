const express = require("express");

const app = express();

// listen for requests
app.listen(3000);

// register view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  const blogs = [];
  res.render("index", { title: "Homepage", blogs: blogs });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create Blog" });
});

app.use((req, res) => {
  res.status(404).sendFile("./view/404.html", { root: __dirname });
});
