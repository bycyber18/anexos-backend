const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = 3000;

connectDB();
// Middlewares
app.use(cors());
app.use(express.json());

// Rutas Importadas
const anexoRoutes = require("./routes/anexo.routes");

// Uso de Rutas
app.use("/api/anexos", anexoRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
