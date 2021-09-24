const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username : {
        type:String,
        required:true
    },
    fullname : {
        type:String,
        required:true,
    },
    email: {
        type:String,
        required:true,
        unique:true
    },
    gender: {
        type:String,
    },
    date:{
        type: String, default: Date
    },
    phone: {
        type:Number,
        required:true,
    },
    password:{
        type:String,
        required:true
    },
    confirmpassword : {
        type:String,
        required:true
    },
    token:{
        type:String
    }
})

module.exports = mongoose.model('Auth' , userSchema);

// Fields: username, fullname, email, gender, date of birth, phone, profile image, password, and confirm password