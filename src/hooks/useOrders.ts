import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Order } from '../types';
import { socket } from '../services/socket';

interface OrdersStore {
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  fetchOrders: () => Promise<void>;
  getTotalRevenue: () => number;
  getOrdersByStatus: () => Record<Order['status'], number>;
}

export const useOrders = create<OrdersStore>()(
  persist(
    (set, get) => ({
      orders: [],

      // Add a new order and save it to localStorage
      addOrder: (order) => {
        set((state) => {
          const updatedOrders = [...state.orders, order];
          localStorage.setItem('customerOrders', JSON.stringify(updatedOrders));
          return { orders: updatedOrders };
        });

        // Emit a socket event for the new order
        socket.emit('order:new', order);
      },

      // Update the status of an existing order
      updateOrderStatus: (orderId, status) => {
        set((state) => {
          const updatedOrders = state.orders.map((order) =>
            order.id === orderId ? { ...order, status } : order
          );
          localStorage.setItem('customerOrders', JSON.stringify(updatedOrders));
          return { orders: updatedOrders };
        });

        // Emit a socket event for the updated order status
        socket.emit('order:status', { orderId, status });
      },

      // Fetch orders from localStorage
      fetchOrders: async () => {
        try {
          const storedOrders = localStorage.getItem('customerOrders');
          const orders = storedOrders ? JSON.parse(storedOrders) : [];
          set({ orders });
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      },

      // Calculate total revenue
      getTotalRevenue: () => {
        return get().orders.reduce((total, order) => total + order.totalAmount, 0);
      },

      // Get count of orders by status
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
