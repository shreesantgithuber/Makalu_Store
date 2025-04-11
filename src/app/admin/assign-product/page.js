'use client';

import { useState, useEffect } from 'react';

const AssignProductPage = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [trekId, setTrekId] = useState('');
  const [groupName, setGroupName] = useState('');
  const [assignDate, setAssignDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [products, setProducts] = useState([]);
  const [treks, setTreks] = useState([]); 

  useEffect(() => {
    // Example:
    // const fetchAvailableProducts = async () => { ... };
    // const fetchActiveTreks = async () => { ... };
    // fetchAvailableProducts();
    // fetchActiveTreks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const assignmentData = {
      uniqueId,
      trekId,
      groupName,
      assignDate,
    };

    try {
      const response = await fetch('/api/admin/assign-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(assignmentData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Product assigned successfully!');
      } else {
        setError(data.message || 'Failed to assign product.');
      }
    } catch (error) {
      console.error('Error assigning product:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Assign Product to Trek</h1>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="uniqueId" className="block text-gray-700 text-sm font-bold mb-2">Product Unique ID:</label>
            <input type="text" id="uniqueId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="trekId" className="block text-gray-700 text-sm font-bold mb-2">Trek ID:</label>
            <input type="text" id="trekId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={trekId} onChange={(e) => setTrekId(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="groupName" className="block text-gray-700 text-sm font-bold mb-2">Group Name:</label>
            <input type="text" id="groupName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={groupName} onChange={(e) => setGroupName(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="assignDate" className="block text-gray-700 text-sm font-bold mb-2">Assign Date:</label>
            <input type="date" id="assignDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={assignDate} onChange={(e) => setAssignDate(e.target.value)} required />
          </div>
          <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Assign Product</button>
        </form>
      </div>
    </div>
  );
};

export default AssignProductPage;