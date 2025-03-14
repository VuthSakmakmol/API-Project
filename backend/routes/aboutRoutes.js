const express = require("express");
const router = express.Router();
const About = require("../models/About");

// ✅ Get About Us Data
router.get("/", async (req, res) => {
  try {
    const aboutData = await About.findOne(); // Get the first About document
    if (!aboutData) {
      return res.status(404).json({ message: "No About Us data found" });
    }
    res.json(aboutData);
  } catch (error) {
    console.error("❌ Error fetching About Us:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update About Us Data (Dynamic ID)
router.put("/:id", async (req, res) => {
  try {
    const updatedAbout = await About.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedAbout) {
      return res.status(404).json({ message: "About Us not found" });
    }

    res.json(updatedAbout);
  } catch (error) {
    console.error("❌ Error updating About Us:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update About Us Data (General - Without ID)
router.put("/", async (req, res) => {
  try {
    const aboutData = await About.findOneAndUpdate({}, req.body, { new: true, upsert: true });

    res.json(aboutData);
  } catch (error) {
    console.error("❌ Error updating About Us:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Create About Us (Only Run Once)
router.post("/", async (req, res) => {
  try {
    const newAbout = new About(req.body);
    await newAbout.save();
    res.status(201).json(newAbout);
  } catch (error) {
    console.error("❌ Error creating About Us:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete About Us Data
router.delete("/:id", async (req, res) => {
  try {
    const deletedAbout = await About.findByIdAndDelete(req.params.id);
    if (!deletedAbout) {
      return res.status(404).json({ message: "About Us not found" });
    }

    res.json({ message: "About Us data deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting About Us:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
