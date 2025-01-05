import React, { useState, useEffect } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { useOrderNotifications } from '../../hooks/useOrderNotifications';
import { Filter } from 'lucide-react';
import { OrderCard } from './OrderCard';
import { toast } from 'react-toastify';
import { Order } from '../../types';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTable, setFilterTable] = useState<string>('all');
  const [previousOrders, setPreviousOrders] = useState<Order[]>([]);

  // Initialize order notifications
  useOrderNotifications();

  // Check for new orders every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const newOrders = orders.filter(
        order => !previousOrders.find(prev => prev.id === order.id)
      );

      // Show toast for new orders
      newOrders.forEach(order => {
        toast.info(`New order from Table ${order.tableNumber}!`, {
          position: "top-right",
          autoClose: 5000,
        });
      });

      setPreviousOrders(orders);
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [orders, previousOrders]);

  const filteredOrders = orders.filter(order => {
    const statusMatch = filterStatus === 'all' ? true : order.status === filterStatus;
    const tableMatch = filterTable === 'all' ? true : order.tableNumber === filterTable;
    return statusMatch && tableMatch;
  });

  // Get unique table numbers
  const tables = Array.from(new Set(orders.map(order => order.tableNumber))).sort();

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Order Management</h2>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
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
              {tables.map(table => (
                <option key={table} value={table}>Table {table}</option>
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