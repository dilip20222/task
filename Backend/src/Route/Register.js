const express = require("express");
const { connection } = require("mongoose");
const router = express.Router();
const Auth = require("../model/user");
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const upload = multer({ dest: './uploads/' });


router.use(express.static(__dirname + './uploads/'))

let storage = multer.diskStorage({
    destination: "./uploads/",
    filename: function(req, file, cb) {
            cb(null, Date.now() + file.originalname);
        }
        // filename: (file, cb) => {
        //     cb(null, file.originalname + "_" + Date.now() + path.extname(file.originalname));
        // }
});


let uploadImg = multer({ storage: storage }).single('file');

router.post("/register", upload.single('file'), async(req, res, next) => {

    console.log("files>>>>", req.file, req.file.originalname);

    // Our register logic starts here
    try {
        // Get user input
        const { username, fullname, gender, date, phone, email, password, confirmpassword } = req.body;
        // Validate user input

        if (!(username && fullname && phone && email && password && confirmpassword)) {
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
        // console.log('file', file);

        const user = await Auth.create({
            username,
            fullname,
            file: "hello",
            email: email.toLowerCase(),
            date,
            gender,
            phone,
            password: encryptedPassword,
            confirmpassword: password,

            //  {
            //     // data: fs.readFileSync(path.join(req.file.originalname)),
            //     //data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.originalname)),
            //     contentType: 'images/png'
            // }
        });

        // Create token
        const token = jwt.sign({ user_id: user._id, email },
            process.env.TOKEN_KEY, {
                expiresIn: "2h",
            }
        );

        user.token = token;
        console.log("User Token", token)

        res.status(200).json(user)
        console.log('user', user);

        console.log(user, "USer")
    } catch (err) {
        res.status(400).json("Not valid")
        console.log("Error , not Valid")
        console.log(err);
    }
});


module.exports = router;