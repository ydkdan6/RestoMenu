import { useEffect, useState } from 'react';
import { useOrders } from './useOrders'; // Import the Zustand store
import { Order } from '../types';

export const useOrderStatus = (orderId: string) => {
  // Fetch orders from Zustand store
  const orders = useOrders((state) => state.orders);

  // Find the status based on orderId, with default to 'pending'
  const order = orders.find((order: Order) => order.id === orderId);
  const [status, setStatus] = useState<Order['status']>(order?.status || 'pending');

  useEffect(() => {
    // Subscribe to Zustand store for order updates
    const unsubscribe = useOrders.subscribe((state) => {
      const orders = state.orders;
      const order = orders.find((order) => order.id === orderId);
      if (order) {
        setStatus(order.status);
      }
    });

    return () => {
      unsubscribe(); // Clean up the subscription
    };
  }, [orderId, orders]);

  return status;
};
