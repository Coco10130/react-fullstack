const TodoList = require("../models/todoList.model");

const getTodos = async (req, res) => {
  try {
    const todos = await TodoList.find({});
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addTodo = async (req, res) => {
  try {
    const { task } = req.body;
    const userId = req.user._id; // Assuming req.user.id contains the user ID

    const todo = await TodoList.create({ task, postedBy: userId });

    res.status(200).json({ message: "Todo added successfully.", todo });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  addTodo,
};
