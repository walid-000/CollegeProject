const express = require("express")
const router = express.Router()
const {handleCreateUser , handleGetUserWithId} = require("./../Controllers/user")

router.post('/' , handleCreateUser)
router.get("/:id" , handleGetUserWithId)




module.exports = router ;
