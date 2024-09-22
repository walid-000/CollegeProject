const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const cookieParser = require("cookie-parser")
const mongodbURL = 'mongodb://127.0.0.1:27017/Lens-and-Light'
const {LogRequestMiddleware , checkAuth} = require("./Middlewares/global")
const {middlewareForHomePage ,} = require("./Middlewares/User");
const userRouter = require("./Routers/user")
const productRouter = require("./Routers/product")
const AdminRouter = require("./Routers/admin")


app.use(LogRequestMiddleware("Log.txt"))
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(checkAuth)





mongoose.connect(mongodbURL)
  .then(()=> {console.log(`mongodb connected `)})
  .catch(err => console.log(`some error : ${err}`));
  


 app.use("/user" , userRouter);
//  app.use("/product" , productRouter);
app.use("/admin" , AdminRouter);

app.get("/login-signUp" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'Signup.html'))
})

app.get("/home" , middlewareForHomePage , (req , res)=>{
  const data = req.data ;
  res.render("school" , data);
})

app.get("/product/:id" , (req , res)=>{
  res.render("ProductDetail");
})




app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`http://localhost:${port}`);
    console.log(" ");
})