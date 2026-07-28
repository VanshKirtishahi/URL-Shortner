import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';

export function PublicRoute() {
  const { user } = useAuth();

  // If a logged-in user tries to access /login, redirect them to the dashboard
  if (user?.email) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}