import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function ProductDetailPage() {
  const { id } = useParams();
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [qty, setQty] = useState(1);
  const [activeImg, setActiveImg] = useState(0);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(r => setProduct(r.data)).finally(() => setLoading(false));
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, qty);
    toast.success(`${qty}x ${product.name} added to cart`);
  };

  const handleReview = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post(`/products/${id}/reviews`, reviewForm);
      toast.success('Review submitted!');
      const r = await api.get(`/products/${id}`);
      setProduct(r.data);
      setReviewForm({ rating: 5, comment: '' });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="skeleton rounded-2xl" style={{ paddingBottom: '80%' }} />
        <div className="space-y-4"><div className="skeleton h-8 w-2/3"/><div className="skeleton h-5 w-full"/><div className="skeleton h-10 w-1/3"/></div>
      </div>
    </div>
  );

  if (!product) return <div className="text-center py-20"><p className="text-xl">Product not found.</p><Link to="/products" className="btn-accent mt-4 inline-block">Back to Shop</Link></div>;

  const imgs = product.images?.length ? product.images : ['https://via.placeholder.com/600x500?text=No+Image'];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 mb-8">
        ← Back to Shop
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Images */}
        <div>
          <div className="rounded-2xl overflow-hidden bg-gray-50 mb-3" style={{ paddingBottom: '80%', position: 'relative' }}>
            <img src={imgs[activeImg]} alt={product.name} className="absolute inset-0 w-full h-full object-cover" />
            {product.stock === 0 && (
              <div className="absolute inset-0 bg-white/60 flex items-center justify-center">
                <span className="font-bold text-gray-600 text-lg">Out of Stock</span>
              </div>
            )}
          </div>
          {imgs.length > 1 && (
            <div className="flex gap-2">
              {imgs.map((img, i) => (
                <button key={i} onClick={() => setActiveImg(i)}
                  className={`w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${activeImg === i ? 'border-red-500' : 'border-transparent'}`}>
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <span className="badge badge-sale mb-3">{product.category}</span>
          <h1 className="text-3xl font-bold mb-3" style={{ fontFamily: 'Playfair Display, serif', lineHeight: 1.2 }}>{product.name}</h1>
          <div className="flex items-center gap-2 mb-4">
            <div className="flex">
              {[1,2,3,4,5].map(s => (
                <svg key={s} width="16" height="16" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#fbbf24' : '#e5e7eb'}>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-sm text-gray-500">{product.rating?.toFixed(1)} ({product.numReviews} reviews)</span>
          </div>
          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-4xl font-bold" style={{ color: 'var(--c-accent)' }}>₹{product.price.toFixed(2)}</span>
            {product.originalPrice && <span className="text-xl text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>}
          </div>
          <p className="text-gray-600 leading-relaxed mb-6">{product.description}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className={`text-sm font-medium ${product.stock > 0 ? 'text-green-600' : 'text-red-500'}`}>
              {product.stock > 0 ? `✓ In Stock (${product.stock} left)` : '✗ Out of Stock'}
            </span>
          </div>
          {product.brand && <p className="text-sm text-gray-500 mb-6">Brand: <span className="font-medium text-gray-800">{product.brand}</span></p>}
          {product.stock > 0 && (
            <div className="flex items-center gap-3 mt-6">
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} className="px-4 py-3 hover:bg-gray-100 text-lg font-medium transition-colors">−</button>
                <span className="px-4 py-3 font-semibold text-lg min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(q => Math.min(product.stock, q + 1))} className="px-4 py-3 hover:bg-gray-100 text-lg font-medium transition-colors">+</button>
              </div>
              <button onClick={handleAddToCart} className="btn-accent flex-1" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
                🛒 Add to Cart
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Customer Reviews</h2>
        {product.reviews?.length === 0 ? (
          <p className="text-gray-500 mb-8">No reviews yet. Be the first!</p>
        ) : (
          <div className="space-y-4 mb-10">
            {product.reviews.map((r, i) => (
              <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-sm">{r.name}</span>
                  <span className="text-xs text-gray-400">{new Date(r.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex mb-2">
                  {[1,2,3,4,5].map(s => <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= r.rating ? '#fbbf24' : '#e5e7eb'}><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>)}
                </div>
                <p className="text-gray-700 text-sm">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {user && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 max-w-lg">
            <h3 className="font-semibold mb-4">Write a Review</h3>
            <form onSubmit={handleReview} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Rating</label>
                <select className="input-base" value={reviewForm.rating} onChange={e => setReviewForm(f => ({ ...f, rating: Number(e.target.value) }))}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Star{n > 1 ? 's' : ''}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Comment</label>
                <textarea className="input-base" rows={3} placeholder="Share your experience..." value={reviewForm.comment} onChange={e => setReviewForm(f => ({ ...f, comment: e.target.value }))} required />
              </div>
              <button type="submit" className="btn-accent" disabled={submitting}>{submitting ? 'Submitting...' : 'Submit Review'}</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
