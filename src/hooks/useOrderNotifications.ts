import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useOrders } from './useOrders';
import { Order } from '../types';

export const useOrderNotifications = () => {
  const { orders, removeOrder } = useOrders();

  useEffect(() => {
    const interval = setInterval(() => {
      orders.forEach((order: Order) => {
        if (order.status === 'ready') {
          // Notify customer
          toast.success(`Order for Table ${order.tableNumber} is ready!`, {
            position: "bottom-right",
            autoClose: false,
            closeOnClick: true,
          });
          
          // Remove from order management after 5 minutes
          setTimeout(() => {
            removeOrder(order.id);
          }, 5 * 60 * 1000); // 5 minutes
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [orders, removeOrder]);
};