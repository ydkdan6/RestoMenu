import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import { useSession } from '../hooks/useSession'; // Import the useSession hook

interface SessionWrapperProps {
  children: React.ReactNode;
}

export const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  const isValidSession = useSession();
  const location = useLocation();

  // Allow access to paths with a token in the query string
  const hasTokenInUrl = new URLSearchParams(location.search).has('token');
  if (!isValidSession && !hasTokenInUrl) {
    return <Navigate to="/qr" replace />;
  }

  return <>{children}</>;
};
