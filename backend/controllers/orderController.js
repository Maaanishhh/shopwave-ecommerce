const asyncHandler = require('express-async-handler');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc   Create order
// @route  POST /api/orders
// @access Private
const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, itemsPrice, shippingPrice, taxPrice, totalPrice } = req.body;

  if (!items || items.length === 0)
    return res.status(400).json({ message: 'No order items' });

  const order = await Order.create({
    user: req.user._id,
    items,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  });

  // Update stock
  for (const item of items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity, sold: item.quantity },
    });
  }

  res.status(201).json(order);
});

// @desc   Get logged in user's orders
// @route  GET /api/orders/myorders
// @access Private
const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// @desc   Get order by ID
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email');
  if (!order) return res.status(404).json({ message: 'Order not found' });
  if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin')
    return res.status(403).json({ message: 'Not authorized' });
  res.json(order);
});

// @desc   Mark order as paid
// @route  PUT /api/orders/:id/pay
// @access Private
const payOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) return res.status(404).json({ message: 'Order not found' });

  order.isPaid = true;
  order.paidAt = Date.now();
  order.status = 'processing';
  order.paymentResult = req.body;
  await order.save();
  res.json(order);
});

// @desc   Get all orders (Admin)
// @route  GET /api/orders
// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'name email').sort({ createdAt: -1 });
  res.json(orders);
});

// @desc   Update order status (Admin)
// @route  PUT /api/orders/:id/status
// @access Private/Admin
const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, ...(req.body.status === 'delivered' ? { isDelivered: true, deliveredAt: Date.now() } : {}) },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = { createOrder, getMyOrders, getOrderById, payOrder, getAllOrders, updateOrderStatus };
