const express    = require("express");
const app        = express();
const bodyParser = require("body-parser");


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



app.post("/api/postss", (req, res, next) => {
  const post = req.body;
  console.warn(post);
  res.json({
    message: "Post add success"
  });
  next();
});




app.use("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "dsadadad",
      title: "this is the first server",
      content: "this is comming from the server one"
    },
    {
      id: "dsadasdsaddad",
      title: "this is the two running",
      content: "this is comming from the server two"
    }
  ];
  res.status(200).json({
    message: "Get fetch success",
    posts: posts
  });
});



module.exports = app;
