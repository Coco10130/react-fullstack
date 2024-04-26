const { MinKey } = require("mongodb");
const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: [true, "Add a user name"],
      unique: true,
    },

    email: {
      type: String,
      required: [true, "Add a email"],
      unique: true,
    },

    password: {
      type: String,
      required: [true, "Add a password"],
      minLength: [8, "Password must be at least 8 characters"],
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
