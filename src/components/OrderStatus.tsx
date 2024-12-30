import React from 'react';
import { useOrderStatus } from '../hooks/useOrderStatus';

interface OrderStatusProps {
  orderId: string;
}

export const OrderStatus: React.FC<OrderStatusProps> = ({ orderId }) => {
  const status = useOrderStatus(orderId);

  const getStatusColor = () => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'preparing': return 'bg-blue-100 text-blue-800';
      case 'ready': return 'bg-green-100 text-green-800';
      case 'served': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
};