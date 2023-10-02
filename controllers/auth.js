// const mongoose=require('mongoose');

// install bcrypt
const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt =require('jsonwebtoken');
require('dotenv').config();

exports.signup = async(req,res)=>{
    try{

        const {name,email,password,role}=req.body;
        const existing = await User.findOne({email});

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
        const newuser = await User.create({name,email,password:hashedapassword,role});
        res.status(200).json({
            success:true,
            message:"user xreated succesfully"
        })

    }
    catch{
        res.status(404).json(
            {
                success:false,
                message:"error "
            }
        )
    }
} 
exports.login = async(req,res)=>{
    try
    {
        const {email,password} = req.body;
        if(!email || !password)
        {
            return res.status(400).json({
                success:false,
                message : "Please fill all the details carefully",
            })
        }

        // check for register user 
        let user = await User.findOne({email});
        if(!user)
        {
            return res.status(401).json({
                success : false,
                message : "User does not exist",
            });
        }

        // Verify password & generate a JWT token

        const payload = {
            email : user.email,
            id : user._id,
            role : user.role,
        };


        if(await bcrypt.compare(password,user.password)){
            // password match
            let token = jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn : "2h",
            });

            user = user.toObject();
            user.token = token;
            user.password = undefined;

            const options = {
                expires : new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly : true,
            }

            res.cookie("token",token,options).status(200).json({
                success : true,
                token,
                user,
                message:"User logged in successfully"
            });
        }
        else {
            // password not match
            return res.status(403).json({
                success : false,
                message : "Password does not match",
            })
        }
    }
    catch(err){
        console.error(err)
        return res.status(500).json({
            success : false,
            message : "Login false" 
        })
    }
}