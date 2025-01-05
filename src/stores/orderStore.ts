import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types';

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  removeOrder: (orderId: string) => void;
  getTotalRevenue: () => number;
  getOrdersByStatus: () => Record<Order['status'], number>;
}

export const useOrders = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],
      addOrder: (order) => {
        set((state) => ({ 
          orders: [...state.orders, order] 
        }));
      },
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          ),
        }));
      },
      removeOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.filter((order) => order.id !== orderId),
        }));
      },
      getTotalRevenue: () => {
        return get().orders.reduce((total, order) => total + order.totalAmount, 0);
      },
      getOrdersByStatus: () => {
        return get().orders.reduce((acc, order) => {
          acc[order.status] = (acc[order.status] || 0) + 1;
          return acc;
        }, {} as Record<Order['status'], number>);
      },
    }),
    {
      name: 'orders-storage',
    }
  )
);