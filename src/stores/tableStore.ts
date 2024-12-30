import { create } from 'zustand';

interface TableState {
  tableNumber: string | null;
  setTableNumber: (number: string) => void;
}

export const useTableStore = create<TableState>((set) => ({
  tableNumber: null,
  setTableNumber: (number) => set({ tableNumber: number }),
}));