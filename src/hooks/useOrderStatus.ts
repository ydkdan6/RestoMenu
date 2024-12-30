import { useState, useEffect } from 'react';
import { socket } from '../services/socket';
import { Order } from '../types';

export const useOrderStatus = (orderId: string) => {
  const [status, setStatus] = useState<Order['status']>('pending');

  useEffect(() => {
    const handleStatusUpdate = ({ orderId: updatedOrderId, status: newStatus }: { orderId: string; status: Order['status'] }) => {
      if (updatedOrderId === orderId) {
        setStatus(newStatus);
      }
    };

    socket.on('order:status', handleStatusUpdate);

    return () => {
      socket.off('order:status', handleStatusUpdate);
    };
  }, [orderId]);

  return status;
};