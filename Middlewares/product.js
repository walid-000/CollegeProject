const {Product} = require("./../models/products");

async function middlewareForProductDetailPage(req , res , next) {
    const productId = req.params.id ;
    product = await Product.findById(productId);
    if (!product) {
        res.end("wrong url");
    }
     
    req.product = product ;
    console.log(product)
    next();

}

async function middlewaretForGetProductType(req, res ,next) {
    const productType = req.params.productType ;
    try {
        const products = await Product.find({ productType: productType });
        if (!products) {
            res.end("wrong url");
        }
        req.products = products ;
        console.log("middleware completed ")
        next()
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
};
module.exports = { middlewareForProductDetailPage ,middlewaretForGetProductType}