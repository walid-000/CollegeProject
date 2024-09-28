const express = require("express")
const {handleAddProduct ,handleDeleteProductById , handleGetProductById ,handleGetProductByName , handleGetProductByBrand ,handleReservation} = require("./../Controllers/product")

const router = express.Router();

router.post('/add' , handleAddProduct);
router.delete("/delete/:id" , handleDeleteProductById);
router.post("/reservation" , handleReservation)
// router.get("/:id" , handleGetProductById);
// router.get("/:productName" , handleGetProductByName);
// router.get("/brand/:productBrand" , handleGetProductByBrand);




module.exports = router ;