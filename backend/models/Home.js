const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  images: { type: [String], required: true },
}, { timestamps: true }); // ✅ Ensures automatic creation

module.exports = mongoose.model("Home", HomeSchema);
