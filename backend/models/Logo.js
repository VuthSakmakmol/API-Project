const mongoose = require("mongoose");

const LogoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  imageUrl: { type: String, required: true },
});

module.exports = mongoose.model("Logo", LogoSchema);
