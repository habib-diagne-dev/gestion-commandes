const express = require('express');
const router = express.Router();
const controller = require("../controllers/produits")

router.get("/produits", controller.getAllProduits)
router.get("/produits/:id", controller.getProduitByID)
router.post("/produits", controller.addProduit)
router.put("/produits/:id", controller.updateProduit)

module.exports = router