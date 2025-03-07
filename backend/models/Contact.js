const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  phone: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  newsletterDescription: { type: String, required: true },
  socialLinks: {
    facebook: { type: String, required: true },
    telegram: { type: String, required: true },
    linkedin: { type: String, required: true },
    email: { type: String, required: true }
  },
  mapImageUrl: { type: String, required: true }
});

module.exports = mongoose.model("Contact", ContactSchema);
