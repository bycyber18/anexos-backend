const express = require("express");
const router = express.Router();
const anexoController = require("../controllers/anexo.controller");


// Subir plantilla
router.post(
  "/subir",
  anexoController.upload.single("file"),
  anexoController.subirPlantilla,
);

// Generar documento rellenando datos manualmente 
router.post("/generar", anexoController.generarAnexo);

// Subir PDF técnico y que la IA lo procese inteligentemente
router.post(
  "/inteligente",
  anexoController.uploadTecnico, 
  anexoController.generarAnexoInteligente, 
);

module.exports = router;
