import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useSession = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = () => {
      const token = localStorage.getItem('sessionToken');
      const expiration = localStorage.getItem('tokenExpiration');
      
      if (!token || !expiration) {
        handleSessionExpired();
        return;
      }

      if (Date.now() > parseInt(expiration)) {
        handleSessionExpired();
        return;
      }

      setIsValid(true);
    };

    const handleSessionExpired = () => {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('tableNumber');
      setIsValid(false);
      toast.error('Session expired. Please scan the QR code again.');
      navigate('/qr');
    };

    checkSession();
    const interval = setInterval(checkSession, 1000);
    
    return () => clearInterval(interval);
  }, [navigate]);

  return isValid;
};