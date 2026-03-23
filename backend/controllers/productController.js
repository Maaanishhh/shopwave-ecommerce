const asyncHandler = require('express-async-handler');
const Product = require('../models/Product');

// @desc   Get all products (with filters, search, pagination)
// @route  GET /api/products
// @access Public
const getProducts = asyncHandler(async (req, res) => {
  const { keyword, category, minPrice, maxPrice, sort, page = 1, limit = 12 } = req.query;

  const query = {};
  if (keyword) query.name = { $regex: keyword, $options: 'i' };
  if (category) query.category = category;
  if (minPrice || maxPrice) query.price = {};
  if (minPrice) query.price.$gte = Number(minPrice);
  if (maxPrice) query.price.$lte = Number(maxPrice);

  const sortOptions = {
    'price-asc': { price: 1 },
    'price-desc': { price: -1 },
    newest: { createdAt: -1 },
    rating: { rating: -1 },
  };

  const sortBy = sortOptions[sort] || { createdAt: -1 };
  const skip = (Number(page) - 1) * Number(limit);

  const [products, total] = await Promise.all([
    Product.find(query).sort(sortBy).skip(skip).limit(Number(limit)),
    Product.countDocuments(query),
  ]);

  res.json({
    products,
    page: Number(page),
    pages: Math.ceil(total / Number(limit)),
    total,
  });
});

// @desc   Get single product
// @route  GET /api/products/:id
// @access Public
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// @desc   Get featured products
// @route  GET /api/products/featured
// @access Public
const getFeaturedProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({ featured: true }).limit(8);
  res.json(products);
});

// @desc   Create product (Admin)
// @route  POST /api/products
// @access Private/Admin
const createProduct = asyncHandler(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc   Update product (Admin)
// @route  PUT /api/products/:id
// @access Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// @desc   Delete product (Admin)
// @route  DELETE /api/products/:id
// @access Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted' });
});

// @desc   Add review
// @route  POST /api/products/:id/reviews
// @access Private
const addReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );
  if (alreadyReviewed) return res.status(400).json({ message: 'Product already reviewed' });

  product.reviews.push({ ...req.body, user: req.user._id, name: req.user.name });
  product.calcAverageRating();
  await product.save();
  res.status(201).json({ message: 'Review added' });
});

module.exports = { getProducts, getProductById, getFeaturedProducts, createProduct, updateProduct, deleteProduct, addReview };
