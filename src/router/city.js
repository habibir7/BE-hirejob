const express = require("express")
const CityController = require("../controller/city")
const router = express.Router()
const {Protect} = require("../middleware/private")

router.get("/",CityController.getCity)
router.post("/",CityController.createCity)
router.put("/:id_city",CityController.updateCity)
router.delete("/:id_city",CityController.deleteCity)

module.exports = router