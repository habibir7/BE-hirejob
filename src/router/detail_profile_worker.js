const express = require("express");
const detailProfileWorkerController = require("../controller/detail_profile_worker");
const router = express.Router();
// const {Protect} = require('../middleware/private')
// const upload = require('../middleware/photo')

router.get("/", detailProfileWorkerController.showDetailProfileWorker);
router.get("/detail", detailProfileWorkerController.searchDetailProfileWorker);
router.get("/:id", detailProfileWorkerController.showDetailProfileWorkerById);
router.post("/", detailProfileWorkerController.inputDetailProfileWorker);
router.put("/:id", detailProfileWorkerController.updateDetailProfileWorker);
router.delete("/:id", detailProfileWorkerController.deleteDetailProfileWorker);

module.exports = router;
