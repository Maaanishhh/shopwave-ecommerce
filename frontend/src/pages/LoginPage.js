import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/auth/login', form);
      login(data);
      toast.success(`Welcome back, ${data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--c-accent)' }} className="text-4xl font-bold">ShopWave</span>
          <h2 className="text-2xl font-bold mt-4 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Welcome back</h2>
          <p className="text-gray-500 text-sm">Sign in to your account to continue</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
              <input type="email" className="input-base" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <input type="password" className="input-base" placeholder="••••••••"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>
            <button type="submit" disabled={loading} className="btn-accent w-full justify-center" style={{ fontSize: '1rem', padding: '0.8rem' }}>
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>
          <div className="mt-4 p-3 bg-gray-50 rounded-lg text-xs text-gray-500 text-center">
            Demo: <strong>admin@shopwave.com</strong> / <strong>admin123</strong>
          </div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link to="/signup" className="font-semibold hover:underline" style={{ color: 'var(--c-accent)' }}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}
