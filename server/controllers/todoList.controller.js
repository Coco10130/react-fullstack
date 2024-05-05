const TodoList = require("../models/todoList.model");
const jwt = require("jsonwebtoken");

const getTodos = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const todo = await TodoList.find({ createdBy: user.id });

    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = jwt.verify(token, process.env.JWT_SECRET);

    const task = req.body.task;
    const formattedTask = task.trim().toLowerCase();

    const existingTask = await TodoList.findOne({
      createdBy: user.id,
      task: formattedTask,
    });

    if (existingTask) {
      return res.status(200).json({ message: "Task already exists" });
    }

    const formattedData = {
      task: formattedTask,
      createdBy: user.id,
    };

    const todo = await TodoList.create(formattedData);

    res.status(201).json({ success: "Task created successfully!", data: todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { token } = req.cookies;

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { id } = req.params;

    const todo = await TodoList.findByIdAndDelete(id);

    if (!todo) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ success: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
  deleteTodo,
};
