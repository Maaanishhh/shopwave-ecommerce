import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#111', color: '#e5e7eb' }} className="mt-16">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div>
            <span style={{ fontFamily: 'Playfair Display, serif', color: 'var(--c-accent)' }} className="text-2xl font-bold">ShopWave</span>
            <p className="text-gray-400 text-sm mt-3 leading-relaxed">Your premium destination for curated products at unbeatable prices.</p>
          </div>
          {[
            { title: 'Shop', links: [['All Products', '/products'], ['New Arrivals', '/products?sort=newest'], ['On Sale', '/products?minPrice=0']] },
            { title: 'Account', links: [['Login', '/login'], ['Sign Up', '/signup'], ['My Orders', '/orders']] },
            { title: 'Support', links: [['FAQ', '#'], ['Contact Us', '#'], ['Returns', '#']] },
          ].map(({ title, links }) => (
            <div key={title}>
              <h4 className="font-semibold text-white text-sm mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(([label, to]) => (
                  <li key={label}><Link to={to} className="text-gray-400 text-sm hover:text-white transition-colors">{label}</Link></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© {new Date().getFullYear()} ShopWave. All rights reserved.</p>
          <div className="flex items-center gap-4 text-gray-500 text-sm">
            <span>Built with React · Node.js · MongoDB</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
