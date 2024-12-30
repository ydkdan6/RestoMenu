import React, { useState } from 'react';
import { MenuCard } from '../components/MenuCard';
import { Cart } from '../components/Cart';
import { CartProvider } from '../context/CartContext';
import { useLocation } from '../hooks/useLocation';
import { menuItems } from '../data/menuItems';
import { Bell, ShoppingCart } from 'lucide-react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route, Link } from 'react-router-dom';


const HomePage: React.FC = () => {
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState<'all' | 'food' | 'drinks'>('all');
  const { isInside, error } = useLocation();

  const filteredItems = menuItems.filter(
    item => category === 'all' || item.category === category
  );

  const handleCallStaff = () => {
    // In a real app, this would trigger a WebSocket event
    alert('Staff has been notified and will attend to your table shortly.');
  };

  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-100">
        {/* Header */}
        <ToastContainer />
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Restaurant Menu</h1>
            <div className="flex items-center gap-4">
              <button
                onClick={handleCallStaff}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full"
              >
                <Bell className="w-6 h-6" />
              </button>
              <button
                onClick={() => setShowCart(!showCart)}
                className="p-2 text-gray-600 hover:bg-gray-100 rounded-full relative"
              >
                <ShoppingCart className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {/* Location Warning */}
        {!isInside && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  {error || 'You must be inside the restaurant to place an order.'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Category Filter */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setCategory('all')}
              className={`px-4 py-2 rounded-md ${
                category === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setCategory('food')}
              className={`px-4 py-2 rounded-md ${
                category === 'food'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Food
            </button>
            <button
              onClick={() => setCategory('drinks')}
              className={`px-4 py-2 rounded-md ${
                category === 'drinks'
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              Drinks
            </button>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        {showCart && (
          <div className="fixed inset-y-0 right-0 w-96 bg-white shadow-xl transform transition-transform">
            <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                <h2 className="text-lg font-semibold">Your Order</h2>
                <button
                  onClick={() => setShowCart(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ×
                </button>
              </div>
              <div className="flex-1 overflow-y-auto">
                <Cart />
              </div>
              <div className="p-4 border-t">
                <button
                  disabled={!isInside}
                  className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                    isInside
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isInside ? 'Place Order' : 'Must be in restaurant to order'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </CartProvider>
  );
}

export default HomePage;