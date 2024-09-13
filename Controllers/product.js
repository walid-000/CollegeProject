const {Product} = require("./../models/products");
const {json} = require("express")

async function handleAddProduct(req , res) {
    const {pricePerDay , productName , productBrand  , productImage , productType , totalPiece } = req.body ;
    const newProduct = await Product.create({pricePerDay , productName , productBrand  , productImage , productType , totalPiece });
    console.log("product created " , newProduct);
    res.status(201).json({ message: "Product created successfully", product: newProduct });

}

async function handleDeleteProductById(req , res) {
    const productId = req.params.id ;
    const product = await Product.findByIdAndDelete(productId);
    console.log(product);
    if (!product){
        res.status(404).json({message : "product not found"});
    }
    res.status(200).json({message : "product deleted sucessfully" , product : product});
}

async function handleGetProductById(req , res) {
    const productid = req.params.id ;
    const product = await Product.findById(productid);

    if(!product){
        res.status(404).json({message : "product not found"});   
    }
    res.status(200).json({message : "product found sucessfully" , product : product})
}
async function handleGetProductByName(req , res) {
    const productName = req.params.productName ;
    const product = await Product.findOne({productName : productName});
    if(!product){
        res.status(404).json({message : "product not found"});   
    }
    res.status(200).json({message : "product found sucessfully" , product : product})
}

async function handleGetProductByBrand(req , res) {
    const productBrand = req.body.productBrand ;
    const product = await Product.find({productBrand : productBrand});
    if (!product){
        res.status(404).json({message : "no such product"});

    }
    res.status(200).json({message : "products found sucessfully" , product : product});
}

module.exports = {
    handleAddProduct ,
    handleDeleteProductById ,
    handleGetProductById ,
    handleGetProductByName ,
    handleGetProductByBrand ,
}

