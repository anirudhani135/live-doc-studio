
import React from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Simplified ProtectedRoute that always allows access during development
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  return <>{children}</>;
};

export default ProtectedRoute;
