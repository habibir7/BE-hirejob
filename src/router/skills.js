const express = require("express");
const skillsController = require("../controller/skills");
const router = express.Router();
const { Protect } = require("../middleware/private");
// const upload = require('../middleware/photo')

router.get("/", skillsController.showSkills);
router.get("/detail", skillsController.searchSkills);
router.get("/:user_id", skillsController.showSkillsById);
router.post("/", Protect, skillsController.inputSkills);
router.put("/:id", Protect, skillsController.updateSkills);
router.delete("/:id", skillsController.deleteSkills);

module.exports = router;
