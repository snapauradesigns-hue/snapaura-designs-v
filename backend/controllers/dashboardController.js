const Portfolio = require("../models/Portfolio");
const Contact = require("../models/Contact");

exports.getStats = async (req, res) => {
  try {
    const totalProjects = await Portfolio.countDocuments();

    const featuredProjects = await Portfolio.countDocuments({
      featured: true,
    });

    const totalContacts = await Contact.countDocuments();

    const categories = await Portfolio.distinct("category");

    res.json({
      success: true,
      data: {
        totalProjects,
        featuredProjects,
        totalContacts,
        totalCategories: categories.length,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
