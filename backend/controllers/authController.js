const User = require("../models/User");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        success: false,

        message: "User already exists",
      });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,

      email,

      password: hashed,
    });

    res.status(201).json({
      success: true,

      message: "Admin created successfully",
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      message: err.message,
    });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,

        message: "Invalid Credentials",
      });
    }

    const match = await bcrypt.compare(
      password,

      user.password,
    );

    if (!match) {
      return res.status(401).json({
        success: false,

        message: "Invalid Credentials",
      });
    }

    const token = jwt.sign(
      { id: user._id },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d",
      },
    );

    res.json({
      success: true,

      token,

      user: {
        name: user.name,

        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({
      success: false,

      message: err.message,
    });
  }
};
