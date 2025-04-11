'use client';

import { useState } from 'react';

const ReceiveProductPage = () => {
  const [uniqueId, setUniqueId] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    const returnData = {
      uniqueId,
      returnDate,
    };

    try {
      const response = await fetch('/api/admin/receive-product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Product marked as returned!');
      } else {
        setError(data.message || 'Failed to mark product as returned.');
      }
    } catch (error) {
      console.error('Error marking product as returned:', error);
      setError('An unexpected error occurred.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Mark Product as Returned</h1>
        {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
        {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{successMessage}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="uniqueId" className="block text-gray-700 text-sm font-bold mb-2">Product Unique ID:</label>
            <input type="text" id="uniqueId" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={uniqueId} onChange={(e) => setUniqueId(e.target.value)} required />
          </div>
          <div>
            <label htmlFor="returnDate" className="block text-gray-700 text-sm font-bold mb-2">Return Date:</label>
            <input type="date" id="returnDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={returnDate} onChange={(e) => setReturnDate(e.target.value)} required />
          </div>
          <button type="submit" className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Mark as Returned</button>
        </form>
      </div>
    </div>
  );
};

export default ReceiveProductPage;