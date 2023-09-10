const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        required:true,
        type:String,
        trim:true
    },
    email:{
        required:true,
        type:String,
        trim:true
    },
    password:{
        required:true,
        type:String
        // trim:true
    },
    role:{
        type:String,
        enum:["Admin","Student","Visitor"]
    }
});
module.exports =mongoose.model("user",userSchema);