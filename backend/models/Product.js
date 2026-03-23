const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    originalPrice: { type: Number },
    supplierPrice: { type: Number, default: 0 },
    supplierName: { type: String, default: '' },
    supplierLink: { type: String, default: '' },
    category: {
      type: String,
      required: true,
      enum: ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty', 'Toys', 'Food'],
    },
    brand: { type: String, default: '' },
    images: [{ type: String }],
    stock: { type: Number, required: true, default: 0, min: 0 },
    sold: { type: Number, default: 0 },
    reviews: [reviewSchema],
    rating: { type: Number, default: 0 },
    numReviews: { type: Number, default: 0 },
    featured: { type: Boolean, default: false },
    tags: [String],
  },
  { timestamps: true }
);

// Auto-calculate rating on save
productSchema.methods.calcAverageRating = function () {
  if (this.reviews.length === 0) {
    this.rating = 0;
    this.numReviews = 0;
  } else {
    this.numReviews = this.reviews.length;
    this.rating =
      this.reviews.reduce((sum, r) => sum + r.rating, 0) / this.reviews.length;
  }
};

module.exports = mongoose.model('Product', productSchema);
