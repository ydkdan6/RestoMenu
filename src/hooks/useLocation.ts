import { useState, useEffect } from 'react';

const RESTAURANT_COORDS = {
  latitude: 40.7128,
  longitude: -74.0060,
  radius: 100 // meters
};

export const useLocation = () => {
  const [isInside, setIsInside] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
      const R = 6371e3; // Earth's radius in meters
      const φ1 = lat1 * Math.PI / 180;
      const φ2 = lat2 * Math.PI / 180;
      const Δφ = (lat2 - lat1) * Math.PI / 180;
      const Δλ = (lon2 - lon1) * Math.PI / 180;

      const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ/2) * Math.sin(Δλ/2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

      return R * c;
    };

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const distance = calculateDistance(
          position.coords.latitude,
          position.coords.longitude,
          RESTAURANT_COORDS.latitude,
          RESTAURANT_COORDS.longitude
        );

        setIsInside(distance <= RESTAURANT_COORDS.radius);
      },
      (error) => {
        setError('Unable to retrieve your location');
        console.error(error);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return { isInside, error };
};