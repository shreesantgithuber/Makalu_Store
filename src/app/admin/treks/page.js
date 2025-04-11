'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const TrekListPage = () => {
  const [loading, setLoading] = useState(true);
  const [treks, setTreks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTreks = async () => {
      try {
        const response = await fetch('/api/admin/trek');
        if (!response.ok) {
          const message = `An error occurred: ${response.status}`;
          throw new Error(message);
        }
        const data = await response.json();
        setTreks(data.data);
      } catch (error) {
        console.error('Error fetching treks:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTreks();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-100">Loading treks...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen bg-red-200 text-red-800">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-semibold text-gray-800">List of Treks</h1>
          <Link
            href="/admin/create-trek"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Add New Trek
          </Link>
        </div>
        {treks.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {treks.map((trek) => (
              <li key={trek._id} className="py-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-700">{trek.name}</h2>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${
                      trek.status === 'planning'
                        ? 'blue'
                        : trek.status === 'ongoing'
                        ? 'green'
                        : trek.status === 'completed'
                        ? 'gray'
                        : trek.status === 'cancelled'
                        ? 'red'
                        : 'gray'
                    }-100 text-${
                      trek.status === 'planning'
                        ? 'blue'
                        : trek.status === 'ongoing'
                        ? 'green'
                        : trek.status === 'completed'
                        ? 'gray'
                        : trek.status === 'cancelled'
                        ? 'red'
                        : 'gray'
                    }-800`}
                  >
                    {trek.status.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-500">trek_id: {trek._id}</p>
                <p className="text-sm text-gray-500">Destination: {trek.destination}</p>
                <p className="text-sm text-gray-500">Start Date: {new Date(trek.startDate).toLocaleDateString()}</p>
                <p className="text-sm text-gray-500">End Date: {new Date(trek.endDate).toLocaleDateString()}</p>
                {trek.groupLeader && (
                  <p className="text-sm text-gray-500">Group Leader: {trek.groupLeader}</p>
                )}
                <p className="text-sm text-gray-500">Total Participants: {trek.totalParticipants}</p>
                <p className="text-xs text-gray-400">Created At: {new Date(trek.createdAt).toLocaleString()}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No treks available.</p>
        )}
      </div>
    </div>
  );
};

export default TrekListPage;