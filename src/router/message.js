const express = require("express")
const MessageController = require("../controller/message")
const router = express.Router()
const {Protect} = require("../middleware/private")

router.get("/",Protect,MessageController.getMessage)
router.get("/:id_messagedetail",Protect,MessageController.getMessageById)
router.post("/",Protect,MessageController.createMessage)


module.exports = router