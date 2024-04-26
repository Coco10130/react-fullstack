const express = require("express");
const router = express.Router();
const {
  registerAccount,
  showAccounts,
  login,
  deleteAccount,
} = require("../controllers/auth.controller");

router.post("/register", registerAccount);

router.post("/login", login);

router.get("/", showAccounts);

router.delete("/:id", deleteAccount);

module.exports = router;
