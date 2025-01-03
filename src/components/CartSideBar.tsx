import React from 'react';
import { motion } from 'framer-motion';
import { Cart } from './Cart';
import { useCart } from '../context/CartContext';
import { useTableStore } from '../stores/tableStore';
import { useOrders } from '../hooks/useOrders';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

interface CartSidebarProps {
  onClose: () => void;
}

export const CartSidebar: React.FC<CartSidebarProps> = ({ onClose }) => {
  const { state, dispatch } = useCart();
  const tableNumber = useTableStore((state) => state.tableNumber);
  const { addOrder } = useOrders();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    if (state.items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    const order = {
      id: Math.random().toString(36).substr(2, 9),
      tableNumber: tableNumber!,
      items: state.items,
      status: 'pending' as const,
      timestamp: new Date().toISOString(),
      totalAmount: state.total
    };

    addOrder(order);
    dispatch({ type: 'CLEAR_CART' });
    onClose();
    toast.success('Order placed successfully!');
    navigate('/order-status');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'tween', duration: 0.3 }}
        className="absolute right-0 top-0 h-full w-96 bg-white shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="h-full flex flex-col">
          <div className="p-4 border-b flex items-center justify-between">
            <h2 className="text-lg font-semibold">Your Order</h2>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </motion.button>
          </div>
          
          <div className="flex-1 overflow-y-auto">
            <Cart />
          </div>
          
          <div className="p-4 border-t">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handlePlaceOrder}
              className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg font-medium
                       hover:bg-blue-700 transform transition-all duration-200"
            >
              Place Order
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};