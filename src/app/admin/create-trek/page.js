'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const CreateTrekPage = () => {
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [destination, setDestination] = useState('');
  const [groupLeader, setGroupLeader] = useState('');
  const [totalParticipants, setTotalParticipants] = useState(1);
  const [status, setStatus] = useState('planning');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccessMessage('');

    const trekData = {
      name,
      startDate,
      endDate,
      destination,
      groupLeader,
      totalParticipants: parseInt(totalParticipants),
      status,
    };

    try {
      const response = await fetch('/api/admin/trek', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(trekData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage('Trek created successfully!');
        // Reset the form
        setName('');
        setStartDate('');
        setEndDate('');
        setDestination('');
        setGroupLeader('');
        setTotalParticipants(1);
        setStatus('planning');
      } else {
        setError(data.error || 'Failed to create trek.');
      }
    } catch (error) {
      console.error('Error creating trek:', error);
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
        <h1 className="text-2xl font-semibold text-gray-800 mb-4">Create New Trek</h1>
        {successMessage && (
          <div className="bg-green-200 text-green-800 border border-green-400 rounded py-2 px-4 mb-4">
            {successMessage}
          </div>
        )}
        {error && (
          <div className="bg-red-200 text-red-800 border border-red-400 rounded py-2 px-4 mb-4">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Trek Name:
            </label>
            <input
              type="text"
              id="name"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
              Start Date:
            </label>
            <input
              type="date"
              id="startDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">
              End Date:
            </label>
            <input
              type="date"
              id="endDate"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
              Destination:
            </label>
            <input
              type="text"
              id="destination"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="groupLeader" className="block text-sm font-medium text-gray-700">
              Group Leader (Optional):
            </label>
            <input
              type="text"
              id="groupLeader"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={groupLeader}
              onChange={(e) => setGroupLeader(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="totalParticipants" className="block text-sm font-medium text-gray-700">
              Total Participants:
            </label>
            <input
              type="number"
              id="totalParticipants"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={totalParticipants}
              onChange={(e) => setTotalParticipants(e.target.value)}
              min="1"
              required
            />
          </div>
          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status:
            </label>
            <select
              id="status"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="planning">Planning</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              disabled={loading}
            >
              {loading ? 'Creating...' : 'Create Trek'}
            </button>
          </div>
        </form>
        <div className="mt-4">
          <Link href="/admin/treks" className="text-blue-500 hover:underline">
            Back to Trek List
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CreateTrekPage;