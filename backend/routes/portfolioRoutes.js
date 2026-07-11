const auth = require("../middleware/auth");

const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");

const {
  getPortfolio,
  getPortfolioById,
  createPortfolio,
  updatePortfolio,
  deletePortfolio,
} = require("../controllers/portfolioController");

router
  .route("/")
  .get(getPortfolio)
  .post(upload.single("image"), createPortfolio);

router
  .route("/:id")
  .get(getPortfolioById)
  .put(upload.single("image"), updatePortfolio)
  .delete(deletePortfolio);

router.post("/", auth, upload.single("image"), createPortfolio);

router.put("/:id", auth, upload.single("image"), updatePortfolio);

router.delete("/:id", auth, deletePortfolio);
module.exports = router;
