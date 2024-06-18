const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

//after comment created, receive this event perform some operations and then send event to event bus with type as "CommentModerated"
app.post("/events", async (req, res) => {
    console.log("events in the moderations")
  const { type, data } = req.body;
  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status: status,
      },
    });
  }
  res.send({})
});

app.listen(4003, () => {
  console.log("Posts server listening on 4003");
});
