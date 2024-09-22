const { json } = require("express");
// const cookieParser = require("cookie-parser");
const {User}= require("./../models/User");
const jwt = require("jsonwebtoken");
const { getToken ,} = require("./../Services/auth");

async function handleCreateUser(req, res) {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email: email });
        if (existingUser) {
            console.log("User already exists");
            return res.status(400).json({ message: "User already exists" });
        }
        const newUser = await User.create({ name : name , email : email, pswd : password });
        console.log("User created", newUser);
        res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
        console.error("Error creating user", error);
        res.status(500).json({ message: "Server error" });
    }
}

async function handleGetUserWithId(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User does not exist" });
        }
        res.status(200).json(user); 
    } catch (err) {      
        res.status(500).json({ message: "Internal server error" }); 
    }
}


async function handleLoginUser(req , res){
    const {email , password } = req.body;
    try {

       const user = await User.findOne({email : email});
       if(!user){
        return res.status(404).json({message : "No such user"});
       }
     
       if (user.pswd === password){
        const payload = {userName : user.name , userId : user._id , role : "user"};
        const token = getToken(payload);
        console.log(token)
        res.cookie("authToken" , token)
        
        return res.redirect("/home")
        
       }
       res.status(401).json({message : "wrong password"});
    }
    catch(err){
        res.status(500).json({message : "Internal server error"});
    }
}

async function handleUserLogOut(req , res) {
  const authToken = res.cookies?.authToken ;
  console.log(authToken)
  if (authToken){
    res.clearCookie("authToken");
    res.send("clear")
  }
  else {
    res.send("cookie does not exist")
  }
}

function handleLogOut(req , res){
    console.log("loging out .. ")
    res.clearCookie("authToken");
    return res.redirect("/home");
}

module.exports = {
    handleCreateUser ,
    handleGetUserWithId ,
    handleLoginUser,
    handleLogOut ,
}