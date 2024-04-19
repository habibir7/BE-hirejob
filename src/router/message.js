const express = require("express")
const MessageController = require("../controller/message")
const router = express.Router()
const {Protect} = require("../middleware/private")

router.get("/",Protect,MessageController.getMessage)
router.post("/",Protect,MessageController.createMessage)


module.exports = router