const express = require('express')
const recruiterController = require('../controller/recruiter')
const router = express.Router()
const { Protect } = require("../middleware/private")

router.get("/",recruiterController.getRecruiter)
router.put("/:id_user",recruiterController.updateRecruiter)



module.exports = router