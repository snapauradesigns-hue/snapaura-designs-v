require("dotenv").config();
const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Portfolio = require("./models/Portfolio");
const portfolioData = require("./data/portfolioData");

const seedPortfolio = async () => {
  try {
    await connectDB();

    await Portfolio.deleteMany();

    await Portfolio.insertMany(portfolioData);

    console.log("✅ Portfolio seeded successfully.");

    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedPortfolio();
