const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },

    price: {
      type: "number",
      required: true,
      default: 0,
    },

    quantity: {
      type: "number",
      required: true,
      default: 0,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Auth",
      required: true,
    },

    image: {
      type: "string",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
