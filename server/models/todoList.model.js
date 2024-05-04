const mongoose = require("mongoose");

const TodoListSchema = mongoose.Schema(
  {
    task: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const TodoList = mongoose.model("TodoList", TodoListSchema);

module.exports = TodoList;
