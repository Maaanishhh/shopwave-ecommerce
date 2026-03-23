import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shipping + tax;

  if (cartItems.length === 0) return (
    <div className="max-w-2xl mx-auto px-6 py-20 text-center">
      <span className="text-6xl">🛒</span>
      <h2 className="text-2xl font-bold mt-6 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Your cart is empty</h2>
      <p className="text-gray-500 mb-8">Looks like you haven't added anything yet.</p>
      <Link to="/products" className="btn-accent" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>Start Shopping</Link>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map(item => (
            <div key={item._id} className="bg-white rounded-2xl border border-gray-100 p-4 flex gap-4 items-center">
              <img src={item.images?.[0] || 'https://via.placeholder.com/100'} alt={item.name}
                className="w-20 h-20 rounded-xl object-cover flex-shrink-0 bg-gray-50" />
              <div className="flex-1 min-w-0">
                <Link to={`/products/${item._id}`} className="font-semibold text-sm hover:text-red-600 line-clamp-2">{item.name}</Link>
                <p className="text-xs text-gray-400 mt-0.5">{item.category}</p>
                <p className="font-bold mt-1" style={{ color: 'var(--c-accent)' }}>₹{item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden flex-shrink-0">
                <button onClick={() => updateQuantity(item._id, item.quantity - 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors">−</button>
                <span className="px-3 py-2 font-semibold text-sm">{item.quantity}</span>
                <button onClick={() => updateQuantity(item._id, item.quantity + 1)} className="px-3 py-2 hover:bg-gray-100 transition-colors">+</button>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <p className="font-bold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                <button onClick={() => removeFromCart(item._id)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h2 className="font-bold text-lg mb-5">Order Summary</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>{shipping === 0 ? <span className="text-green-600 font-medium">Free</span> : `₹₹{shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-600"><span>Tax (8%)</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="border-t border-gray-100 pt-3 flex justify-between font-bold text-base">
                <span>Total</span>
                <span style={{ color: 'var(--c-accent)' }}>₹{total.toFixed(2)}</span>
              </div>
            </div>
            {cartTotal < 50 && (
              <p className="text-xs text-gray-500 mt-3 p-2 bg-gray-50 rounded-lg">
                Add ₹{(50 - cartTotal).toFixed(2)} more for free shipping!
              </p>
            )}
            <button
              onClick={() => user ? navigate('/checkout') : navigate('/login')}
              className="btn-accent w-full justify-center mt-6" style={{ fontSize: '1rem', padding: '0.8rem' }}>
              {user ? 'Proceed to Checkout' : 'Login to Checkout'}
            </button>
            <Link to="/products" className="block text-center text-sm text-gray-500 mt-3 hover:text-gray-700">← Continue Shopping</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
