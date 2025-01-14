import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion } from 'framer-motion';

export const SessionQRCode: React.FC = () => {
  // Get the base URL for the deployed site
  const getBaseUrl = () => {
    // For Vercel deployments
    if (true) {
      return `https://resto-menu-indol.vercel.app`;
    }
    // Fallback to current origin
    return window.location.origin;
  };
  
  const qrCodeUrl = `${getBaseUrl()}/select-table`;

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Scan to Order</h2>
        <div className="flex justify-center">
          <div className="p-4 bg-white rounded-lg shadow-inner">
            <QRCodeSVG
              value={qrCodeUrl}
              size={200}
              level="H"
              includeMargin
            />
          </div>
        </div>
        <p className="text-center mt-4 text-gray-600">
          Scan this QR code to start your order
        </p>
      </motion.div>
    </div>
  );
};