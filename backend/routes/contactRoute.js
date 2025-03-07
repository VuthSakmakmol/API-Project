const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

// ✅ Get Contact Data
router.get("/", async (req, res) => {
  try {
    const contactData = await Contact.findOne(); // Get the first Contact document
    if (!contactData) {
      return res.status(404).json({ message: "No Contact data found" });
    }
    res.json(contactData);
  } catch (error) {
    console.error("❌ Error fetching Contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update Contact Data (Dynamic ID)
router.put("/:id", async (req, res) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    console.error("❌ Error updating Contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Update Contact Data (General - Without ID)
router.put("/", async (req, res) => {
  try {
    const updatedContact = await Contact.findOneAndUpdate({}, req.body, { new: true, upsert: true });
    res.json(updatedContact);
  } catch (error) {
    console.error("❌ Error updating Contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


// ✅ Create Contact (Only Run Once)
router.post("/", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("❌ Error creating Contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// ✅ Delete Contact Data
router.delete("/:id", async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    if (!deletedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact data deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting Contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
