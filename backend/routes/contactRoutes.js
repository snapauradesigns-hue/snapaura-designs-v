const express = require("express");

const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").post(createContact).get(getContacts);

const auth = require("../middleware/auth");

router.delete("/:id", auth, deleteContact);

module.exports = router;
