const express = require('express')
const usersController = require('../controller/auth')
const router = express.Router()

router.post("/",usersController.login)
// router.get("/auth",usersController.Auth)

module.exports = router