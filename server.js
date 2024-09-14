const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const mongodbURL = 'mongodb://127.0.0.1:27017/Lens-and-Light'
const {LogRequestMiddleware} = require("./Middlewares/global")


const userRouter = require("./Routers/user")
const productRouter = require("./Routers/product")


const cookieParser = require("cookie-parser")

mongoose.connect(mongodbURL)
  .then(()=> {console.log(`mongodb connected `)})
  .catch(err => console.log(`some error : ${err}`));
  

app.use(LogRequestMiddleware("Log.txt"))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));


 app.use("/user" , userRouter);
//  app.use("/product" , productRouter);

app.get("/login-signUp" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'Signup.html'))
})

app.get("/home" , (req , res)=>{
  res.render("school")
})

app.get("/product/:id" , (req , res)=>{
  res.render("ProductDetail");
})




app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`http://localhost:${port}`);
})