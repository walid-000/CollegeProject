const express = require("express");
require('dotenv').config();
const path = require("path");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const app = express();
const {LogRequest} = require("./logRequest")
const mongodbURL = 'mongodb://127.0.0.1:27017/Lens-and-Light'
app.use(express.static(path.join(__dirname, 'views')));
const fs = require("fs")

const { User ,} = require("./models/User")
mongoose.connect(mongodbURL ,  { useNewUrlParser: true, useUnifiedTopology: true })
.then(()=> {console.log(`mongodb connected `)})
.catch(err => console.log(`some error : ${err}`));

function LogRequestMiddleware(filename) {
  return (req, res, next) => {
    const date = new Date().toISOString(); // Fix the date formatting
    fs.appendFile(filename, `${req.method} ${req.path} ${date} \n`, (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      }
    });
    next();
  };
}
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.urlencoded({ extended: true }));
app.use(LogRequestMiddleware("Log.txt"));

app.get("/" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'public', 'home.html'));

});


app.post("/user" ,async (req, res) => {
    try {
      const { name, email, pswd } = req.body; 
  
      
      const user = await User.create({
        name,
        email,
       pswd ,
      });
  
      console.log(`User created: ${user}`);
      res.status(201).send('User created successfully');
    } catch (err) {
      console.error(`Some error: ${err}`);
      res.status(500).send('Internal Server Error');
    }
  });

app.get("/login-signUp" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'views', 'Signup.html'))
})

app.get("/user/:id" , async(req , res)=>{
   try {
    const userId = req.params.id ;
    const user = User.findById(userId) ;
    if (user){
        res.send({message : "user found" , user})
    }
    else {
        res.send({message : "user does not exist"}) ;
    }
   }
   catch (err) {

   }
})


app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`localhost:${port}`);
})