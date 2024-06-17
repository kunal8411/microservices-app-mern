const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const posts = {};
app.get("/posts", (req, res) => {
  return res.send(posts);
});

app.post("/posts", async (req, res) => {
  try {
    const id = randomBytes(4).toString("hex");
    const { title } = req.body;
    posts[id] = {
      id,
      title,
    };

    await axios.post("http://localhost:4005/events", {
      type: "PostCreated",
      data: {
        id,
        title,
      },
    });
    res.status(201).send(posts[id]);
  } catch (error) {
    if (error.response) {
      // Server responded with a status code out of the range of 2xx
      console.log("Response error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.log("Request error:", error.request);
    } else {
      // Something else happened
      console.log("Error:", error.message);
    }
    res
      .status(500)
      .send({ error: "An error occurred. Please try again later." });
  }
});

//to receive the emmited events
app.post("/events", (req, res) => {
  console.log("BODY OF REQUEST IS:", req.body);
  res.send({})
});

app.listen(4000, () => {
  console.log("Posts server listening on 4000");
});
