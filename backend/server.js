require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require('./routes/adminRoutes');
const productRoutes = require("./routes/productRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const contactRoutes = require("./routes/contactRoute");
const serviceRoutes = require("./routes/serviceRoute"); 
const logoRoutes = require("./routes/logoRoute");
const homeRoutes = require("./routes/homeRoute");


const app = express(); // ✅ FIXED: Moved `app` initialization to the top
const PORT = 5000;

app.use(cors({ origin: "http://localhost:5173" })); 

// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();


// ✅ Ensure routes are correctly set
app.use("/api/admin", adminRoutes);
app.use("/api/user", userRoutes);
app.use("/api/home", homeRoutes);
app.use("/api", productRoutes);
app.use("/api/about", aboutRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/logo", logoRoutes);




// Server Listening
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
