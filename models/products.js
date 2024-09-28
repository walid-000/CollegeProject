const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    pricePerDay : {
        type : Number ,
    } ,
    productName : {
        type : String ,

    }  ,
    productType : {
        type : String ,
    } ,
    productBrand : {
        type : String ,
    } ,
    productImage : {
        type : String ,
    } ,

    productDescription : {
        type : String
    } ,

   
    totalPiece : {
        type : Number ,
    } ,

    reservedDates: {
        type: Map,
        of: Number, 
        default: {}  
      }
    


})

const Product = mongoose.model("product" ,productSchema);

module.exports = {
    Product ,
};