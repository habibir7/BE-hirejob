const express = require('express')
const usersController = require('../controller/auth')
const router = express.Router()
const { Protect } = require("../middleware/private")


router.post("/",usersController.login)
router.get("/",usersController.getAuth)
router.post("/create",usersController.createAuth)
router.post("/otp",usersController.requestOTP)
router.post("/inputotp",usersController.otpLogin)
router.post("/passwordreset",Protect,usersController.resetPassword)

module.exports = router