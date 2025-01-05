import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';

export const useSession = () => {
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkSession = () => {
      const tokenFromStorage = localStorage.getItem('sessionToken');
      const expiration = localStorage.getItem('tokenExpiration');

      // Check if token exists in storage and is valid
      if (tokenFromStorage && expiration && Date.now() < parseInt(expiration)) {
        setIsValid(true);
        return;
      }

      // Check for token in URL query string
      const queryParams = new URLSearchParams(location.search);
      const tokenFromUrl = queryParams.get('token');

      if (tokenFromUrl) {
        // Save token and expiration (10 minutes from now)
        const newExpiration = Date.now() + 10 * 60 * 1000;
        localStorage.setItem('sessionToken', tokenFromUrl);
        localStorage.setItem('tokenExpiration', newExpiration.toString());
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
      navigate('/qr', { replace: true });
    };

    checkSession();
    const interval = setInterval(checkSession, 1000);

    return () => clearInterval(interval);
  }, [navigate, location.search]);

  return isValid;
};
