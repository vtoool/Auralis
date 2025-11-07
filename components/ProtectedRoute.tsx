import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const { session, loading } = useAuth();

  if (loading) {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background">
            <p className="text-text-secondary">Loading session...</p>
        </div>
    );
  }

  if (!session) {
    window.location.hash = '/login';
    return null;
  }

  return children;
};

export default ProtectedRoute;
