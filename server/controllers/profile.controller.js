const Auth = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");

const getProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const userProfile = await Auth.findOne({ _id: user.id }).select(
      "-password"
    );

    res.status(200).json(userProfile);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    let user;

    try {
      user = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }

    if (!user || !user.id) {
      return res.status(401).json({ message: "Invalid user in token" });
    }

    if (user.id !== id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const imageFile = req.file.filename;

    const data = {
      image: imageFile,
    };

    const userProfile = await Auth.findOneAndUpdate({ _id: id }, data, {
      new: true,
    });

    res
      .status(201)
      .json({ success: "Profile updated successfully", data: userProfile });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
};
