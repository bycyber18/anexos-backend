const express = require("express");
const router = express.Router();
const anexoController = require("../controllers/anexo.controller");

// Ruta para subir la plantilla (Word)
// POST http://localhost:3000/api/anexos/subir
router.post(
  "/subir",
  anexoController.upload.single("file"),
  anexoController.subirPlantilla,
);

// Ruta para generar el anexo con datos
// POST http://localhost:3000/api/anexos/generar
router.post("/generar", anexoController.generarAnexo);

module.exports = router;
