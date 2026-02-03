const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // NOTA: Reemplazar con su propia URL de MongoDB Atlas o Local
    await mongoose.connect("mongodb://127.0.0.1:27017/gestor_anexos");
    console.log("✅ MongoDB Conectado");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
