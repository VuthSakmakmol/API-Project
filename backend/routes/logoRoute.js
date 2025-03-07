const express = require("express");
const router = express.Router();
const Logo = require("../models/Logo");

// ✅ Ensure body parsing middleware is active in `server.js`
router.use(express.json());

// ✅ GET the logo from MongoDB
router.get("/", async (req, res) => {
    try {
        const logo = await Logo.findOne();
        if (!logo) {
            return res.status(404).json({ error: "Logo not found" });
        }
        res.json(logo);
    } catch (err) {
        console.error("❌ Error fetching logo:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ✅ PUT (Update) the logo
router.put("/", async (req, res) => {
    try {
        console.log("🔄 Update Request Received:", req.body);
        const { imageUrl } = req.body;

        if (!imageUrl || typeof imageUrl !== "string") {
            console.error("❌ Error: Missing or invalid imageUrl");
            return res.status(400).json({ error: "Valid imageUrl is required" });
        }

        let logo = await Logo.findOne();
        if (!logo) {
            console.log("🆕 No existing logo, creating new...");
            logo = new Logo({ name: "Default Logo", imageUrl });
        } else {
            console.log("✏️ Updating existing logo...");
            logo.imageUrl = imageUrl;
        }

        await logo.save();
        console.log("✅ Logo Updated Successfully:", logo);
        res.json({ message: "Logo updated successfully", logo });
    } catch (err) {
        console.error("🚨 Error updating logo:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
