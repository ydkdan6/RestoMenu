import React, { useEffect } from 'react';
import { useOrders } from '../../hooks/useOrders';
import { Badge } from '../ui/Badge';
import { toast } from 'react-toastify';
import { Clock, CheckCircle } from 'lucide-react';

export const OrderManagement: React.FC = () => {
  const { orders, updateOrderStatus } = useOrders();

  useEffect(() => {
    // Listen for new orders
    const unsubscribe = useOrders.subscribe((state, prevState) => {
      if (state.orders.length > prevState.orders.length) {
        toast.info('New order received!');
      }
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      served: 'bg-gray-100 text-gray-800',
    };
    return colors[status] || colors.pending;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order Management</h2>

      <div className="grid gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold">
                  Table {order.tableNumber}
                </h3>
                <p className="text-sm text-gray-500">
                  <Clock className="w-4 h-4 inline mr-1" />
                  {new Date(order.timestamp).toLocaleTimeString()}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </Badge>
            </div>

            <div className="space-y-2 mb-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between items-center">
                  <div>
                    <span className="font-medium">{item.quantity}x</span> {item.name}
                    {item.specialNotes && (
                      <p className="text-sm text-gray-500 ml-6">
                        Note: {item.specialNotes}
                      </p>
                    )}
                  </div>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center pt-4 border-t">
              <div className="space-x-2">
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                  className="border rounded p-2"
                >
                  <option value="pending">Pending</option>
                  <option value="preparing">Preparing</option>
                  <option value="ready">Ready</option>
                  <option value="served">Served</option>
                </select>
              </div>
              <div className="text-green-600 flex items-center gap-2">
                {order.status === 'ready' && (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    <span className="font-medium">Ready to Serve</span>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
