import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sparkles } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-ivory-50 flex items-center justify-center px-4">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-forest-900/10 flex items-center justify-center mx-auto text-citrus-500 animate-pulse">
            <Sparkles className="w-6 h-6 animate-spin" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-forest-950">
              Verifying Session
            </h3>
            <p className="text-xs text-charcoal-500 mt-1">
              Connecting securely to your FreshLoop account...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
