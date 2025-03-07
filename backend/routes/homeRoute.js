const express = require("express");
const router = express.Router();
const Home = require("../models/Home");

// ✅ Get Homepage Data
router.get("/", async (req, res) => {
  try {
    const homeData = await Home.findOne();
    if (!homeData) {
      return res.status(404).json({ error: "Home data not found" });
    }
    res.json(homeData);
  } catch (error) {
    console.error("❌ Error fetching home data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// ✅ Update Homepage Data
router.put("/", async (req, res) => {
  try {
      const { title, description, images } = req.body;

      let homeData = await Home.findOne();
      if (!homeData) {
          homeData = new Home({ title, description, images });
      } else {
          homeData.title = title;
          homeData.description = description;
          homeData.images = images;
      }

      await homeData.save();
      res.json({ message: "Homepage updated successfully", homeData });
  } catch (error) {
      console.error("❌ Error updating homepage:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
