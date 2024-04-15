const express = require("express");
const skillsController = require("../controller/skills");
const router = express.Router();
// const {Protect} = require('../middleware/private')
// const upload = require('../middleware/photo')

router.get("/", skillsController.showSkills);
router.get("/detail", skillsController.searchSkills);
router.get("/:id", skillsController.showSkillsById);
router.post("/", skillsController.inputSkills);
router.put("/:id", skillsController.updateSkills);
router.delete("/:id", skillsController.deleteSkills);

module.exports = router;
