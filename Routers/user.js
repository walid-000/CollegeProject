const express = require("express")
const router = express.Router()
const {handleCreateUser , handleGetUserWithId , handleLoginUser} = require("./../Controllers/user")

router.post('/' , handleCreateUser)
router.post('/login' , handleLoginUser)
router.get("/:id" , handleGetUserWithId)





module.exports = router ;
