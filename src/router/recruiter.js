const express = require('express')
const recruiterController = require('../controller/recruiter')
const router = express.Router()
const { Protect } = require("../middleware/private")
const upload = require('../middleware/photo')

router.get("/",recruiterController.getRecruiter)
router.put("/:id_user", upload.single('photo'), recruiterController.updateRecruiter)



module.exports = router