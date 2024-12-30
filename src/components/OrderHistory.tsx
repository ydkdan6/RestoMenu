import React from 'react';
import { loadFromLocalStorage } from '../utils/localStorage';
import { OrderStatus } from './OrderStatus';
import { Order } from '../types';

export const OrderHistory: React.FC = () => {
  const orders = loadFromLocalStorage('orders') || [];

  if (orders.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        No previous orders
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {orders.map((order: Order) => (
        <div key={order.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Order #{order.id.slice(-4)}</span>
            <OrderStatus orderId={order.id} />
          </div>
          <div className="space-y-2">
            {order.items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>{item.quantity}x {item.name}</span>
                <span>${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 pt-3 border-t flex justify-between">
            <span className="text-sm text-gray-500">
              {new Date(order.timestamp).toLocaleString()}
            </span>
            <span className="font-medium">
              Total: ${order.totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};