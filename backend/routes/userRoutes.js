// userRoutes.js
const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
const User = require('../models/User');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Get all users (Admin)
router.get('/', protect, adminOnly, asyncHandler(async (req, res) => {
  const users = await User.find().select('-password');
  res.json(users);
}));

// Delete user (Admin)
router.delete('/:id', protect, adminOnly, asyncHandler(async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'User deleted' });
}));

// Update profile
router.put('/profile', protect, asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) user.password = req.body.password;
  const updated = await user.save();
  res.json({ _id: updated._id, name: updated.name, email: updated.email, role: updated.role });
}));

module.exports = router;
