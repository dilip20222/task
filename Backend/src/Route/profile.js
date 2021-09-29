const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const Auth2 = require("../model/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const result = await Auth2.findById(req.user._id)
    return res.json(result);
  } catch (error) {
    console.log('data not found', error);
  }
})

module.exports = router;
