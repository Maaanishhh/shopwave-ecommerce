import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="skeleton w-8 h-8 rounded-full" /></div>;
  return user ? children : <Navigate to="/login" replace />;
}
