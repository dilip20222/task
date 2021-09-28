const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const Auth = require("../model/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage')


router.use(express.static(__dirname + './uploads/'))

let storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb) {
            cb(null,file.originalname);
        }
});

let upload = multer({ storage: storage});

router.use('/uploads', express.static('uploads'));

router.post("/register",upload.single('file') ,  async(req, res, next) => {

    // Our register logic starts here
    try {
        
        // Get user input
        const {username, fullname, gender, date, phone, email, password, confirmpassword} = req.body;
        // Validate user input
        const file = req.file.filename;
        if (!(username && fullname && phone && email && password && confirmpassword)) {
            res.status(400).send("All input is required");
        }
console.log("filepath",req.file.filename,req.file.path)
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await Auth.findOne({email});

        if (oldUser) {
            return res.status(400).send("User Already Exist , Please Login");
        }

        //Encrypt user password
        let encryptedPassword = await bcrypt.hash(password, 10);

        // Create user in our database
        // console.log('file', file);
        const url = req.protocol + '://' + req.get('host')
        const user = await Auth.create({
            file:url+'/uploads/'+req.file.originalname,
            username,
            fullname,
            email: email.toLowerCase(),
            date,
            gender,
            phone,
            password: encryptedPassword,
            confirmpassword:encryptedPassword,
        });

        // Create token
        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );

        user.token = token;
        console.log("User Token", token)
  //    console.log("File original Name"  , req.file.filename)
        res.status(200).json(user)
        
    } 
    catch (err) {
        res.status(404).json("Not valid")
        console.log("Error , not Valid")
        console.log(err);
    }
});


module.exports = router;