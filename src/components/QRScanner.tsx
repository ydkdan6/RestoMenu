import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTableStore } from '../stores/tableStore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const QRScanner: React.FC = () => {
  const navigate = useNavigate();
  const setTableNumber = useTableStore((state) => state.setTableNumber);

  const handleTableSelection = (tableNumber: string) => {
    setTableNumber(tableNumber);
    navigate('/');
    toast.success(`Connected to Table ${tableNumber}`);
  };

  // Generate QR codes for tables 1-6
  const tables = Array.from({ length: 6 }, (_, i) => (i + 1).toString());

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Restaurant Tables QR Codes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tables.map((tableNum) => (
          <div key={tableNum} className="bg-white p-6 rounded-lg shadow-md text-center">
            <h3 className="text-lg font-semibold mb-4">Table {tableNum}</h3>
            <div className="flex justify-center mb-4">
              <QRCodeSVG 
                value={tableNum}
                size={200}
                level="H"
                includeMargin={true}
              />
            </div>
            <button
              onClick={() => handleTableSelection(tableNum)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Select Table {tableNum}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};