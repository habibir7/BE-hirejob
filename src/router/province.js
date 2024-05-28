const express = require("express");
const ProvinceController = require("../controller/province");
const router = express.Router();
const { Protect } = require("../middleware/private");

router.get("/", ProvinceController.getProvince);
router.post("/", ProvinceController.createProvince);
router.put("/:id_province", ProvinceController.updateProvince);
router.delete("/:id_province", ProvinceController.deleteProvince);

module.exports = router;
