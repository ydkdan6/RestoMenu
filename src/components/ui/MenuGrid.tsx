import React from 'react';
import { motion } from 'framer-motion';
import { MenuItem } from '../../types';
import { MenuCard } from '../MenuCard';

interface MenuGridProps {
  items: MenuItem[];
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const MenuGrid: React.FC<MenuGridProps> = ({ items }) => {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {items.map((menuItem) => (
        <motion.div key={menuItem.id} variants={item}>
          <MenuCard item={menuItem} />
        </motion.div>
      ))}
    </motion.div>
  );
};