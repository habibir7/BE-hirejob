const express = require("express")
const router = express.Router()
const auth = require("./auth")
const city = require("./city")
const province = require("./province")
const recruiter = require("./recruiter")


router.use("/auth",auth)
router.use("/recruiter",recruiter)
router.use("/city",city)
router.use("/province",province)

module.exports = router