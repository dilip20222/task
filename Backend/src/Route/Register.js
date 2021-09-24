const express = require("express");
const { connection } = require("mongoose");
let router = express.Router();
const Auth = require("../model/user");
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');
// let token = jwt.sign({ foo: 'bar' }, 'shhhhh');


router.post("/register", async (req, res) => {

  // Our register logic starts here
  try {
    // Get user input
    const { username, fullname , gender, date , phone , email, password , confirmpassword } = req.body;

    // Validate user input
    
    if (!(username && fullname && gender && phone && email && password && confirmpassword )) {
      res.status(400).send("All input is required");
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ email });

    if (oldUser) {
      return res.status(400).send("User Already Exist. Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await Auth.create({
      username,
      fullname,
      email: email.toLowerCase(),
      date, 
      gender,
      phone,
      password: encryptedPassword,
      confirmpassword:password  
    });

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
      console.log("User Token" ,  token)

    res.status(200).json(user)
    // console.log(user , "USer")
  } catch (err) {
    res.status(400).json("Not valid")
    console.log("Error , not Valid")
    console.log(err);
  }
});


module.exports = router;
