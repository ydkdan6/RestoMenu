import { create } from 'zustand';

interface Customer {
  id: string;
  name: string;
  partySize: number;
  waitTime: number;
  status: 'waiting' | 'seated' | 'cancelled';
  timestamp: Date;
}

interface QueueStore {
  queue: Customer[];
  addToQueue: (customer: { name: string; partySize: number }) => void;
  removeFromQueue: (id: string) => void;
  updateStatus: (id: string, status: Customer['status']) => void;
}

export const useQueue = create<QueueStore>((set) => ({
  queue: [],
  addToQueue: (customer) => set((state) => ({
    queue: [...state.queue, {
      id: Math.random().toString(36).substr(2, 9),
      ...customer,
      waitTime: 15 * state.queue.length, // Simple estimation
      status: 'waiting',
      timestamp: new Date(),
    }],
  })),
  removeFromQueue: (id) => set((state) => ({
    queue: state.queue.filter((customer) => customer.id !== id),
  })),
  updateStatus: (id, status) => set((state) => ({
    queue: state.queue.map((customer) =>
      customer.id === id ? { ...customer, status } : customer
    ),
  })),
}));