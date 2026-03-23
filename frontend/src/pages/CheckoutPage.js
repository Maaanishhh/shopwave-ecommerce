import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [shipping, setShipping] = useState({ fullName: '', address: '', city: '', postalCode: '', country: '' });

  const shippingCost = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const total = cartTotal + shippingCost + tax;

  const handleOrder = async () => {
    setLoading(true);
    try {
      await api.post('/orders', {
        items: cartItems.map(i => ({ product: i._id, name: i.name, image: i.images?.[0] || '', price: i.price, quantity: i.quantity })),
        shippingAddress: shipping,
        paymentMethod: 'Stripe',
        itemsPrice: cartTotal,
        shippingPrice: shippingCost,
        taxPrice: tax,
        totalPrice: total,
      });
      clearCart();
      toast.success('Order placed successfully! 🎉');
      navigate('/orders');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Playfair Display, serif' }}>Checkout</h1>

      {/* Steps indicator */}
      <div className="flex items-center gap-2 mb-10">
        {['Shipping', 'Review & Pay'].map((label, i) => (
          <div key={label} className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'text-white' : 'bg-gray-200 text-gray-500'}`}
              style={step === i + 1 ? { background: 'var(--c-accent)' } : {}}>
              {step > i + 1 ? '✓' : i + 1}
            </div>
            <span className={`text-sm font-medium ${step === i + 1 ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            {i === 0 && <div className="w-8 h-px bg-gray-200 mx-1" />}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-lg mb-6">Shipping Address</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Full Name</label>
                  <input className="input-base" placeholder="John Doe" value={shipping.fullName} onChange={e => setShipping(s => ({ ...s, fullName: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Street Address</label>
                  <input className="input-base" placeholder="123 Main St" value={shipping.address} onChange={e => setShipping(s => ({ ...s, address: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">City</label>
                  <input className="input-base" placeholder="New York" value={shipping.city} onChange={e => setShipping(s => ({ ...s, city: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Postal Code</label>
                  <input className="input-base" placeholder="10001" value={shipping.postalCode} onChange={e => setShipping(s => ({ ...s, postalCode: e.target.value }))} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Country</label>
                  <input className="input-base" placeholder="United States" value={shipping.country} onChange={e => setShipping(s => ({ ...s, country: e.target.value }))} />
                </div>
              </div>
              <button
                onClick={() => { if (Object.values(shipping).every(v => v)) setStep(2); else toast.error('Fill all fields'); }}
                className="btn-accent mt-6" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                Continue to Review →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-6">
              <h2 className="font-bold text-lg mb-4">Review Your Order</h2>
              <div className="space-y-3 mb-6">
                {cartItems.map(item => (
                  <div key={item._id} className="flex items-center gap-3">
                    <img src={item.images?.[0]} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                    <div className="flex-1"><p className="font-medium text-sm line-clamp-1">{item.name}</p><p className="text-xs text-gray-400">Qty: {item.quantity}</p></div>
                    <p className="font-semibold text-sm">₹{(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 pt-4 mb-2">
                <p className="text-sm text-gray-600 mb-1">📦 {shipping.fullName}, {shipping.address}, {shipping.city} {shipping.postalCode}, {shipping.country}</p>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => setStep(1)} className="btn-ghost">← Back</button>
                <button onClick={handleOrder} disabled={loading} className="btn-accent flex-1 justify-center" style={{ fontSize: '1rem', padding: '0.8rem' }}>
                  {loading ? 'Placing Order...' : '🎉 Place Order'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Summary */}
        <div>
          <div className="bg-white rounded-2xl border border-gray-100 p-6 sticky top-24">
            <h3 className="font-bold mb-4">Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-gray-600"><span>Subtotal</span><span>₹{cartTotal.toFixed(2)}</span></div>
              <div className="flex justify-between text-gray-600"><span>Shipping</span><span>{shippingCost === 0 ? <span className="text-green-600">Free</span> : `₹₹{shippingCost.toFixed(2)}`}</span></div>
              <div className="flex justify-between text-gray-600"><span>Tax</span><span>₹{tax.toFixed(2)}</span></div>
              <div className="border-t pt-2 flex justify-between font-bold"><span>Total</span><span style={{ color: 'var(--c-accent)' }}>₹{total.toFixed(2)}</span></div>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 text-center">🔒 Secure checkout powered by Stripe</div>
          </div>
        </div>
      </div>
    </div>
  );
}
