const express = require("express");
// require('dotenv').config();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
// const {LogRequest} = require("./logRequest")
const mongodbURL = 'mongodb://127.0.0.1:27017/Lens-and-Light'
app.use(express.static(path.join(__dirname, 'views')));
const {LogRequestMiddleware} = require("./Middlewares/global")
// const connectToMongoDb = require("./connection")
const userRouter = require("./Routers/user")
// const { User } = require("./Models/User")
const cookieParser = require("cookie-parser")

mongoose.connect(mongodbURL)
  .then(()=> {console.log(`mongodb connected `)})
  .catch(err => console.log(`some error : ${err}`));
  


app.use(LogRequestMiddleware("Log.txt"))
app.use(express.json());
app.use(cookieParser());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));

app.get("/" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'home.html'));

});
 app.use("/user" , userRouter)

app.get("/login-signUp" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'Signup.html'))
})

// app.get("/user/:id" , async(req , res)=>{
//    try {
//     const userId = req.params.id ;
//     const user = User.findById(userId) ;
//     if (user){
//         res.send({message : "user found" , user})
//     }
//     else {
//         res.send({message : "user does not exist"}) ;
//     }
//    }
//    catch (err) {

//    }
// })


app.get('/product1' ,(req ,res)=>{
    res.render("productview")
})

app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`localhost:${port}`);
})