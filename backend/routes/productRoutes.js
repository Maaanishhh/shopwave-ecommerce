const express = require('express');
const router = express.Router();
const {
  getProducts, getProductById, getFeaturedProducts,
  createProduct, updateProduct, deleteProduct, addReview
} = require('../controllers/productController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/featured', getFeaturedProducts);
router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, adminOnly, createProduct);
router.put('/:id', protect, adminOnly, updateProduct);
router.delete('/:id', protect, adminOnly, deleteProduct);
router.post('/:id/reviews', protect, addReview);

module.exports = router;
