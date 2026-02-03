const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // NOTA: Reemplazar con su propia URL de MongoDB Atlas o Local
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Conectado");
  } catch (error) {
    console.error("❌ Error conectando a MongoDB:", error);
    process.exit(1);
  }
};

module.exports = connectDB;
