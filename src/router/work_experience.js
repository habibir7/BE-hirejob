const express = require("express");
const workExperienceController = require("../controller/work_experience");
const { Protect } = require("../middleware/private");
const router = express.Router();
// const {Protect} = require('../middleware/private')
// const upload = require('../middleware/photo')

router.get("/", workExperienceController.showWorkExperience);
router.get("/detail", workExperienceController.searchWorkExperience);
router.get("/:user_id", workExperienceController.showWorkExperienceById);
router.post("/",Protect, workExperienceController.inputWorkExperience);
router.put("/:id",Protect, workExperienceController.updateWorkExperience);
router.delete("/:id", workExperienceController.deleteWorkExperience);

module.exports = router;
