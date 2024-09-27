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
const {middlewareForProductDetailPage} = require("./Middlewares/product")


app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(checkAuth)
app.use(LogRequestMiddleware("Log.txt"))
app.use('/uploads', express.static('uploads'));



mongoose.connect(mongodbURL)
  .then(()=> {console.log(`mongodb connected `)})
  .catch(err => console.log(`some error : ${err}`));
  


app.use("/user" , userRouter);
// app.use("/product" , productRouter);
app.use("/admin" , AdminRouter);

app.get("/login-signUp" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'Signup.html'))
})

app.get("/home" , middlewareForHomePage , (req , res)=>{
  const data = req.data ;
  res.render("school" , data);
})

app.get("/product/:id" , middlewareForProductDetailPage , (req , res)=>{
  const product = req.product ;
  res.render("ProductDetail" , product);
});
const dummyCameraman = {
  userId: "61a1234567890abcdef12345",
  fullName: "John Doe",
  address: "123 Main St, Cityville, Country",
  contactDetails: {
      email: "johndoe@example.com",
      phone: "+1 234 567 8901"
  },
  bio: "Professional cameraman with 5 years of experience in weddings, corporate events, and more.",
  pricingPerDay: 2000,  // Pricing per day in INR
  availableDates: [
      new Date("2024-10-01"),
      new Date("2024-10-05"),
      new Date("2024-10-10")
  ],
  profilePicture: "https://via.placeholder.com/150"  // Dummy profile picture URL
};

app.get("/cameraman" , (req , res)=>{
  res.render('pfp2', { cameraman: dummyCameraman  , isOwnProfile : true});
})

app.get('/addproduct' , (req ,res)=>{
  res.render("AddProduct")
})


app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`http://localhost:${port}`);
    console.log(" ");
})