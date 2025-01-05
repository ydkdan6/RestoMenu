import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MenuGrid } from '../components/ui/MenuGrid';
import { CategoryButton } from '../components/ui/CategoryButton';
import { CartProvider } from '../context/CartContext';
import { menuItems } from '../data/menuItems';
import { Bell, ShoppingCart } from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import { useTableStore } from '../stores/tableStore';
import { useNavigate } from 'react-router-dom';
import { CartSidebar } from '../components/CartSideBar';

export const MenuPage: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState<'all' | 'food' | 'drinks'>('all');
  const tableNumber = useTableStore((state) => state.tableNumber);
  const navigate = useNavigate();

  const filteredItems = menuItems.filter(
    item => category === 'all' || item.category === category
  );

  const handleCallStaff = () => {
    if (!tableNumber) {
      toast.error('Please select a table first');
      return;
    }
    toast.info(`Staff has been notified and will attend to Table ${tableNumber} shortly.`);
  };

  if (!tableNumber) {
    navigate('/');
    return null;
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          className="bg-white shadow-sm sticky top-0 z-10"
        >
          <ToastContainer />
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">Our Menu</h1>
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                  Table {tableNumber}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={handleCallStaff}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <Bell className="w-6 h-6" />
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setShowCart(!showCart)}
                  className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
                >
                  <ShoppingCart className="w-6 h-6" />
                  <span className='bg-red-500 w-2 h-2 absolute top-6 rounded-full ml-3'></span>
                </motion.button>
              </div>
            </div>
          </div>
        </motion.header>

        <main className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
            <CategoryButton
              active={category === 'all'}
              onClick={() => setCategory('all')}
            >
              All Items
            </CategoryButton>
            <CategoryButton
              active={category === 'food'}
              onClick={() => setCategory('food')}
            >
              Food
            </CategoryButton>
            <CategoryButton
              active={category === 'drinks'}
              onClick={() => setCategory('drinks')}
            >
              Drinks
            </CategoryButton>
          </div>

          <AnimatePresence mode="wait">
            <MenuGrid key={category} items={filteredItems} />
          </AnimatePresence>
        </main>

        <AnimatePresence>
          {showCart && <CartSidebar onClose={() => setShowCart(false)} />}
        </AnimatePresence>
      </div>
    </CartProvider>
  );
};