const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const app = expres();

app.use(bodyParser.json());
const posts = {};
app.get("/posts", (res, res) => {
  return res.send(posts);
});

app.post("/posts", (res, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    is,
    title,
  };
  res.status(201).send(posts[id]);
});

app.listen(4000, () => {
  console.log("Posts server listening on 4000");
});
