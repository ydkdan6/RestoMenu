import { useMemo } from 'react';

export const useStatusColor = () => {
  return useMemo(() => (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      preparing: 'bg-blue-100 text-blue-800',
      ready: 'bg-green-100 text-green-800',
      served: 'bg-gray-100 text-gray-800',
    };
    return colors[status as keyof typeof colors] || colors.pending;
  }, []);
};