import React from 'react';
import { Routes, Route } from 'react-router-dom';
import  HomePage  from './pages/Home';
import { QRPage } from './pages/QrPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AdminLogin } from './pages/AdminLogin';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/qr" element={<QRPage />} />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route
        path="/admin/*"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};