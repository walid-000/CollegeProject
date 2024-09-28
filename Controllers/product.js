const {Product} = require("./../models/products");
const {json} = require("express")

async function handleAddProduct(req , res) {
    const  pricePerDay =  parseInt(req.body.pricePerDay) ;
    const   totalPiece =  parseInt(req.body. totalPiece) ;
    const { productName , productBrand  , productImage , productDescription } = req.body ;
    const newProduct = await Product.create({pricePerDay , productName , productBrand  , productImage  , productDescription ,  totalPiece });
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



async function handleReservation(req , res) {
    console.log("function called")
    const {productId, startDate, endDate, numToReserve} = req.body ;
    const product = await Product.findById(productId);
    console.log(product)
    
    if (!product) {
        throw new Error("Product not found");
    }

    const reservedDates = product.reservedDates;
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Loop through all dates from startDate to endDate
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
        const formattedDate = d.toISOString().split('T')[0];  // Format date as 'YYYY-MM-DD'

        // Check if the date already has bookings
        if (reservedDates.has(formattedDate)) {
            // If the date exists, increase the number of cameras reserved
            reservedDates.set(formattedDate, reservedDates.get(formattedDate) + numToReserve);
        } else {
            // If the date doesn't exist, set the initial reservation
            reservedDates.set(formattedDate, numToReserve);
        }
    }

    // Save the updated product
    await product.save();

    res.send("reservation sucessfull ");
}






module.exports = {
    handleAddProduct ,
    handleDeleteProductById ,
    handleGetProductById ,
    handleGetProductByName ,
    handleGetProductByBrand ,
    handleReservation ,
    
}

