import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TableState {
  tableNumber: string | null;
  setTableNumber: (number: string) => void;
  clearTableNumber: () => void;
}

export const useTableStore = create<TableState>()(
  persist(
    (set) => ({
      tableNumber: null,
      setTableNumber: (number) => set({ tableNumber: number }),
      clearTableNumber: () => set({ tableNumber: null }),
    }),
    {
      name: 'table-storage',
    }
  )
);