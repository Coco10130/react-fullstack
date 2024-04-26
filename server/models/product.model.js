const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: "string",
      required: [true, "Please enter product name"],
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

    image: {
      type: "string",
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", ProductSchema);

module.exports = Product;
