const express = require("express");

const router = express.Router();

const {
  createContact,
  getContacts,
  deleteContact,
} = require("../controllers/contactController");

router.route("/").post(createContact).get(getContacts);

router.delete("/:id", deleteContact);

module.exports = router;
