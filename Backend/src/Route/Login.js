const express = require("express");
const { connection } = require("mongoose");
const user = require("../model/user");
let router = express.Router();
const Auths = require("../model/user");
const bcrypt = require('bcryptjs')
let jwt = require('jsonwebtoken');

const auth = require('../middleware/auth')


router.get('/:id', auth, async (req, res,next) => {
  const userid = req.params.id
    try { 
        const result = await Auths.findById(userid);
        res.json(result)
        console.log("result >>." ,result);
      } catch (error) {
        console.log('data not found', error);
      }
    });

router.post("/login", async(req, res) => {
    try {
        // Get user input
        const { email, password } = req.body;

        // Validate user input
        if (!(email && password)) {
            res.status(400).send("All input is required");
        }
        // Validate if user exist in our database
        const user = await Auths.findOne({ email });
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
module.exports = router;