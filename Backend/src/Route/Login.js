const express = require("express");
const { connection } = require("mongoose");
const user = require("../model/user");
let router = express.Router();
const Auth = require("../model/user");
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');


router.post("/login", async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await Auth.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      user.token = token;
      console.log("token",token)

      // user
      res.status(200).json(user);
    }
    
  } catch (err) {
    res.status(400).send("Invalid Credentials");
    console.log(err);
  }
});
module.exports = router;


