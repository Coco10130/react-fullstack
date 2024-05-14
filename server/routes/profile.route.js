const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware.js");
const uploadMiddleware = require("../middlewares/multer.middleware.js");
const {
  getProfile,
  updateProfilePicture,
  updateProfile,
} = require("../controllers/profile.controller.js");

router.use(authMiddleware);

router.get("/", getProfile);

router.put("/:id", uploadMiddleware.single("image"), updateProfilePicture);

router.put("/update-details/:id", updateProfile);

module.exports = router;
