const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

// Public routes
router.get("/", getPortfolio);
router.get("/:id", getPortfolioById);

// Protected routes
router.post("/", auth, upload.single("image"), createPortfolio);
router.put("/:id", auth, upload.single("image"), updatePortfolio);
router.delete("/:id", auth, deletePortfolio);

module.exports = router;
