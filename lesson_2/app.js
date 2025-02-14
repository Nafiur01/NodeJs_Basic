const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const { render } = require("ejs");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

// database connection
const dbURL =
  "mongodb+srv://<username>:<pass>@nodetutorial.js6fv.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=NodeTutorial";
mongoose
  .connect(dbURL)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// register view engine
app.set("view engine", "ejs");

// middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

// mongoose and add mongoose sandbox routes
// app.get("/add-blog", (req, res) => {
//   const blog = new Blog({
//     title: "New blog 3",
//     snippet: "about my new blog",
//     body: "more about my new blog",
//   });

//   blog
//     .save()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// app.get("/all-blog", (req, res) => {
//   Blog.find()
//     .then((result) => res.send(result))
//     .catch((err) => console.log(err));
// });

// app.get("/single-blog", (req, res) => {
//   Blog.findById("67accf027c6c927fe7be1133")
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => console.log(err));
// });

app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

// blog routes
app.use("/blogs", blogRoutes);

app.use((req, res) => {
  res.status(404).render("404", { title: "404 Page" });
});
