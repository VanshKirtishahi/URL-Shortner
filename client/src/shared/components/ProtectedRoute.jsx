import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function ProtectedRoute() {
  const { user } = useAuth();

  // If the user object is null or undefined, kick them back to login
  if (!user?.email) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the requested protected route
  return <Outlet />;
}