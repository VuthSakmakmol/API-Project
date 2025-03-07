require("dotenv").config();
const mongoose = require("mongoose");
const Home = require("../models/Home");

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/restfulAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Seed Data
const homeData = {
  title: "Welcome to Our Website",
  description: "We build amazing architecture designs.",
  images: [
    "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-list-img-1-3.jpg",
    "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-img-3.jpg",
    "https://brok.qodeinteractive.com/wp-content/uploads/2021/11/h1-port-img-2.jpg",
  ],
};

// ✅ Seed Function
const seedHome = async () => {
  try {
    // ✅ Ensure collection is created by inserting data
    await Home.deleteMany(); // Clears old data
    await Home.create(homeData); // Inserts new data

    console.log("✅ Home data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding Home data:", error);
    mongoose.connection.close();
  }
};

// Run Seeder
seedHome();
