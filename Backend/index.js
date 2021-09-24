const express = require("express");
const mongoose = require("mongoose");
const connection = require("./server");
const app = express();
let cors = require("cors");
require("dotenv").config();
const port = 3000;
let jwt = require("jsonwebtoken");

app.listen();
app.use(express.json());
connection();
app.use(
  cors({
    origin: "*",
  })
);

app.get("", (req, res) => {
  res.send("Welcome");
});


// Routes

app.use("/api", require("./src/Route/Register"));
app.use("/api", require("./src/Route/Login"));

app.listen(port, function () {
  console.log("Running RestHub on port " + port);
});
