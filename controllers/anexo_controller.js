const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const fs = require("fs");
const path = require("path");

// Configuración simple para subir archivos (Multer)
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "storage/templates/");
  },
  filename: function (req, file, cb) {
    // Guardamos con el nombre original. Cuidado con duplicados en prod.
    cb(null, file.originalname);
  },
});
exports.upload = multer({ storage: storage });

// 1. Subir Plantilla
exports.subirPlantilla = (req, res) => {
  if (!req.file) {
    return res.status(400).send("No se subió ningún archivo.");
  }
  res.send({
    message: "Plantilla subida con éxito",
    filename: req.file.filename,
  });
};

// 2. Generar Documento
exports.generarAnexo = (req, res) => {
  try {
    // En un caso real, el nombre de la plantilla vendría en req.body.nombrePlantilla
    const templateName = req.body.nombrePlantilla || "plantilla_prueba.docx";
    const templatePath = path.resolve(
      __dirname,
      "../storage/templates",
      templateName,
    );

    if (!fs.existsSync(templatePath)) {
      return res
        .status(404)
        .json({ error: `Plantilla '${templateName}' no encontrada.` });
    }

    const content = fs.readFileSync(templatePath, "binary");
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // Inyectar datos del frontend
    doc.render(req.body.datos || {});

    const buf = doc
      .getZip()
      .generate({ type: "nodebuffer", compression: "DEFLATE" });

    res.setHeader(
      "Content-Disposition",
      "attachment; filename=anexo_final.docx",
    );
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    );
    res.send(buf);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error al generar el documento" });
  }
};
