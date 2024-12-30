import React from 'react';
import { useCart } from '../context/CartContext';
import { Trash2 } from 'lucide-react';

export const Cart: React.FC = () => {
  const { state, dispatch } = useCart();

  const handleRemoveItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  if (state.items.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        Your cart is empty
      </div>
    );
  }

  return (
    <div className="p-4">
      {state.items.map((item) => (
        <div key={item.id} className="flex items-start gap-4 py-4 border-b">
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-20 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-sm text-gray-600">#{item.price.toFixed(2)} × {item.quantity}</p>
            {item.specialNotes && (
              <p className="text-sm text-gray-500 mt-1">Note: {item.specialNotes}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <select
                value={item.quantity}
                onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                className="border rounded p-1"
              >
                {[1,2,3,4,5,6,7,8,9,10].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
              <button
                onClick={() => handleRemoveItem(item.id)}
                className="p-1 text-red-500 hover:bg-red-50 rounded"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
          <div className="text-right">
            <p className="font-semibold">#{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-bold">Total: #{state.total.toFixed(2)}</p>
      </div>
    </div>
  );
};