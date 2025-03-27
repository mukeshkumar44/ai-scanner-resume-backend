const mongoose = require('mongoose');
const ResumeSchema = new mongoose.Schema({
      user: { type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    url:{
        type:[String],
        required:true
    },
    skills:{
        type:String,
        enum:[String],
        required:true
        },
    text:{
        type:String,
        required:true
    }
},{timestamps:true});


module.exports = mongoose.model('Resume', ResumeSchema);