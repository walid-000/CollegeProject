const { log } = require("console");
const express = require("express");
require('dotenv').config();
const path = require("path");
const port = process.env.PORT || 3000;
const app = express();
app.use(express.static(path.join(__dirname, 'public')));



app.get("/" , (req , res)=>{
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.listen(port , ()=>{
    console.log(`listening at port ${port} `);
    console.log(`localhost:${port}`);
})

