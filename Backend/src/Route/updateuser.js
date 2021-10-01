const express = require("express");
const { connection } = require("mongoose");
const user = require("../model/user");
let router = express.Router();
const Auths = require("../model/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");

router.put("/update/:id", async (req, res) => {
  if (!(await Auths.findOne({ _id: req.params.id }))) {
    return res.status(400).json("user not found");
  }
  let updatedUser = await Auths.findByIdAndUpdate(
    { _id: req.params.id },
    {
      username: req.body.username,
      fullname: req.body.fullname,
      gender: req.body.gender,
      phone: req.body.phone,
    },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

module.exports = router;
