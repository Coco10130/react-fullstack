const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");
const {
  getGallery,
  addGallery,
} = require("../controllers/gallery.controller.js");

router.use(authMiddleware);

router.get("/", getGallery);

router.post("/", uploadMiddleware.single("image"), addGallery);

module.exports = router;
