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
    const newProduct = req.body;

    const formattedName = newProduct.name.trim().toLowerCase();
    const priceToAdd = parseInt(newProduct.price);
    const quantityToAdd = parseInt(newProduct.quantity);

    const newRequest = {
      name: formattedName,
      price: priceToAdd,
      quantity: quantityToAdd,
    };

    const existingProduct = await Product.findOne({ name: formattedName });

    if (existingProduct) {
      existingProduct.price += priceToAdd;
      existingProduct.quantity += quantityToAdd;

      await existingProduct.save();

      res.status(201).json(existingProduct);
    } else {
      const product = await Product.create(newRequest);
      res.status(200).json(product);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProuct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const updatedProduct = await Product.findById(id);

    res.status(200).json(updatedProduct);
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

    res.status(200).json({ message: "Product deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  getSingleProduct,
  addProduct,
  updateProuct,
  deleteProduct,
};
