const express = require('express');
const router = express.Router();
const controller = require("../controllers/fournisseurs")

router.get("/fournisseurs", controller.getAllFournisseurs)
router.get("/fournisseurs/:id", controller.getFournisseurByID)
router.post("/fournisseurs", controller.addFournisseur)
router.put("/fournisseurs/:id", controller.updateFournisseur)
router.put("/fournisseurs/lock/:id", controller.lockFournisseur)
router.put("/fournisseurs/unlock/:id", controller.unlockFournisseur)

module.exports = router