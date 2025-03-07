require("dotenv").config();
const mongoose = require("mongoose");
const Contact = require("../models/Contact");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Seed Data
const contactData = {
  phone: "(+876) 765 665",
  email: "mail@influenca.id",
  location: "London Eye, London",
  newsletterDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, ut elit tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.",
  socialLinks: {
    facebook: "https://facebook.com/yourpage",
    telegram: "https://t.me/yourtelegram",
    linkedin: "https://linkedin.com/in/yourprofile",
    email: "mail@influenca.id"
  },
  mapImageUrl: "https://i.pinimg.com/736x/2f/e9/03/2fe9038dc4eb3f5cec17601fe85cc210.jpg"
};

// Seed Function
const seedContact = async () => {
  try {
    await Contact.deleteMany(); // Clear existing data
    await Contact.create(contactData);
    console.log("✅ Contact data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding Contact data:", error);
    mongoose.connection.close();
  }
};

// Run Seeder
seedContact();