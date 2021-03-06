const express = require("express");
const mongoose = require("mongoose");
const connection = require("./server");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bodyParser = require('body-parser')
const multer = require('multer');

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

app.use("/api" , require("./src/Route/index"))
app.use('/uploads', express.static('uploads'));

app.listen(port, function() {
    console.log("Backend Server Running on port " + port);
});