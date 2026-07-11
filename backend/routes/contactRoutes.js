const express = require("express");

const router = express.Router();

const auth = require("../middleware/auth");

const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").post(createContact).get(getContacts);

router.delete("/:id", auth, deleteContact);

module.exports = router;
