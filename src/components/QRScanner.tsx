import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useTableStore } from '../stores/tableStore';

export const QRScanner: React.FC = () => {
  const setTableNumber = useTableStore((state) => state.setTableNumber);

  // Function to generate table QR code for testing
  const generateTableQR = (tableNumber: string) => {
    return (
      <div className="p-4">
        <QRCodeSVG 
          value={`https://resto-menu-indol.vercel.app/?table=${tableNumber}`} // Redirect URL for each table
          size={256}
          level="H"
          includeMargin={true}
        />
      </div>
    );
  };

  // For demo purposes, we'll show QR codes for tables 1-3
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full h-4/5 flex flex-col">
        <h2 className="text-xl font-semibold mb-4 text-center">Sample Table QR Codes</h2>
        <div className="overflow-y-auto flex-grow scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="grid grid-cols-1 gap-6">
            {['1', '2', '3'].map((tableNum) => (
              <div key={tableNum} className="text-center">
                <p className="mb-2">Table {tableNum}</p>
                {generateTableQR(tableNum)}
                <button
                  onClick={() => {
                    setTableNumber(tableNum);
                    window.location.href = `https://resto-menu-indol.vercel.app/?table=${tableNum}`; // Redirect to specific URL
                  }}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Select Table {tableNum}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
