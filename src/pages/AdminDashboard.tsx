import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import { QueueManagement } from '../components/admin/QueueManagement';
import { OrderManagement } from '../components/admin/OrderManagement';
import { Analytics } from '../components/admin/Analytics';
import { useAuth } from '../hooks/useAuth';
import { LayoutGrid, Users, ClipboardList, BarChart, LogOut } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-4">
          <h1 className="text-xl font-bold text-gray-800">Restaurant Admin</h1>
        </div>
        <nav className="mt-4">
          <Link
            to="/admin"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <LayoutGrid className="w-5 h-5 mr-2" />
            Dashboard
          </Link>
          <Link
            to="/admin/queue"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <Users className="w-5 h-5 mr-2" />
            Queue Management
          </Link>
          <Link
            to="/admin/orders"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <ClipboardList className="w-5 h-5 mr-2" />
            Orders
          </Link>
          <Link
            to="/admin/analytics"
            className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
          >
            <BarChart className="w-5 h-5 mr-2" />
            Analytics
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center px-4 py-2 text-red-600 hover:bg-red-50 w-full"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <Routes>
          <Route index element={<QueueManagement />} />
          <Route path="queue" element={<QueueManagement />} />
          <Route path="orders" element={<OrderManagement />} />
          <Route path="analytics" element={<Analytics />} />
        </Routes>
      </div>
    </div>
  );
};