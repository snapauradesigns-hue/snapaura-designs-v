const Contact = require("../models/Contact");
const sendEmail = require("../utils/sendEmail");

// Create Contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    // Email to Admin

    await sendEmail({
      to: process.env.EMAIL_USER,

      subject: "📩 New Inquiry - Snap Aura Designs",

      html: `

    <h2>New Client Inquiry</h2>

    <p><strong>Name:</strong> ${contact.name}</p>

    <p><strong>Email:</strong> ${contact.email}</p>

    <p><strong>Phone:</strong> ${contact.phone}</p>

    <p><strong>Service:</strong> ${contact.service}</p>

    <p><strong>Budget:</strong> ${contact.budget}</p>

    <p><strong>Message:</strong> ${contact.message}</p>

    `,
    });
    await sendEmail({
      to: contact.email,

      subject: "Thank You for Contacting Snap Aura Designs",

      html: `

    <div style="font-family:Arial;padding:20px;">

        <h2 style="color:#2563eb;">
            Thank You!
        </h2>

        <p>Hi ${contact.name},</p>

        <p>

        We have successfully received your inquiry.

        Our team will contact you shortly.

        </p>

        <br>

        <p>

        Regards,

        <br>

        <strong>Snap Aura Designs</strong>

        </p>

    </div>

    `,
    });

    res.status(201).json({
      success: true,
      message: "Thank you! Your inquiry has been received.",
      data: contact,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

// Get All Contacts
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: contacts.length,
      data: contacts,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
// Delete Contact
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Contact deleted successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
