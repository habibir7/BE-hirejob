const express = require("express");
const workerController = require("../controller/worker");
const router = express.Router();
const {Protect} = require('../middleware/private')
const upload = require('../middleware/photo')

router.get("/", workerController.showWorker);
router.get("/all/:user_id", workerController.showWorkerAllData);
router.get("/detail", workerController.searchWorker);
router.get("/:user_id", workerController.showWorkerById);
router.post("/",Protect, upload.single('photo'), workerController.inputWorker);
router.put("/",Protect, upload.single('photo'), workerController.updateWorker);
router.delete("/:id", workerController.deleteWorker);

module.exports = router;
