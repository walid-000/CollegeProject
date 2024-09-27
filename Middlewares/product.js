const {Product} = require("./../models/products");

async function middlewareForProductDetailPage(req , res , next) {
    const productId = req.params.id ;
    product = await Product.findById(productId);
    if (!product) {
        res.end("wrong url");
    }
     
    req.product = product ;
    next();

}

module.exports = { middlewareForProductDetailPage ,}