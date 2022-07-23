const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt")
const User = require("../models/User")

userRouter.post("/",async(req,res)=>{

    const {name, email, password, confirmPassword} = req.body
    if(!name || !email || !password || !confirmPassword){
        res.status(400).json({Message : "provide you information"})
    }

    // let userData = await User.findOne({email})
    // if(userData){
    //     res.status(400).json({message:"This email is already in use"})
    // }
    let userData = new User({
        name,
        email,
        password,
        confirmPassword
    })
       
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
    userData.password = hash
    userData.confirmPassword = hash

    await userData.save()
    res.status(201).json({Message : "User created successful", userData})
})


userRouter.get("/", async(req,res)=>{
    const userData = await User.find({})
    res.json(userData)
})


module.exports = userRouter