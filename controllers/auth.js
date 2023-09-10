// const mongoose=require('mongoose');

// install bcrypt
const bcrypt = require('bcrypt');
const user = require('../models/User');

exports.signup = async(req,res)=>{
    try{

        const {name,email,password,role}=req.body;
        const existing = await user.findOne({email});

        if(existing){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        let hashedapassword;
        try{
            hashedapassword = await bcrypt.hash(password,10);

        }
        catch(err){
           return res.status(500).json({
                success:false,
                message:"error in hashing password"
            })

        }
        const newuser = await user.create({name,email,password:hashedapassword,role});
        res.status(200).json({
            success:true,
            message:"user xreated succesfully"
        })

    }
    catch{

    }
} 