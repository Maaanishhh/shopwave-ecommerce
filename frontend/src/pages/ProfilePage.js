import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { toast } from 'react-toastify';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', password: '' });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { name: form.name, email: form.email };
      if (form.password) body.password = form.password;
      const { data } = await api.put('/users/profile', body);
      login({ ...user, ...data });
      toast.success('Profile updated!');
      setForm(f => ({ ...f, password: '' }));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ fontFamily: 'Playfair Display, serif' }}>My Profile</h1>
      <div className="bg-white rounded-2xl border border-gray-100 p-7">
        <div className="flex items-center gap-4 mb-7 pb-6 border-b border-gray-100">
          <div style={{ background: 'var(--c-accent)' }} className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            {user?.name[0].toUpperCase()}
          </div>
          <div>
            <p className="font-bold text-lg">{user?.name}</p>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <span className="badge mt-1" style={{ background: user?.role === 'admin' ? '#fef3c7' : '#e0f2fe', color: user?.role === 'admin' ? '#92400e' : '#075985' }}>{user?.role}</span>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Full Name</label>
            <input className="input-base" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">Email</label>
            <input type="email" className="input-base" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1.5">New Password <span className="normal-case text-gray-400 font-normal">(leave blank to keep current)</span></label>
            <input type="password" className="input-base" placeholder="••••••••" value={form.password} onChange={e => setForm(f => ({ ...f, password: e.target.value }))} />
          </div>
          <button type="submit" disabled={saving} className="btn-accent" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
