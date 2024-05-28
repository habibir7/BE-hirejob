const express = require("express");
const MessagedetailController = require("../controller/messagedetail");
const router = express.Router();
const { Protect } = require("../middleware/private");

router.get("/", Protect, MessagedetailController.getMessagedetail);
router.get("/user", Protect, MessagedetailController.getMessagedetailById);
router.post("/", Protect, MessagedetailController.createMessagedetail);

module.exports = router;
