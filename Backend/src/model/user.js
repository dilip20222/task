const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    // _id:{String} ,
    username: {
        type: String,
        // required: true
    },
    fullname: {
        type: String,
        // required: true,
    },
    email: {
        type: String,
        // required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    date: {
        type: String,
        default: Date
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        // required: true
    },
    confirmpassword: {
        type: String,
        // required: true
    },
    file: {
        data: Buffer,
        type: String
    },

    // images: {
    //     type: String,
    // },
    token: {
        type: String
    }
})

module.exports = mongoose.model('Auth', userSchema);