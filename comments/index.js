const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require('axios')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
const commentsByPostId = {};
app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments",async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id, content });

  await axios.post("http://localhost:4005/events", {
    type:"CommentCreated",
    data:{
      id, content, postId: req.params.id
    }
  })
  commentsByPostId[req.params.id] = comments;
  res.status(201).send(comments);
});


//to receive the emmited events
app.post("/events", (req, res) => {
  console.log("BODY OF REQUEST IS:", req.body);
  res.send({})
});

app.listen(4001, () => {
  console.log("Posts server listening on 4001");
});
