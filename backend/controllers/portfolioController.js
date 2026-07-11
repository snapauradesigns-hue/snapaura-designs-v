const Portfolio = require("../models/portfolio");

// ========================================
// GET ALL PORTFOLIO
// ========================================
exports.getPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: portfolio.length,
      data: portfolio,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================================
// GET SINGLE PORTFOLIO
// ========================================
exports.getPortfolioById = async (req, res) => {
  try {
    const portfolio = await Portfolio.findById(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      data: portfolio,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================================
// CREATE PORTFOLIO
// ========================================
exports.createPortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.create({
      title: req.body.title,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      featured: req.body.featured === "true",

      image: req.file.path,
      cloudinaryId: req.file.filename,
    });

    res.status(201).json({
      success: true,
      message: "Portfolio uploaded successfully",
      data: portfolio,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// ========================================
// UPDATE PORTFOLIO
// ========================================
exports.updatePortfolio = async (req, res) => {
  try {
    const updateData = {
      title: req.body.title,
      brand: req.body.brand,
      category: req.body.category,
      description: req.body.description,
      featured: req.body.featured === "true",
    };

    // Update image only if a new one is uploaded
    if (req.file) {
      updateData.image = req.file.path;
      updateData.cloudinaryId = req.file.filename;
    }

    const portfolio = await Portfolio.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
      });
    }

    res.json({
      success: true,
      message: "Project updated successfully",
      data: portfolio,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
// ========================================
// DELETE PORTFOLIO
// ========================================
exports.deletePortfolio = async (req, res) => {
  try {
    const portfolio = await Portfolio.findByIdAndDelete(req.params.id);

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
