const mongoose = require("mongoose");

const AuthSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      minLength: 8,
    },

    image: {
      type: String,
      required: false,
    },

    birthdate: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Auth = mongoose.model("Auth", AuthSchema);

module.exports = Auth;
