import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

/**
 * Custom hook to manage session validity.
 */
export const useSession = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = () => {
      const queryParams = new URLSearchParams(location.search);
      const tokenFromUrl = queryParams.get('token');
      const tokenFromStorage = localStorage.getItem('sessionToken');
      const expiration = localStorage.getItem('tokenExpiration');

      // Prioritize token from URL query string
      if (tokenFromUrl) {
        const newExpiration = Date.now() + 10 * 60 * 1000; // 10 minutes
        localStorage.setItem('sessionToken', tokenFromUrl);
        localStorage.setItem('tokenExpiration', newExpiration.toString());
        console.log('Token from URL processed:', tokenFromUrl);
        setIsValid(true);
        return;
      }

      // Validate token from localStorage
      if (tokenFromStorage && expiration && Date.now() < parseInt(expiration)) {
        console.log('Token from localStorage valid:', tokenFromStorage);
        setIsValid(true);
        return;
      }

      // Handle invalid session
      handleSessionExpired();
    };

    const handleSessionExpired = () => {
      localStorage.removeItem('sessionToken');
      localStorage.removeItem('tokenExpiration');
      localStorage.removeItem('tableNumber');
      setIsValid(false);
      toast.error('Session expired. Please scan the QR code again.');
      // Debounce navigation to avoid race conditions
      setTimeout(() => navigate('/qr', { replace: true }), 100);
    };

    // Initial check and periodic validation
    checkSession();
    const interval = setInterval(checkSession, 1000);

    return () => clearInterval(interval);
  }, [navigate, location.search]);

  return isValid;
};
