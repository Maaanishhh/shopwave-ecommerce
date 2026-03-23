import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard/ProductCard';

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty'];

export default function HomePage() {
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/products/featured').then(r => setFeatured(r.data)).finally(() => setLoading(false));
  }, []);

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #2d1b1b 100%)' }} className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div style={{ background: 'radial-gradient(circle at 20% 50%, #c8392b 0%, transparent 60%)' }} className="absolute inset-0" />
          <div style={{ background: 'radial-gradient(circle at 80% 50%, #c8392b 0%, transparent 60%)' }} className="absolute inset-0" />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 py-24 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 text-white">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#f87171' }}>New Season Collection</span>
            <h1 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: 1.1 }} className="font-bold mb-6">
              Discover Products<br />
              <span style={{ color: 'var(--c-accent)' }}>Worth Loving</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-md leading-relaxed">
              Curated collections across electronics, fashion, home & more. Quality you can trust, prices you'll love.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link to="/products" className="btn-accent" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>
                Shop Now →
              </Link>
              <Link to="/products?sort=newest" className="btn-ghost" style={{ fontSize: '1rem', padding: '0.75rem 2rem', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}>
                New Arrivals
              </Link>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-4 max-w-sm">
            {[
              { emoji: '🎧', label: 'Electronics', desc: '500+ products' },
              { emoji: '👟', label: 'Fashion',     desc: '1200+ styles' },
              { emoji: '🏠', label: 'Home',        desc: '800+ items' },
              { emoji: '🏃', label: 'Sports',      desc: '300+ picks' },
            ].map(({ emoji, label, desc }) => (
              <Link key={label} to={`/products?category=${label}`}
                className="bg-white/10 hover:bg-white/20 transition-colors rounded-2xl p-4 text-white backdrop-blur-sm">
                <span className="text-3xl">{emoji}</span>
                <p className="font-semibold mt-2">{label}</p>
                <p className="text-xs text-gray-400">{desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories strip */}
      <section className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          <Link to="/products" className="btn-ghost whitespace-nowrap" style={{ padding: '0.5rem 1.2rem', fontSize: '0.875rem' }}>All Products</Link>
          {CATEGORIES.map(cat => (
            <Link key={cat} to={`/products?category=${cat}`}
              className="btn-ghost whitespace-nowrap" style={{ padding: '0.5rem 1.2rem', fontSize: '0.875rem' }}>
              {cat}
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Featured Products</h2>
            <p className="text-gray-500 mt-1">Handpicked by our team</p>
          </div>
          <Link to="/products" className="btn-ghost" style={{ padding: '0.5rem 1.2rem', fontSize: '0.875rem' }}>View All →</Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="rounded-2xl overflow-hidden">
                <div className="skeleton" style={{ paddingBottom: '75%' }} />
                <div className="p-4 space-y-2">
                  <div className="skeleton h-3 w-1/3" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featured.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        )}
      </section>

      {/* Value props banner */}
      <section style={{ background: 'var(--c-surface)', borderTop: '1px solid var(--c-border)', borderBottom: '1px solid var(--c-border)' }} className="py-10">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { icon: '🚀', title: 'Free Shipping', desc: 'On orders over $50' },
            { icon: '🔒', title: 'Secure Payment', desc: 'Stripe encrypted' },
            { icon: '↩️', title: 'Easy Returns', desc: '30-day policy' },
            { icon: '💬', title: '24/7 Support', desc: 'Always here for you' },
          ].map(({ icon, title, desc }) => (
            <div key={title}>
              <span className="text-3xl">{icon}</span>
              <p className="font-semibold mt-2 text-sm">{title}</p>
              <p className="text-xs text-gray-500 mt-1">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
