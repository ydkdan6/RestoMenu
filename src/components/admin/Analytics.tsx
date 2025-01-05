import React from 'react';
import { useOrders } from '../../hooks/useOrders';
import { BarChart3, DollarSign, ShoppingBag, Clock } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { orders, getTotalRevenue, getOrdersByStatus } = useOrders();
  const ordersByStatus = getOrdersByStatus();
  const totalRevenue = getTotalRevenue();
  const averageOrderValue = orders.length ? totalRevenue / orders.length : 0;

  const stats = [
    {
      title: 'Total Orders',
      value: orders.length,
      icon: ShoppingBag,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Revenue',
      value: `#${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
      color: 'bg-green-500',
    },
    {
      title: 'Average Order Value',
      value: `#${averageOrderValue.toFixed(2)}`,
      icon: BarChart3,
      color: 'bg-purple-500',
    },
    {
      title: 'Active Orders',
      value: ordersByStatus.pending || 0,
      icon: Clock,
      color: 'bg-yellow-500',
    },
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Analytics Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.title}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
              </div>
              <div className={`${stat.color} p-3 rounded-full`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Orders by Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(ordersByStatus).map(([status, count]) => (
            <div key={status} className="text-center">
              <div className="text-2xl font-bold">{count}</div>
              <div className="text-gray-500 capitalize">{status}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};