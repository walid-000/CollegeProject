const express = require("express")
const router = express.Router()
const {handleCreateUser , handleGetUserWithId , handleLoginUser , handleLogOut} = require("./../Controllers/user")

router.post('/' , handleCreateUser)
router.post('/login' , handleLoginUser)
router.get("/logout" , handleLogOut)
router.get("/:id" , handleGetUserWithId)

// router.delete("/" , )




module.exports = router ;
