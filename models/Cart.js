const mongoose = require("mongoose");
const { type } = require("os");

const cartSchema = new mongoose.Schema({
    userId : {
        type : Schema.Types.ObjectId , 
        ref : "User"
    } ,

    ListOfProductsInCart : {
        type : [{}]
    } 
})