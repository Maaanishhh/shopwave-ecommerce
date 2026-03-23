import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../utils/api';
import ProductCard from '../components/ProductCard/ProductCard';

const CATEGORIES = ['Electronics', 'Fashion', 'Home', 'Sports', 'Books', 'Beauty', 'Toys', 'Food'];
const SORTS = [
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low → High' },
  { value: 'price-desc', label: 'Price: High → Low' },
  { value: 'rating', label: 'Best Rated' },
];

export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [pages, setPages] = useState(1);

  const keyword  = searchParams.get('keyword')  || '';
  const category = searchParams.get('category') || '';
  const sort     = searchParams.get('sort')     || 'newest';
  const page     = Number(searchParams.get('page')) || 1;

  const set = (key, val) => {
    const p = new URLSearchParams(searchParams);
    if (val) p.set(key, val); else p.delete(key);
    if (key !== 'page') p.delete('page');
    setSearchParams(p);
  };

  useEffect(() => {
    setLoading(true);
    const params = { sort, page };
    if (keyword)  params.keyword  = keyword;
    if (category) params.category = category;
    api.get('/products', { params })
      .then(r => { setProducts(r.data.products); setTotal(r.data.total); setPages(r.data.pages); })
      .finally(() => setLoading(false));
  }, [keyword, category, sort, page]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold" style={{ fontFamily: 'Playfair Display, serif' }}>Shop</h1>
        <p className="text-gray-500 mt-1">{total} products found</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 p-5 sticky top-24">
            {/* Search */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Search</label>
              <input
                className="input-base"
                placeholder="Search products..."
                defaultValue={keyword}
                onKeyDown={e => e.key === 'Enter' && set('keyword', e.target.value)}
              />
            </div>
            {/* Category */}
            <div className="mb-6">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Category</label>
              <div className="space-y-1">
                <button onClick={() => set('category', '')}
                  className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${!category ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                  style={!category ? { background: 'var(--c-accent-light)', color: 'var(--c-accent)' } : {}}>
                  All Categories
                </button>
                {CATEGORIES.map(c => (
                  <button key={c} onClick={() => set('category', c)}
                    className={`block w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${category === c ? 'font-semibold' : 'text-gray-600 hover:bg-gray-50'}`}
                    style={category === c ? { background: 'var(--c-accent-light)', color: 'var(--c-accent)' } : {}}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
            {/* Sort */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">Sort By</label>
              <select className="input-base" value={sort} onChange={e => set('sort', e.target.value)}>
                {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <div className="flex-1">
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="rounded-2xl overflow-hidden bg-white">
                  <div className="skeleton" style={{ paddingBottom: '75%' }} />
                  <div className="p-4 space-y-2">
                    <div className="skeleton h-3 w-1/3" /><div className="skeleton h-4 w-full" /><div className="skeleton h-4 w-2/3" />
                  </div>
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <span className="text-5xl">🔍</span>
              <p className="text-xl font-semibold mt-4">No products found</p>
              <p className="text-gray-500 mt-2">Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                {products.map(p => <ProductCard key={p._id} product={p} />)}
              </div>
              {/* Pagination */}
              {pages > 1 && (
                <div className="flex items-center justify-center gap-2 mt-10">
                  {[...Array(pages)].map((_, i) => (
                    <button key={i} onClick={() => set('page', i + 1)}
                      className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${page === i + 1 ? 'text-white' : 'bg-white border border-gray-200 hover:border-red-300 text-gray-700'}`}
                      style={page === i + 1 ? { background: 'var(--c-accent)' } : {}}>
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
