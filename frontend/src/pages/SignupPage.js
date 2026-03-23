import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';

export default function SignupPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error('Password must be at least 6 characters');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/register', form);
      login(data);
      toast.success(`Welcome to ShopWave, ${data.name}!`);
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--c-accent)' }} className="text-4xl font-bold">ShopWave</span>
          <h2 className="text-2xl font-bold mt-4 mb-1" style={{ fontFamily: 'Playfair Display, serif' }}>Create an account</h2>
          <p className="text-gray-500 text-sm">Start shopping in seconds</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
              <input className="input-base" placeholder="John Doe"
                value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Email</label>
              <input type="email" className="input-base" placeholder="you@example.com"
                value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Password</label>
              <input type="password" className="input-base" placeholder="At least 6 characters"
                value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} required />
            </div>
            <button type="submit" disabled={loading} className="btn-accent w-full justify-center" style={{ fontSize: '1rem', padding: '0.8rem' }}>
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>
        </div>
        <p className="text-center text-sm text-gray-500 mt-6">
          Already have an account? <Link to="/login" className="font-semibold hover:underline" style={{ color: 'var(--c-accent)' }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
}
