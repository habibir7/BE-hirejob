const express = require("express");
const contactController = require("../controller/contact");
const { Protect } = require("../middleware/private");
const router = express.Router();
// const upload = require('../middleware/photo')

router.get("/", contactController.showContact);
router.get("/detail", contactController.searchContact);
router.get("/:id_user", contactController.showContactById);
router.post("/", Protect, contactController.inputContact);
router.put("/:id", Protect, contactController.updateContact);
router.delete("/:id", contactController.deleteContact);

module.exports = router;
