import React, { useEffect, useState } from 'react';
import { socket } from '../../services/socket';
import { Order } from '../../types';

export const Dashboard: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    socket.on('orders:update', (updatedOrders: Order[]) => {
      setOrders(updatedOrders);
    });

    socket.on('staff:called', ({ tableNumber }) => {
      alert(`Table ${tableNumber} needs assistance!`);
    });

    return () => {
      socket.off('orders:update');
      socket.off('staff:called');
    };
  }, []);

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    socket.emit('order:status', { orderId, status });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Restaurant Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Table {order.tableNumber}</h3>
              <span className="text-sm text-gray-500">
                {new Date(order.timestamp).toLocaleTimeString()}
              </span>
            </div>
            
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>{item.quantity}x {item.name}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t">
              <select
                value={order.status}
                onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                className="w-full p-2 border rounded"
              >
                <option value="pending">Pending</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="served">Served</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};