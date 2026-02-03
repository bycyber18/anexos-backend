const express = require("express");
const router = express.Router();
const anexoController = require("../controllers/anexo.controller");

// ==========================================
// 1. RUTAS MANUALES (Lo que ya tenías)
// ==========================================

// Subir una plantilla Word vacía (Form-Data: key 'file')
// POST http://localhost:3000/api/anexos/subir
router.post(
  "/subir",
  anexoController.upload.single("file"),
  anexoController.subirPlantilla,
);

// Generar documento rellenando datos manualmente (JSON Raw)
// POST http://localhost:3000/api/anexos/generar
router.post("/generar", anexoController.generarAnexo);

// ==========================================
// 2. RUTA INTELIGENTE (LA NUEVA)
// ==========================================

// Subir PDF técnico y que la IA lo procese (Form-Data: key 'pdfTecnico')
// POST http://localhost:3000/api/anexos/inteligente
router.post(
  "/inteligente",
  anexoController.uploadTecnico, // Middleware que permite subir el PDF
  anexoController.generarAnexoInteligente, // Controlador que llama a Gemini
);

module.exports = router;
