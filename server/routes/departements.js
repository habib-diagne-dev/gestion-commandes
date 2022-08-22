const express = require('express');
const router = express.Router();
const controller = require("../controllers/departements")

router.get("/departements", controller.getAllDepartements)
router.get("/departements/:id", controller.getDepartementByID)
router.post("departements", controller.createDepartement)
router.put("departements/:id", controller.updateDepartement)
router.delete("departements/:id", controller.deleteDepartement)


module.exports = router