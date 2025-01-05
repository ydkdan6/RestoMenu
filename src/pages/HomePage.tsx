import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTableStore } from '../stores/tableStore';
import { QrCode } from 'lucide-react';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const tableNumber = useTableStore((state) => state.tableNumber);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto rounded-[50px] bg-gradient-to-br from-[#cacaca] to-[#f0f0f0] shadow-[27px_27px_36px_#a6a6a6,-27px_-27px_36px_#ffffff] p-6">
          <h1 className="text-2xl font-bold text-center mb-6">
            Welcome to Our Restaurant
          </h1>
          
          {tableNumber ? (
            <div className="text-center">
              <p className="text-lg mb-4">You are at Table {tableNumber}</p>
              <button
                onClick={() => navigate('/menu')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
              >
                View Menu
              </button>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600 mb-4">
                Please scan your table's QR code to begin ordering
              </p>
              <button
                onClick={() => navigate('/qr')}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 mx-auto"
              >
                <QrCode className="w-5 h-5" />
                Scan QR Code
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};