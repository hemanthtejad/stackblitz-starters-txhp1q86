import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../lib/auth';
import { UserRole } from '../../lib/auth';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = 'user' 
}) => {
  const { user, profile, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const hasRequiredRole = profile?.role && ['super_admin', 'admin'].includes(profile.role)
    ? true // Admins can access everything
    : profile?.role === requiredRole;

  if (!hasRequiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;