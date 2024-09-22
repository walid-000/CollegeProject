const express = require("express");
const {handleAddProduct ,} = require("./../Controllers/product");

const router = express.Router();

router.post("/addproduct" , handleAddProduct);

module.exports = router ;

