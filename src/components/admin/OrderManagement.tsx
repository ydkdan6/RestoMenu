import React, { useState, useEffect } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useOrderNotifications } from '../../hooks/useOrderNotifications';
import { Filter, RefreshCw } from 'lucide-react';
import { OrderCard } from './OrderCard';
import { toast } from 'react-toastify';
import { Order } from '../../types';

export const OrderManagement: React.FC = () => {
  const { orders, fetchOrders, updateOrderStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTable, setFilterTable] = useState<string>('all');
  const [previousOrders, setPreviousOrders] = useState<Order[]>([]);
  const [lastRefresh, setLastRefresh] = useState<Date>(new Date());

  // Initialize order notifications
  useOrderNotifications();

  // Handle new orders and display notifications
  const handleNewOrders = (currentOrders: Order[]) => {
    const newOrders = currentOrders.filter(
      (order) => !previousOrders.find((prev) => prev.id === order.id)
    );

    // Show toast notifications for new orders
    newOrders.forEach((order) => {
      toast.info(`New order from Table ${order.tableNumber}!`, {
        position: 'top-right',
        autoClose: 5000,
      });
    });

    setPreviousOrders(currentOrders);
  };

  // Refresh orders and fetch from localStorage
  const refreshOrders = async () => {
    try {
      const fetchedOrders = await fetchOrders(); // This will update the orders in the Zustand store
      const nonServedOrders = fetchedOrders.filter((order) => order.status !== 'served');

      handleNewOrders(nonServedOrders); // Handle the new non-served orders
      setLastRefresh(new Date());

      // Update the orders in localStorage, but only keep non-served orders
      localStorage.setItem('orders', JSON.stringify(nonServedOrders));
    } catch (error) {
      toast.error('Failed to fetch orders. Please try again later.', {
        position: 'top-right',
        autoClose: 5000,
      });
    }
  };

  // Auto-refresh orders every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      refreshOrders();
    }, 10000);
    return () => clearInterval(interval);
  }, [orders, previousOrders]);

  const filteredOrders = orders.filter((order) => {
    const statusMatch = filterStatus === 'all' ? true : order.status === filterStatus;
    const tableMatch = filterTable === 'all' ? true : order.tableNumber === filterTable;
    return statusMatch && tableMatch;
  });

  // Get unique table numbers
  const tables = Array.from(new Set(orders.map((order) => order.tableNumber))).sort();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <button
              onClick={refreshOrders}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </span>
            </button>
            <Filter className="w-5 h-5 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border rounded p-2"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="preparing">Preparing</option>
              <option value="ready">Ready</option>
              <option value="served">Served</option>
            </select>
            <select
              value={filterTable}
              onChange={(e) => setFilterTable(e.target.value)}
              className="border rounded p-2"
            >
              <option value="all">All Tables</option>
              {tables.map((table) => (
                <option key={table} value={table}>
                  Table {table}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredOrders.map((order) => (
          <OrderCard
            key={order.id}
            order={order}
            onStatusUpdate={updateOrderStatus}
          />
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No orders found for the selected filters
          </div>
        )}
      </div>
    </div>
  );
};
