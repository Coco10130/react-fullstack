const express = require("express");
const router = express.Router();
const {
  registerAccount,
  showAccounts,
  login,
  deleteAccount,
  getProfile,
  logoutUser,
} = require("../controllers/auth.controller");

router.post("/register", registerAccount);

router.post("/login", login);

router.get("/showAccounts", showAccounts);

router.delete("/:id", deleteAccount);

router.get("/profile", getProfile);

router.get("/logout", logoutUser);

module.exports = router;
