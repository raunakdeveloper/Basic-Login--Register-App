// config/db.js
const mongoose = require("mongoose");
require("dotenv").config(); // Corrected spelling of `config`

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message); // Clearer error message
    process.exit(1);
  }
};

module.exports = connectDB;
