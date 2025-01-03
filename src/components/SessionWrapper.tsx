import React from 'react';
import { useSession } from '../hooks/useSession';
import { Navigate } from 'react-router-dom';

interface SessionWrapperProps {
  children: React.ReactNode;
}

export const SessionWrapper: React.FC<SessionWrapperProps> = ({ children }) => {
  const isValidSession = useSession();
  
  if (!isValidSession) {
    return <Navigate to="/qr" replace />;
  }
  
  return <>{children}</>;
};