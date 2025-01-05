import { toast } from 'react-toastify';

export const generateToken = (): string => {
  return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
};

export const setSessionToken = () => {
  const token = generateToken();
  const expirationTime = Date.now() + 10 * 60 * 1000; // 10 minutes
  
  localStorage.setItem('sessionToken', token);
  localStorage.setItem('tokenExpiration', expirationTime.toString());
  
  return token;
};

export const getSessionToken = () => {
  const token = localStorage.getItem('sessionToken');
  const expiration = localStorage.getItem('tokenExpiration');
  
  if (!token || !expiration) return null;
  
  if (Date.now() > parseInt(expiration)) {
    clearSession();
    return null;
  }
  
  return token;
};

export const validateSession = (token: string | null): boolean => {
  const storedToken = getSessionToken();
  return token === storedToken && storedToken !== null;
};

export const clearSession = () => {
  localStorage.removeItem('sessionToken');
  localStorage.removeItem('tokenExpiration');
  localStorage.removeItem('tableNumber');
  toast.error('Session expired. Please scan the QR code again.');
};