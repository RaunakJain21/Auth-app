// const mongoose=require('mongoose');

// install bcrypt
const bcrypt = require('bcrypt');
const user = require('../models/User');
const jwt =require('jsonwebtoken');
require('dotenv').confing();

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
        res.status(404).json(
            {
                success:false,
                message:"error "
            }
        )
    }
} 
exports.login = async(req,res)=>{
    try{
        const {email,password}=require(res.body);
        if(!email || !password)
        {
            res.status(401).json({

                "success":false
                ,"message":"Please fill all the fields"  
            })
        }

        const existingUser = await user.findOne({email});


        if(!existingUser)
        {
            res.status(401).json({
                "success":false
                ,"message":"User doesn't exist please enter valid email or username"  
                  })

        }
        const payload ={
            email:user.email,
            id:user.id,
            role:user.role,
        };
        if(await bcrypt.compare(password,user.password))
        {
            // password match
            let token =jwt.sign(payload,process.env.JWT_SECRET,{
                expiresIn:"2h",
            });
            user=user.toObject();
            user.password=undefined;
            user. 
        }

    }
    catch{

    }
}