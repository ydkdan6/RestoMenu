import React from 'react';
import { AppRoutes } from './Routes';
import { CartProvider } from './context/CartContext';

const App: React.FC = () => {
  return (
    <CartProvider>
      <AppRoutes />
    </CartProvider>
  );
};

export default App;
