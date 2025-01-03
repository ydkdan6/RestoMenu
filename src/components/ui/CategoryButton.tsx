import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

interface CategoryButtonProps {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}

export const CategoryButton: React.FC<CategoryButtonProps> = ({ active, onClick, children }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={clsx(
        'px-6 py-2 rounded-full font-medium transition-colors duration-200',
        active ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'
      )}
    >
      {children}
    </motion.button>
  );
};