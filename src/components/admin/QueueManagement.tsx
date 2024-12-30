import React, { useState } from 'react';
import { useQueue } from '../../hooks/useQueue';
import { toast } from 'react-toastify';

export const QueueManagement: React.FC = () => {
  const { queue, addToQueue, removeFromQueue, updateStatus } = useQueue();
  const [newCustomer, setNewCustomer] = useState({ name: '', partySize: 1 });

  const handleAdd = () => {
    if (!newCustomer.name) {
      toast.error('Please enter customer name');
      return;
    }
    addToQueue(newCustomer);
    setNewCustomer({ name: '', partySize: 1 });
    toast.success('Customer added to queue');
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Queue Management</h2>
      
      {/* Add Customer Form */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex gap-4">
          <input
            type="text"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="Customer Name"
            className="flex-1 p-2 border rounded"
          />
          <input
            type="number"
            value={newCustomer.partySize}
            onChange={(e) => setNewCustomer({ ...newCustomer, partySize: parseInt(e.target.value) })}
            min="1"
            className="w-24 p-2 border rounded"
          />
          <button
            onClick={handleAdd}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Add to Queue
          </button>
        </div>
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-lg shadow">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Position</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Party Size</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Wait Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {queue.map((customer, index) => (
              <tr key={customer.id}>
                <td className="px-6 py-4">{index + 1}</td>
                <td className="px-6 py-4">{customer.name}</td>
                <td className="px-6 py-4">{customer.partySize}</td>
                <td className="px-6 py-4">{customer.waitTime} mins</td>
                <td className="px-6 py-4">
                  <select
                    value={customer.status}
                    onChange={(e) => updateStatus(customer.id, e.target.value)}
                    className="p-1 border rounded"
                  >
                    <option value="waiting">Waiting</option>
                    <option value="seated">Seated</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => removeFromQueue(customer.id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};