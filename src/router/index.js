const express = require("express")
const router = express.Router()
const auth = require("./auth")
const city = require("./city")
const province = require("./province")
const recruiter = require("./recruiter")
const worker = require("./worker");
const skills = require("./skills");
const workExperience = require("./work_experience");
const portofolio = require("./portofolio");
const contact = require("./contact");
const message = require("./message")
const messagedetail = require("./messagedetail")

router.use("/auth",auth)
router.use("/recruiter",recruiter)
router.use("/city",city)
router.use("/province",province)
router.use("/worker", worker);
router.use("/skills", skills);
router.use("/workExperience", workExperience);
router.use("/portofolio", portofolio);
router.use("/contact", contact);
router.use("/message", message);
router.use("/messagedetail",messagedetail)

module.exports = router
