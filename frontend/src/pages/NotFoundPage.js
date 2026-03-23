import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-6 text-center">
      <div>
        <p style={{ fontFamily: 'Playfair Display, serif', fontSize: '8rem', lineHeight: 1, color: 'var(--c-accent)', opacity: 0.15 }} className="font-bold select-none">404</p>
        <h1 className="text-3xl font-bold -mt-8 mb-3" style={{ fontFamily: 'Playfair Display, serif' }}>Page Not Found</h1>
        <p className="text-gray-500 mb-8">The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn-accent" style={{ fontSize: '1rem', padding: '0.75rem 2rem' }}>Go Home</Link>
      </div>
    </div>
  );
}
