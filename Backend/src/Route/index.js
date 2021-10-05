const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const Auth = require("../model/user");
const Auth2 = require("../model/user");
const bcrypt = require("bcryptjs");
const auth = require("../middleware/auth");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");

router.use(express.static(__dirname + "./uploads/"));

let storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

let upload = multer({ storage: storage });

router.use("/uploads", express.static("uploads"));

// API for Registration

router.post("/register", upload.single("file"), async (req, res, next) => {
  // Our register logic starts here
  try {
    // Get user input
    const {
      username,
      fullname,
      gender,
      date,
      phone,
      email,
      password,
      confirmpassword,
    } = req.body;

    // Validate user input
    const file = req.file.filename;
    if (
      !(username && fullname && phone && email && password && confirmpassword)
    ) {
      res.status(400).send("All input is required");
    }
    // console.log("filepath", req.file.filename, req.file.path);
    console.log("filepath", req.file.filename);

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await Auth.findOne({ email });

    if (oldUser) {
      return res.status(400).send("User Already Exist , Please Login");
    }

    //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const url = req.protocol + "://" + req.get("host");
    const user = await Auth.create({
      file: req.file.originalname,
      username,
      fullname,
      email: email.toLowerCase(),
      date,
      gender,
      phone,
      password: encryptedPassword,
      confirmpassword: encryptedPassword,
    });

    // Create token
    const token = jwt.sign(
      { _id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );

    user.token = token;
    console.log("User Token", token);
    res.status(200).json(user);
  } catch (err) {
    res.status(404).json("Not valid");
    console.log("Error , not Valid");
    console.log(err);
  }
});

// Login API

router.post("/login", async(req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await Auth.findOne({ email });
        if (!user) {
            res.status(404).json("User not found");
        }
        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign({ _id: user._id, email },
                process.env.TOKEN_KEY, {
                    expiresIn: "2h",
                }
            );

            // save user token
            user.token = token;
            console.log("token", token)
            res.status(200).json(user)
        }
    } catch (err) {
        res.status(400).send("Invalid Credentials");
        console.log(err);
    }
});

// Dashboard API

router.get('/', auth, async (req, res) => {
    try {
      const result = await Auth2.findById(req.user._id)
      return res.json(result);
    } catch (error) {
      console.log('data not found', error);
    }
  })
  
  router.get('/getuser' , async(req, res)=>{
    try {
      const result = await Auth2.find()
      return res.json(result);
    } catch (error) {
      console.log('data not found', error);
    }
  })

// Update API


router.put("/update/:id", auth , async (req, res) => {
  if (!(await Auth.findOne({ _id: req.params.id }))) {
    return res.status(400).json("user not found");
  }
  let updatedUser = await Auth.findByIdAndUpdate(
    { _id: req.params.id },
    {
      username: req.body.username,
      fullname: req.body.fullname,
      gender: req.body.gender,
      phone: req.body.phone,
    },
    { new: true }
  );
  console.log(updatedUser)
  res.status(200).json(updatedUser);
});

  
//  Delete API
  
  router.delete("/delete/:id", async (req, res) => {
    if (!(await Auth.findOne({ _id: req.params.id }))) {
      return res.status(400).json("user not found");
    }
    let updatedUser = await Auth.findByIdAndDelete(
      { _id: req.params.id },
    );
    res.status(200).json(updatedUser);
  });

module.exports = router;
