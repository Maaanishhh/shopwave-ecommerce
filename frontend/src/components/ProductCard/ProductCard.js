import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { toast } from 'react-toastify';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAdd = (e) => {
    e.preventDefault();
    addToCart(product, 1);
    toast.success(`${product.name} added to cart`);
  };

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <Link to={`/products/${product._id}`} className="group block">
      <div className="bg-white rounded-2xl overflow-hidden card-lift border border-gray-100">
        <div className="relative overflow-hidden bg-gray-50" style={{ paddingBottom: '75%' }}>
          <img
            src={product.images?.[0] || 'https://via.placeholder.com/400x300?text=No+Image'}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {discount && (
            <span className="absolute top-3 left-3 badge badge-sale">-{discount}%</span>
          )}
          {product.featured && !discount && (
            <span className="absolute top-3 left-3 badge" style={{ background: '#fef3c7', color: '#92400e' }}>Featured</span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
              <span className="font-semibold text-gray-500">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-1">{product.category}</p>
          <h3 className="font-semibold text-gray-900 text-sm leading-tight mb-2 line-clamp-2"
            style={{ fontFamily: 'DM Sans, sans-serif' }}>
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-3">
            {[1,2,3,4,5].map(s => (
              <svg key={s} width="12" height="12" viewBox="0 0 24 24" fill={s <= Math.round(product.rating) ? '#fbbf24' : '#e5e7eb'}>
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            ))}
            <span className="text-xs text-gray-400 ml-1">({product.numReviews})</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold" style={{ color: 'var(--c-accent)' }}>₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice.toFixed(2)}</span>
              )}
            </div>
            <button
              onClick={handleAdd}
              disabled={product.stock === 0}
              className="btn-accent"
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
