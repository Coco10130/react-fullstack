const express = require("express");
const router = express.Router();
const authMiddleware = require("../helpers/authMiddleware.js");
const {
  getSingleProduct,
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

// require auth for all products
router.use(authMiddleware);

router.get("/", getProducts);

router.get("/:id", getSingleProduct);

router.post("/", addProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

module.exports = router;
