require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("../models/Service");

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Seed Data
const servicesData = {
  title: "Our Services",
  description: "We offer a range of architectural and design services tailored to meet your needs. From concept design to full project execution, we create spaces that inspire.",
  services: [
    { 
      name: "Architectural Design", 
      description: "Conceptual and structural designs tailored to your vision.", 
      icon: "https://img.icons8.com/ios-filled/100/000000/architecture.png"
    },
    { 
      name: "Interior Design", 
      description: "Creating stylish and functional interior spaces.", 
      icon: "https://img.icons8.com/ios-filled/100/000000/interior.png"
    },
    { 
      name: "Landscape Planning", 
      description: "Designing beautiful outdoor environments for homes and businesses.", 
      icon: "https://img.icons8.com/ios-filled/100/000000/garden.png"
    },
    { 
      name: "Project Management", 
      description: "Supervising and ensuring smooth project execution.", 
      icon: "https://img.icons8.com/ios-filled/100/000000/maintenance.png"
    },
    { 
      name: "Sustainable Architecture", 
      description: "Eco-friendly and energy-efficient building solutions.", 
      icon: "https://img.icons8.com/ios-filled/100/000000/green-energy.png"
    },
    { 
      name: "3D Rendering & Visualization", 
      description: "High-quality 3D models and visual presentations.", 
      icon: "https://img.icons8.com/ios-filled/100/000000/3d-model.png"
    }
  ]
};

// ✅ Seed Function
const seedServices = async () => {
  try {
    await Service.deleteMany(); // Clear existing data
    await Service.create(servicesData);
    console.log("✅ Services data seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("❌ Error seeding services:", error);
    mongoose.connection.close();
  }
};

// ✅ Run Seeder
seedServices();
