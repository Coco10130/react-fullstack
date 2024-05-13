const Auth = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
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
      jwt.sign(
        { email: user.email, id: user._id, name: user.userName },
        process.env.JWT_SECRET,
        { expiresIn: "7d" },
        (err, token) => {
          if (err) throw err;
          res
            .cookie("token", token, { httpOnly: true })
            .status(200)
            .json({ user: user, token: token });
        }
      );
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

const logoutUser = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

const getProfile = async (req, res) => {
  const { token } = req.cookies;
  if (token) {
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      res.status(200).json({ user, token });
    } catch (err) {
      res.status(401).json({ message: "Invalid authorization token" });
    }
  } else {
    res.status(401).json({ message: "Not authorized" });
  }
};

module.exports = {
  registerAccount,
  showAccounts,
  login,
  deleteAccount,
  logoutUser,
  getProfile,
};
