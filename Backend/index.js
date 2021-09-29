const express = require("express");
const mongoose = require("mongoose");
const connection = require("./server");
const app = express();
const cors = require("cors");
const port = 3000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
app.listen();
const bodyParser = require('body-parser')
const multer = require('multer');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json());
connection();
app.use(
    cors({
        origin: "*",
    })
);

app.get("/", (req, res) => {
    res.send("Welcome");
});


// Routes

app.use("/api", require("./src/Route/Register"));
app.use("/api", require("./src/Route/Login"));
app.use("/api", require("./src/Route/profile"));
app.use('/uploads', express.static('uploads'));

app.listen(port, function() {
    console.log("Backend Server Running on port " + port);
});