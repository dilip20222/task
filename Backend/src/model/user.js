const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
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
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    file: {
        data: Buffer,
        type: String
    },
    token: {
        type: String
    },
    role: {
        type: String,
        default: 'admin',
    }
})

module.exports = mongoose.model('users', userSchema);