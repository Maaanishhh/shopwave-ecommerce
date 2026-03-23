import { useState, useEffect } from 'react';
import api from '../utils/api';

const STATUS_COLORS = {
  pending:    'bg-yellow-100 text-yellow-800',
  processing: 'bg-blue-100 text-blue-800',
  shipped:    'bg-purple-100 text-purple-800',
  delivered:  'bg-green-100 text-green-800',
  cancelled:  'bg-red-100 text-red-800',
};

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders/myorders').then(r => setOrders(r.data)).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="max-w-3xl mx-auto px-6 py-12 space-y-4">{[...Array(3)].map((_, i) => <div key={i} className="skeleton h-32 rounded-2xl" />)}</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>My Orders</h1>
      {orders.length === 0 ? (
        <div className="text-center py-16"><span className="text-5xl">📦</span><p className="text-xl font-semibold mt-4">No orders yet</p></div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order._id} className="bg-white rounded-2xl border border-gray-100 p-5">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="font-semibold text-sm">Order #{order._id.slice(-8).toUpperCase()}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
                <span className={`badge text-xs ${STATUS_COLORS[order.status] || 'bg-gray-100 text-gray-600'}`}>{order.status}</span>
              </div>
              <div className="flex gap-2 mb-4 overflow-x-auto">
                {order.items.map((item, i) => (
                  <div key={i} className="flex-shrink-0 text-center">
                    <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover bg-gray-50" />
                    <p className="text-xs text-gray-500 mt-1 w-14 truncate">{item.name}</p>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm border-t border-gray-100 pt-3">
                <span className="text-gray-500">{order.items.length} item{order.items.length > 1 ? 's' : ''}</span>
                <span className="font-bold" style={{ color: 'var(--c-accent)' }}>Total: ₹{order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
