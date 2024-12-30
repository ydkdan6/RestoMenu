export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'food' | 'drinks';
  imageUrl: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
  specialNotes?: string;
}

export interface Order {
  id: string;
  tableNumber: string;
  items: CartItem[];
  status: 'pending' | 'preparing' | 'ready' | 'served';
  timestamp: string;
  totalAmount: number;
}