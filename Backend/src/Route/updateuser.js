const express = require("express");
const { connection } = require("mongoose");
const user = require("../model/user");
let router = express.Router();
const Auths = require("../model/user");
const auth = require("../middleware/auth");
const bcrypt = require("bcryptjs");
let jwt = require("jsonwebtoken");
// const { findByIdAndUpdate } = require("../model/user");

// router.put('/update/:id',(req, res, next) => {
//     const updateuser = new Auths({
//       _id: req.params.id,
//       username: req.body.username,
//       fullname: req.body.fullname,
//       gender: req.body.gender,
//       phone : req.body.phone,
//       file: req.body.file,
//     });

//     console.log(updateuser)

//     Auths.findByIdAndUpdate({_id: req.params.id}, updateuser).then(
//       () => {
//         res.status(200).json({
//           updateuser
//         });
//       }
//     ).catch(
//       (error) => {
//         res.status(400).json({
//           error: error
//         });
//       }
//     );
//   });

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
