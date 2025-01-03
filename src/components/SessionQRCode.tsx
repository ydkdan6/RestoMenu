import React, { useEffect, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw } from 'lucide-react';
import { setSessionToken, getSessionToken, clearSession } from '../utils/sessionManager';

export const SessionQRCode: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  
  const initializeSession = () => {
    const newToken = setSessionToken();
    setToken(newToken);
    setTimeLeft(600); // 10 minutes in seconds
  };
  
  useEffect(() => {
    const existingToken = getSessionToken();
    if (existingToken) {
      setToken(existingToken);
      const expiration = parseInt(localStorage.getItem('tokenExpiration') || '0');
      setTimeLeft(Math.max(0, Math.floor((expiration - Date.now()) / 1000)));
    } else {
      initializeSession();
    }
  }, []);
  
  useEffect(() => {
    if (!token) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearSession();
          setToken(null);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [token]);
  
  const sessionUrl = token 
    ? `${window.location.origin}/select-table?token=${token}`
    : '';
    
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Scan to Order</h2>
        
        <AnimatePresence mode="wait">
          {token ? (
            <motion.div
              key="qr-active"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-center">
                <div className="p-4 bg-white rounded-lg shadow-inner">
                  <QRCodeSVG
                    value={sessionUrl}
                    size={200}
                    level="H"
                    includeMargin
                  />
                </div>
              </div>
              
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-2">Session expires in</p>
                <p className="text-2xl font-mono font-bold text-blue-600">
                  {formatTime(timeLeft)}
                </p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="qr-expired"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center space-y-4"
            >
              <p className="text-lg text-gray-600">Session Expired</p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={initializeSession}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Generate New Code
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};