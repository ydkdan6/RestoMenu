import { useState, useEffect } from 'react';
import { socket } from '../services/socket';
import { Order } from '../types';
import { useOrders } from './useOrders';

export const useOrderStatus = (orderId: string) => {
  // Initialize status from Zustand store
  const orders = useOrders((state) => state.orders);
  const [status, setStatus] = useState<Order['status']>(() => {
    const order = orders.find(order => order.id === orderId);
    return order?.status || 'pending';
  });

  useEffect(() => {
    // Listen for socket updates
    const handleStatusUpdate = ({ orderId: updatedOrderId, status: newStatus }: { 
      orderId: string; 
      status: Order['status'] 
    }) => {
      if (updatedOrderId === orderId) {
        setStatus(newStatus);
      }
    };

    // Listen for store updates
    const unsubscribe = useOrders.subscribe(
      (state) => state.orders,
      (orders) => {
        const order = orders.find(order => order.id === orderId);
        if (order) {
          setStatus(order.status);
        }
      }
    );

    socket.on('order:status', handleStatusUpdate);

    return () => {
      socket.off('order:status', handleStatusUpdate);
      unsubscribe();
    };
  }, [orderId]);

  return status;
};