const Gallery = require("../models/gallery.model.js");
const jwt = require("jsonwebtoken");

const getGallery = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const gallery = await Gallery.find({ createdBy: user.id });

    res.status(200).json(gallery);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addGallery = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);
    const imageFile = req.file.filename;

    const data = {
      image: imageFile,
      createdBy: user.id,
    };

    const gallery = await Gallery.create(data);

    res
      .status(201)
      .json({ success: "Image uploaded successfully", data: gallery });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getGallery,
  addGallery,
};
