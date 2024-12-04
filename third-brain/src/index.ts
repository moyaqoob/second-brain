import express from "express"
import jwt from "jsonwebtoken";
import { UserModel } from "./db";
const app = express();
import bcrypt from "bcrypt";
import mongoose, { connect } from "mongoose";
import { JWT_PASSWORD } from "./config";
app.use(express.json())


app.post("/api/v1/signup",(req,res)=>{
    const username = req.body.username;
    const password  = req.body.password;
    const salt = 10;
    bcrypt.hash(password,salt,function(err,hash){
        UserModel.create({
            username:username,
            password:password
        })
    })
    res.json({
            message:"User signed up successfully"
    
    })
    
    
})

app.post("/api/v1/signin",(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    
    const existingUser = UserModel.find({
        username,
        password
    })

    if(existingUser){
        const token = jwt.sign({
            username:existingUser,
        },JWT_PASSWORD)


        res.json({
            username:token
        })
    }

    else{
        res.json({
            message:"Invalid credentials"
        })
    }
    if(!existingUser){
        res.json({
            message:"User does not exist, You need to sign up"
        })
    }

    
    
})

app.post("/api/v1/content",(req,res)=>{

})

app.get("/api/v1/content",(req,res)=>{

})

app.delete("/api/v1/delete",(req,res)=>{

})

app.post("/api/v1/brain/share",(req,res)=>{

})

app.get("/api/v1/brain/:sharelink",(req,res)=>{

})

app.listen(3000);