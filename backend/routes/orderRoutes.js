const express = require('express');
const router = express.Router();
const {
  createOrder, getMyOrders, getOrderById,
  payOrder, getAllOrders, updateOrderStatus
} = require('../controllers/orderController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.post('/', protect, createOrder);
router.get('/myorders', protect, getMyOrders);
router.get('/:id', protect, getOrderById);
router.put('/:id/pay', protect, payOrder);
router.get('/', protect, adminOnly, getAllOrders);
router.put('/:id/status', protect, adminOnly, updateOrderStatus);

module.exports = router;
