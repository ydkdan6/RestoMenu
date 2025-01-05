import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTableStore } from '../stores/tableStore';
import { validateSession } from '../utils/sessionManager';
import { toast } from 'react-toastify';

export const TableSelectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const setTableNumber = useTableStore((state) => state.setTableNumber);

  useEffect(() => {
    const token = searchParams.get('token');
    if (!validateSession(token)) {
      toast.error('Invalid or expired session');
      navigate('/qr');
    }
  }, [searchParams, navigate]);

  const handleTableSelection = (table: string) => {
    setTableNumber(table);
    navigate('/menu');
  };

  const tables = Array.from({ length: 6 }, (_, i) => (i + 1).toString());

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Select Your Table</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {tables.map((table) => (
            <motion.button
              key={table}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleTableSelection(table)}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-2xl font-bold text-blue-600 mb-2">
                Table {table}
              </div>
              <div className="text-sm text-gray-500">
                Tap to select
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
};