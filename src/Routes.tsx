import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { QRPage } from './pages/QrPage';
import { TableSelectionPage } from './pages/TableSelectionPage';
import { AdminDashboard } from './pages/AdminDashboard';
import { AdminLogin } from './pages/AdminLogin';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { SessionWrapper } from './components/SessionWrapper';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/qr" element={<QRPage />} />
      <Route path="/select-table" element={
          <TableSelectionPage />
      } />
      <Route path="/menu" element={
        <SessionWrapper>
          <MenuPage />
        </SessionWrapper>
      } />
      <Route path="/admin/login" element={<AdminLogin />} />
      <Route path="/admin/*" element={
        <ProtectedRoute>
          <AdminDashboard />
        </ProtectedRoute>
      } />
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};