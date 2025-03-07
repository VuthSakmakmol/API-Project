require("dotenv").config();
const mongoose = require("mongoose");
const Logo = require("../models/Logo");

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Seed Data (Only One Logo)
const logoData = {
  name: "Default Logo", 
  imageUrl: "https://i.pinimg.com/474x/fc/19/ba/fc19ba3e562e337dc60f41eba631ad1f.jpg",
};

// ✅ Seed Function
const seedLogo = async () => {
  try {
    await Logo.deleteMany(); // Clear existing data
    await Logo.create(logoData);
    console.log("✅ Logo seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding logo:", error);
    mongoose.connection.close();
  }
};

// ✅ Run Seeder
seedLogo();
