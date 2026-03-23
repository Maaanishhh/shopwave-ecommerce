import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';

export default function Navbar() {
  const { user, logout, isAdmin } = useAuth();
  const { cartCount } = useCart();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); setDropOpen(false); };

  return (
    <header style={{ background: 'var(--c-surface)', borderBottom: '1px solid var(--c-border)' }} className="sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--c-accent)' }} className="text-2xl font-bold tracking-tight">ShopWave</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            {['/', '/products'].map((path, i) => (
              <Link key={path} to={path} className={`text-sm font-medium transition-colors hover:text-red-600 ${location.pathname === path ? 'text-red-600' : 'text-gray-700'}`}>
                {['Home', 'Shop'][i]}
              </Link>
            ))}
            {isAdmin && <Link to="/admin" className="text-sm font-medium text-gray-700 hover:text-red-600">Dashboard</Link>}
          </nav>
          <div className="flex items-center gap-3">
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
              {cartCount > 0 && <span style={{ background: 'var(--c-accent)' }} className="absolute -top-1 -right-1 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">{cartCount > 9 ? '9+' : cartCount}</span>}
            </Link>
            {user ? (
              <div className="relative">
                <button onClick={() => setDropOpen(!dropOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors">
                  <div style={{ background: 'var(--c-accent)' }} className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-semibold">{user.name[0].toUpperCase()}</div>
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
                {dropOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    <div className="px-4 py-2 border-b border-gray-100"><p className="font-semibold text-sm">{user.name}</p><p className="text-xs text-gray-500">{user.email}</p></div>
                    <Link to="/profile" onClick={() => setDropOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Profile</Link>
                    <Link to="/orders" onClick={() => setDropOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">My Orders</Link>
                    {isAdmin && <Link to="/admin" onClick={() => setDropOpen(false)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">Admin Panel</Link>}
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">Sign Out</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className="btn-ghost" style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}>Login</Link>
                <Link to="/signup" className="btn-accent" style={{ padding: '0.45rem 1rem', fontSize: '0.875rem' }}>Sign Up</Link>
              </div>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg hover:bg-gray-100">
              <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}/></svg>
            </button>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">Home</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">Shop</Link>
          {user ? (
            <><Link to="/orders" onClick={() => setMenuOpen(false)} className="block text-sm font-medium py-2">My Orders</Link>
            <button onClick={handleLogout} className="text-sm font-medium text-red-600 py-2">Sign Out</button></>
          ) : (
            <div className="flex gap-3 pt-2">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-ghost flex-1 justify-center" style={{ padding: '0.5rem' }}>Login</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-accent flex-1 justify-center" style={{ padding: '0.5rem' }}>Sign Up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
