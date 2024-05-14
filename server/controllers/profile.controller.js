const Auth = require("../models/auth.model.js");
const jwt = require("jsonwebtoken");
const path = require("path");
const { deleteFile } = require("../util/deleteFile.util.js");

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

const updateProfilePicture = async (req, res) => {
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

    const userProfile = await Auth.findById(id);

    if (userProfile && userProfile.image) {
      const oldImagePath = path.join(
        __dirname,
        `../../client/basta/public/images/${userProfile.image}`
      );
      deleteFile(oldImagePath);
    }

    userProfile.image = imageFile;
    await userProfile.save();

    res
      .status(201)
      .json({ success: "Profile updated successfully", data: userProfile });
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

    const user = jwt.verify(token, process.env.JWT_SECRET);

    let formattedNumber = req.body.phoneNumber;
    if (formattedNumber) {
      formattedNumber = formattedNumber.replace(/[^0-9]/g, "");
      if (formattedNumber.length !== 11 || !formattedNumber.startsWith("09")) {
        return res.status(202).json({
          message: "Phone number must be 11 digits and start with '09'",
        });
      }
    }

    const birthdate = req.body.birthdate;
    let formattedBirthdate;

    // Format birthdate (assuming birthdate is in YYYY-MM-DD format)
    if (birthdate) {
      const dateObject = new Date(birthdate);
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      formattedBirthdate = `${
        monthNames[dateObject.getMonth()]
      } ${dateObject.getDate()}, ${dateObject.getFullYear()}`;
    }

    const data = {
      userName: req.body.userName,
      phoneNumber: formattedNumber,
      birthdate: formattedBirthdate,
    };

    await Auth.findByIdAndUpdate(id, data);

    const updatedUser = await Auth.findOne({ _id: user.id }).select(
      "-password"
    );

    res
      .status(201)
      .json({ success: "Profile updated successfully", data: updatedUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfilePicture,
  updateProfile,
};
