const express = require("express");
const router = express.Router();
const Service = require("../models/Service");

// ✅ Get All Services
router.get("/", async (req, res) => {
  try {
    const servicesData = await Service.findOne(); // Fetch the first document
    if (!servicesData) {
      return res.status(404).json({ message: "No services found" });
    }
    res.json(servicesData);
  } catch (error) {
    console.error("❌ Error fetching services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update Services (Dynamic ID)
router.put("/:id", async (req, res) => {
  try {
    const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedService) {
      return res.status(404).json({ message: "Service data not found" });
    }

    res.json(updatedService);
  } catch (error) {
    console.error("❌ Error updating services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.put("/", async (req, res) => {
    try {
      const updatedService = await Service.findOneAndUpdate({}, req.body, { new: true, upsert: true });
      res.json(updatedService);
    } catch (error) {
      console.error("❌ Error updating services:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  
// ✅ Create Services (Only Run Once)
router.post("/", async (req, res) => {
  try {
    const newService = new Service(req.body);
    await newService.save();
    res.status(201).json(newService);
  } catch (error) {
    console.error("❌ Error creating services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete Services Data
router.delete("/:id", async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: "Service data not found" });
    }

    res.json({ message: "Service data deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
