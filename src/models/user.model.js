const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    role:{type:String, enum:["user","admin"], default:"user"},
    otp:{type:String},
    otpExpires:{type:Date},
    isVerified:{type:Boolean,default:false}
},{timestamps:true});
const User = mongoose.model('User', userSchema);
module.exports = User;