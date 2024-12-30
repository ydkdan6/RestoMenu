import React from 'react';
import { QRScanner } from '../components/QRScanner';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export const QRPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="p-4">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Menu
        </button>
      </div>
      <QRScanner />
    </div>
  );
};