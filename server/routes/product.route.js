const express = require("express");
const router = express.Router();
const {
  getSingleProduct,
  getProducts,
  addProduct,
  updateProuct,
  deleteProduct,
} = require("../controllers/product.controller.js");

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.post("/", addProduct);

router.put("/:id", updateProuct);

router.delete("/:id", deleteProduct);

module.exports = router;
