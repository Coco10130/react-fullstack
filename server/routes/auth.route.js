const express = require("express");
const router = express.Router();
const {
  registerAccount,
  showAccounts,
  login,
  deleteAccount,
  getProfile,
} = require("../controllers/auth.controller");

router.post("/register", registerAccount);

router.post("/login", login);

router.get("/showAccounts", showAccounts);

router.delete("/:id", deleteAccount);

router.get("/profile", getProfile);

module.exports = router;
