import React, { useState } from 'react';
import { MenuItem } from '../types';
import { useCart } from '../context/CartContext';
import { Minus, Plus } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface MenuCardProps {
  item: MenuItem;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        ...item,
        quantity,
        specialNotes: notes.trim() || undefined
      }
    });
    
    toast.success(`Added ${quantity}x ${item.name} to cart`, {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    
    setQuantity(1);
    setNotes('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{item.name}</h3>
        <p className="text-gray-600 mt-1">{item.description}</p>
        <p className="text-lg font-bold mt-2">#{item.price.toFixed(2)}</p>
        
        <div className="mt-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Minus className="w-5 h-5" />
            </button>
            <span className="font-semibold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
          
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Special requests..."
            className="mt-3 w-full p-2 border rounded-md text-sm"
            rows={2}
          />
          
          <button
            onClick={handleAddToCart}
            className="w-full mt-3 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};