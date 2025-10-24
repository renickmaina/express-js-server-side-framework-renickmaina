// controllers/productController.js
const Product = require("../models/product");

// Get all products (with filtering, pagination, and search)
exports.getProducts = async (req, res, next) => {
  try {
    const { category, page = 1, limit = 5, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: "i" };

    const products = await Product.find(query)
      .limit(Number(limit))
      .skip((page - 1) * limit);

    res.json(products);
  } catch (err) {
    next(err);
  }
};

// Get product by ID
exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Create new product
exports.createProduct = async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    next(err);
  }
};

// Update product
exports.updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (err) {
    next(err);
  }
};

// Delete product
exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    next(err);
  }
};

// Product stats
exports.getStats = async (req, res, next) => {
  try {
    const stats = await Product.aggregate([
      { $group: { _id: "$category", count: { $sum: 1 } } },
    ]);
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
