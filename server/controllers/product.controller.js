const Product = require("../models/product.model.js");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingleProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ name: req.body.name });

    if (existingProduct) {
      return res.status(200).json({ message: "Product already exists" });
    }

    const productName = req.body.name.trim().toLowerCase();

    const formattedProduct = {
      name: productName,
      description: req.body.description,
      price: req.body.price,
      quantity: req.body.quantity,
    };

    const product = await Product.create(formattedProduct);
    res
      .status(201)
      .json({ success: "Product added successfully", data: product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const quantity = parseFloat(req.body.quantity);

    if (Number.isInteger(quantity)) {
      const product = await Product.findByIdAndUpdate(id, req.body);

      if (!product) {
        return res.status(200).json({ message: "Product not found" });
      }

      const updatedProduct = await Product.findById(id);

      return res.status(200).json({
        success: "Product updated successfully",
        data: updatedProduct,
      });
    } else {
      return res.status(200).json({
        message:
          "The quantity should be a non-decimal number, represented as an integer value.",
      });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ success: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProduct,
  deleteProduct,
};
