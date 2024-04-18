const express = require("express");
const portofolioController = require("../controller/portofolio");
const router = express.Router();
// const {Protect} = require('../middleware/private')
const upload = require('../middleware/photo')

router.get("/", portofolioController.showPortofolio);
router.get("/detail", portofolioController.searchPortofolio);
router.get("/:id", portofolioController.showPortofolioById);
router.post("/", upload.single('photo'), portofolioController.inputPortofolio);
router.put("/:id", upload.single('photo'), portofolioController.updatePortofolio);
router.delete("/:id", portofolioController.deletePortofolio);

module.exports = router;
