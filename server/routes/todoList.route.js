const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");
const {
  getTodos,
  addTodo,
  deleteTodo,
} = require("../controllers/todoList.controller");

// require auth for all todo lists
router.use(authMiddleware);

router.get("/", getTodos);

router.post("/", addTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
