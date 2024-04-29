const Auth = require("../models/auth.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const {
  hashPassword,
  comparePasswords,
} = require("../helpers/authenticate.js");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user entered email address
    if (email === "") {
      return res.status(200).json({ message: "Email is required" });
    }

    // check if use exists
    const user = await Auth.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "User not found" });
    }

    // Check if password match
    const match = await comparePasswords(password, user.password);

    if (match) {
      return res.status(200).json({ success: "Password match" });
    } else {
      return res.status(201).json({ message: "Password not match" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerAccount = async (req, res) => {
  try {
    const { email, userName, password } = req.body;

    // Check if name is entered
    if (!userName) {
      return res.status(201).json({ message: "Please enter name" });
    }

    // Check if password is good
    if (!password || password.length < 8) {
      return res.status(201).json({
        message: "Password is required and at least 8 characters long",
      });
    }

    // Check if email is entered
    if (!email) {
      return res.status(201).json({ message: "Please enter email" });
    }

    // Check email
    const exist = await Auth.findOne({ email });

    if (exist) {
      return res.status(201).json({ message: "Email is already taken" });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);
    const userData = {
      userName,
      email,
      password: hashedPassword,
    };

    await Auth.create(userData);
    res.status(200).json({ success: "Account created successfuly" });
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
