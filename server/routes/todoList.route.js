const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware");

const { getTodos, addTodo } = require("../controllers/todoList.controller");

// require auth for all todo lists
router.use(authMiddleware);

router.get("/", getTodos);

router.post("/", addTodo);

module.exports = router;
