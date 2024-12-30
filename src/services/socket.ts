import { io } from 'socket.io-client';

const SOCKET_URL = 'http://localhost:5173/'; 

export const socket = io(SOCKET_URL);

export const emitOrderPlaced = (order: any) => {
  socket.emit('order:placed', order);
};

export const emitCallStaff = (tableNumber: string) => {
  socket.emit('staff:called', { tableNumber });
};