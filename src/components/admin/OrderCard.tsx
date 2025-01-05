import React from 'react';
import { Order } from '../../types';
import { Badge } from '../ui/Badge';
import { Clock, MapPin } from 'lucide-react';
import { useStatusColor } from '../../hooks/useStatusColor';

interface OrderCardProps {
  order: Order;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export const OrderCard: React.FC<OrderCardProps> = ({ order, onStatusUpdate }) => {
  const getStatusColor = useStatusColor();

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold">Table {order.tableNumber}</h3>
          </div>
          <p className="text-sm text-gray-500 flex items-center mt-1">
            <Clock className="w-4 h-4 mr-1" />
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
                <p className="text-sm text-gray-500 ml-6">Note: {item.specialNotes}</p>
              )}
            </div>
            <span>#{(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center pt-4 border-t">
        <select
          value={order.status}
          onChange={(e) => onStatusUpdate(order.id, e.target.value as Order['status'])}
          className="border rounded p-2"
        >
          <option value="pending">Pending</option>
          <option value="preparing">Preparing</option>
          <option value="ready">Ready</option>
          <option value="served">Served</option>
        </select>
        <div className="text-lg font-bold">
          Total: #{order.totalAmount.toFixed(2)}
        </div>
      </div>
    </div>
  );
};