import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

const SessionQRCode = () => {
  const [token, setToken] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  // Generate a random token
  const generateToken = () => {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
  };

  // Initialize session
  const initializeSession = () => {
    const newToken = generateToken();
    const expiration = Date.now() + (600 * 1000); // 10 minutes
    
    // Store in localStorage
    localStorage.setItem('sessionToken', newToken);
    localStorage.setItem('tokenExpiration', expiration.toString());
    
    setToken(newToken);
    setTimeLeft(600);
  };

  // Clear session
  const clearSession = () => {
    localStorage.removeItem('sessionToken');
    localStorage.removeItem('tokenExpiration');
    setToken(null);
    setTimeLeft(0);
  };

  useEffect(() => {
    const existingToken = localStorage.getItem('sessionToken');
    if (existingToken) {
      const expiration = parseInt(localStorage.getItem('tokenExpiration') || '0');
      const remainingTime = Math.max(0, Math.floor((expiration - Date.now()) / 1000));
      
      if (remainingTime > 0) {
        setToken(existingToken);
        setTimeLeft(remainingTime);
      } else {
        clearSession();
      }
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
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [token]);

  const sessionUrl = token 
    ? new URL(`/select-table?token=${token}`, window.location.origin).toString()
    : '';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <h2 className="text-2xl font-bold text-center mb-6">Scan to Order</h2>
        
        {token ? (
          <div className="space-y-6">
            <div className="flex justify-center">
              <div className="p-4 bg-white rounded-lg shadow-inner text-center">
                <p className="mb-4 text-sm text-gray-600">Session URL:</p>
                <p className="break-all text-blue-600 hover:text-blue-800">
                  {sessionUrl}
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Session expires in</p>
              <p className="text-2xl font-mono font-bold text-blue-600">
                {formatTime(timeLeft)}
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center space-y-4">
            <p className="text-lg text-gray-600">Session Expired</p>
            <button
              onClick={initializeSession}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Generate New Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionQRCode;