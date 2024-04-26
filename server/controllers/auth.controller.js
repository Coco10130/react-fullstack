const Auth = require("../models/auth.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Auth.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      const jwtSecret = process.env.JWT_SECRET || "fallback_secret";
      const token = jwt.sign({ userId: user._id }, jwtSecret, {
        expiresIn: "30d",
      });

      res.status(200).json({ message: "Login successful", token });
    } else res.status(400).json({ message: "Invalid credentials" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerAccount = async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const userData = {
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
    };

    await Auth.create(userData);
    res.status(200).json({ message: "Account created successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const showAccounts = async (req, res) => {
  try {
    const auth = await Auth.find({});
    res.status(200).json(auth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const { id } = req.params;
    await Auth.findByIdAndDelete(id);

    res.status(200).json({ message: "Account deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerAccount,
  showAccounts,
  login,
  deleteAccount,
};
