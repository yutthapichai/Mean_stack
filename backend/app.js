const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");

mongoose
  .connect("mongodb://localhost:27017/testdb")
  .then(() => {
    console.warn("Connected to database");
  })
  .catch(() => {
    console.warn("Connection failed");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// โค้ดรวม host angular and nodejs ไม่ทำงาน
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.get("/", function(req, res, next) {
  // Handle the get for this route
});


app.post("/api/posts", (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then((result) => {
    console.log(result);
    res
      .status(200)
      .json({
        message: "Post add success",
        postId: result._id
      });
  });
  console.log('postserver' + post);
});

app.use("/api/gets", (req, res, next) => {
  Post.find()
    .then((data) => {
      res.status(200).json({
        message: "Get fetch success",
        posts: data
      });
    });
});

app.delete('/api/posts/:id',(req, res, next) => {
  console.warn('ID has been deleted ' + req.params.id);
  Post.deleteOne({_id: req.params.id}).then(result => {
    console.log(result);
    res.status(200).json({ message: 'Post deleted!' });
  });
});

module.exports = app;
