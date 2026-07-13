const express = require("express");
const cors = require("cors");

const portfolioRoutes = require("./routes/portfolioRoutes");
const contactRoutes = require("./routes/contactRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Backend is healthy",
  });
});

app.use("/api/portfolio", portfolioRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Snap Aura Backend Running 🚀",
  });
});

module.exports = app;
