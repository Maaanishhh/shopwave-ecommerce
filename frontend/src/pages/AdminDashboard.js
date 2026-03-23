import { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import api from '../utils/api';
import { toast } from 'react-toastify';
 
// ─── Overview ───────────────────────────────────────────────────
function AdminOverview() {
  const [stats, setStats] = useState(null);
 
  useEffect(() => {
    Promise.all([api.get('/products'), api.get('/orders'), api.get('/users')])
      .then(([p, o, u]) => setStats({
        products: p.data.total,
        orders: o.data.length,
        users: u.data.length,
        revenue: o.data.reduce((s, ord) => s + (ord.isPaid ? ord.totalPrice : 0), 0),
      }));
  }, []);
 
  const cards = stats ? [
    { label: 'Products', value: stats.products, icon: '📦', color: '#3b82f6' },
    { label: 'Orders', value: stats.orders, icon: '🛒', color: '#8b5cf6' },
    { label: 'Users', value: stats.users, icon: '👥', color: '#10b981' },
    { label: 'Revenue', value: `₹${stats.revenue.toFixed(0)}`, icon: '💰', color: 'var(--c-accent)' },
  ] : [];
 
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Dashboard Overview</h2>
      {stats ? (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map(({ label, value, icon, color }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 p-5 card-lift">
              <div className="flex items-center justify-between mb-3">
                <span className="text-2xl">{icon}</span>
                <div className="w-2 h-2 rounded-full" style={{ background: color }} />
              </div>
              <p className="text-2xl font-bold" style={{ color }}>{value}</p>
              <p className="text-sm text-gray-500 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">{[...Array(4)].map((_, i) => <div key={i} className="skeleton h-28 rounded-2xl" />)}</div>
      )}
    </div>
  );
}
 
// ─── Products ───────────────────────────────────────────────────
function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '', price: '', supplierPrice: '', supplierName: 'Deodap', supplierLink: '', category: 'Electronics', brand: '', stock: '', images: [''], featured: false });
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
 
  const load = () => api.get('/products?limit=100').then(r => setProducts(r.data.products)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
 
  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form, price: Number(form.price), stock: Number(form.stock), supplierPrice: Number(form.supplierPrice) };
      if (editing) await api.put(`/products/${editing}`, payload);
      else await api.post('/products', payload);
      toast.success(editing ? 'Product updated!' : 'Product created!');
      setShowForm(false); setEditing(null);
      setForm({ name: '', description: '', price: '', supplierPrice: '', supplierName: 'Deodap', supplierLink: '', category: 'Electronics', brand: '', stock: '', images: [''], featured: false });
      load();
    } catch (err) { toast.error(err.response?.data?.message || 'Error'); }
  };
 
  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    await api.delete(`/products/${id}`);
    toast.success('Product deleted');
    load();
  };
 
  const startEdit = (p) => {
    setForm({ name: p.name, description: p.description, price: p.price, supplierPrice: p.supplierPrice || '', supplierName: p.supplierName || 'Deodap', supplierLink: p.supplierLink || '', category: p.category, brand: p.brand || '', stock: p.stock, images: p.images?.length ? p.images : [''], featured: p.featured || false });
    setEditing(p._id); setShowForm(true);
  };
 
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Products</h2>
        <button onClick={() => { setShowForm(true); setEditing(null); }} className="btn-accent" style={{ padding: '0.5rem 1.2rem', fontSize: '0.875rem' }}>+ Add Product</button>
      </div>
 
      {showForm && (
        <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-6">
          <h3 className="font-bold mb-4">{editing ? 'Edit Product' : 'New Product'}</h3>
          <form onSubmit={handleSave} className="grid grid-cols-2 gap-4">
            <div className="col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Name</label><input className="input-base" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required /></div>
            <div className="col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label><textarea className="input-base" rows={2} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} required /></div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Selling Price (₹)</label><input type="number" className="input-base" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} required /></div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Stock</label><input type="number" className="input-base" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} required /></div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
              <select className="input-base" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                {['Electronics','Fashion','Home','Sports','Books','Beauty','Toys','Food'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Brand</label><input className="input-base" value={form.brand} onChange={e => setForm(f => ({ ...f, brand: e.target.value }))} /></div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Supplier Cost (₹)</label><input type="number" className="input-base" placeholder="What you pay Deodap" value={form.supplierPrice} onChange={e => setForm(f => ({ ...f, supplierPrice: e.target.value }))} /></div>
            <div><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Supplier Name</label><input className="input-base" placeholder="e.g. Deodap" value={form.supplierName} onChange={e => setForm(f => ({ ...f, supplierName: e.target.value }))} /></div>
            <div className="col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Supplier Link</label><input className="input-base" placeholder="https://deodap.in/products/..." value={form.supplierLink} onChange={e => setForm(f => ({ ...f, supplierLink: e.target.value }))} /></div>
            <div className="col-span-2"><label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Image URL</label><input className="input-base" value={form.images[0]} onChange={e => setForm(f => ({ ...f, images: [e.target.value] }))} /></div>
            <div className="col-span-2 flex items-center gap-2">
              <input type="checkbox" id="featured" checked={form.featured} onChange={e => setForm(f => ({ ...f, featured: e.target.checked }))} className="w-4 h-4" />
              <label htmlFor="featured" className="text-sm font-medium">Featured product</label>
            </div>
            <div className="col-span-2 flex gap-3">
              <button type="submit" className="btn-accent" style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}>Save</button>
              <button type="button" onClick={() => { setShowForm(false); setEditing(null); }} className="btn-ghost" style={{ padding: '0.5rem 1.5rem', fontSize: '0.875rem' }}>Cancel</button>
            </div>
          </form>
        </div>
      )}
 
      {loading ? <div className="skeleton h-64 rounded-2xl" /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden overflow-x-auto">
          <table className="w-full text-sm">
            <thead style={{ background: '#f9fafb' }}>
              <tr>{['Image','Name','Category','Cost','Price','Profit','Stock','Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {products.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3"><img src={p.images?.[0]} alt="" className="w-10 h-10 rounded-lg object-cover bg-gray-100" /></td>
                  <td className="px-4 py-3 font-medium max-w-xs truncate">{p.name}</td>
                  <td className="px-4 py-3 text-gray-500">{p.category}</td>
                  <td className="px-4 py-3 text-gray-500 text-xs">₹{p.supplierPrice || '-'}</td>
                  <td className="px-4 py-3 font-semibold" style={{ color: 'var(--c-accent)' }}>₹{p.price}</td>
                  <td className="px-4 py-3 font-semibold text-green-600">
                    {p.supplierPrice ? `₹${p.price - p.supplierPrice}` : '-'}
                  </td>
                  <td className="px-4 py-3"><span className={`badge ${p.stock > 0 ? 'badge-new' : 'badge-sale'}`}>{p.stock}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button onClick={() => startEdit(p)} className="text-xs btn-ghost" style={{ padding: '0.3rem 0.75rem' }}>Edit</button>
                      <button onClick={() => handleDelete(p._id)} className="text-xs text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg border border-red-200 transition-colors">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
 
// ─── Orders ─────────────────────────────────────────────────────
function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const load = () => api.get('/orders').then(r => setOrders(r.data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
 
  const updateStatus = async (id, status) => {
    await api.put(`/orders/${id}/status`, { status });
    toast.success('Order status updated');
    load();
  };
 
  const STATUS_COLORS = { pending: 'text-yellow-600 bg-yellow-50', processing: 'text-blue-600 bg-blue-50', shipped: 'text-purple-600 bg-purple-50', delivered: 'text-green-600 bg-green-50', cancelled: 'text-red-600 bg-red-50' };
 
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Orders</h2>
      {loading ? <div className="skeleton h-64 rounded-2xl" /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead style={{ background: '#f9fafb' }}>
              <tr>{['Order ID','Customer','Items','Total','Status','Update'].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map(o => (
                <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-gray-500">#{o._id.slice(-8).toUpperCase()}</td>
                  <td className="px-4 py-3"><p className="font-medium">{o.user?.name}</p><p className="text-xs text-gray-400">{o.user?.email}</p></td>
                  <td className="px-4 py-3 text-gray-500">{o.items.length}</td>
                  <td className="px-4 py-3 font-semibold">₹{o.totalPrice.toFixed(2)}</td>
                  <td className="px-4 py-3"><span className={`badge ${STATUS_COLORS[o.status]}`}>{o.status}</span></td>
                  <td className="px-4 py-3">
                    <select className="input-base text-xs" style={{ padding: '0.35rem 0.6rem', width: 'auto' }} value={o.status} onChange={e => updateStatus(o._id, e.target.value)}>
                      {['pending','processing','shipped','delivered','cancelled'].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
 
// ─── Users ──────────────────────────────────────────────────────
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
 
  const load = () => api.get('/users').then(r => setUsers(r.data)).finally(() => setLoading(false));
  useEffect(() => { load(); }, []);
 
  const handleDelete = async (id) => {
    if (!window.confirm('Delete user?')) return;
    await api.delete(`/users/${id}`);
    toast.success('User deleted'); load();
  };
 
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6" style={{ fontFamily: 'Playfair Display, serif' }}>Users</h2>
      {loading ? <div className="skeleton h-64 rounded-2xl" /> : (
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <table className="w-full text-sm">
            <thead style={{ background: '#f9fafb' }}>
              <tr>{['User','Email','Role','Joined','Actions'].map(h => <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">{h}</th>)}</tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map(u => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 flex items-center gap-2">
                    <div style={{ background: u.role === 'admin' ? 'var(--c-accent)' : '#6b7280' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">{u.name[0].toUpperCase()}</div>
                    <span className="font-medium">{u.name}</span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{u.email}</td>
                  <td className="px-4 py-3"><span className={`badge ${u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-600'}`}>{u.role}</span></td>
                  <td className="px-4 py-3 text-gray-400 text-xs">{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td className="px-4 py-3">
                    {u.role !== 'admin' && <button onClick={() => handleDelete(u._id)} className="text-xs text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg border border-red-200 transition-colors">Delete</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
 
// ─── Admin Layout ────────────────────────────────────────────────
export default function AdminDashboard() {
  const location = useLocation();
  const navItems = [
    { to: '/admin', label: 'Overview', icon: '📊' },
    { to: '/admin/products', label: 'Products', icon: '📦' },
    { to: '/admin/orders', label: 'Orders', icon: '🛒' },
    { to: '/admin/users', label: 'Users', icon: '👥' },
  ];
 
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="w-full lg:w-56 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-3 sticky top-24">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-3 py-2">Admin Panel</p>
            {navItems.map(({ to, label, icon }) => {
              const active = location.pathname === to;
              return (
                <Link key={to} to={to}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors mb-0.5 ${active ? 'text-white' : 'text-gray-600 hover:bg-gray-50'}`}
                  style={active ? { background: 'var(--c-accent)' } : {}}>
                  <span>{icon}</span>{label}
                </Link>
              );
            })}
          </div>
        </aside>
        <main className="flex-1 min-w-0">
          <Routes>
            <Route index element={<AdminOverview />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="users" element={<AdminUsers />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}
 