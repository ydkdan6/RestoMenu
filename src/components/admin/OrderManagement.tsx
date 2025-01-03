import React, { useState } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Filter } from 'lucide-react';
import { OrderCard } from './OrderCard';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterTable, setFilterTable] = useState<string>('all');

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