const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

const posts = {};

const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    const comment = post.comments.find((c) => {
      return c.id === id;
    });
    comment.status = status;
    comment.content = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log(" type, body type, body type, body", req.body);
  handleEvent(type, data);
  res.send({});
});

app.listen(4002, async () => {
 try {
  console.log("Posts server listening on 4002");
  const res = await axios.get('http://localhost:4005/events')
  for(let event of res.data){
    console.log("processing event", event.type);
    handleEvent(event.type, event.data)
  }
 } catch (error) {
  console.log("error is ", error)
 }
});
