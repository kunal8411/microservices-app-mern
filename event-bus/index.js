const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const axios = require('axios')
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.post('/events', (req,res)=>{
    const event = req.body;
    console.log("EVENT IS", event)
    axios.post('http://localhost:4000/events', event)
    axios.post('http://localhost:4001/events', event)
    axios.post('http://localhost:4002/events', event)

    res.send({status:"OK"})
})

app.listen(4005,(req,res)=>{
    console.log("Server listening on 4005")
})