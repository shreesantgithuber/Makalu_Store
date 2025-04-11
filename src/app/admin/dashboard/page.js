'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

const DashboardPage = () => {
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [productCounts, setProductCounts] = useState({});
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    const checkAdmin = async () => {
      try {
        const response = await fetch('/api/auth/session'); // Assuming you have this endpoint
        const data = await response.json();
        if (data?.user?.isAdmin) {
          setIsAdmin(true);
        } else {
          console.log('Not an admin');
          // router.push('/login');
        }
      } catch (error) {
        console.error('Error checking session:', error);
        // router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    const fetchDashboardData = async () => {
      try {
        const productCountsResponse = await fetch('/api/dashboard/product-counts'); // Endpoint to get counts
        const productCountsData = await productCountsResponse.json();
        setProductCounts(productCountsData);

        const activityResponse = await fetch('/api/dashboard/recent-activity'); // Endpoint for recent activity
        const activityData = await activityResponse.json();
        setRecentActivity(activityData);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    checkAdmin();
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Loading...</div>;
  }

  if (!isAdmin) {
    return <div className="flex justify-center items-center h-screen bg-gray-900 text-white">Not Authorized</div>;
  }

  const productTypes = [
    { name: 'Tents', slug: 'tents' },
    { name: 'Box Tents', slug: 'box-tents' },
    { name: 'Dining Tents', slug: 'dining-tents' },
    { name: 'Kitchen Tents', slug: 'kitchen-tents' },
    { name: 'Shower Tents', slug: 'shower-tents' },
    { name: 'Toilet Tents', slug: 'toilet-tents' },
    { name: 'Chairs', slug: 'chairs' },
    { name: 'Tables', slug: 'tables' },
    { name: 'Oxygen', slug: 'oxygen' },
    { name: 'Max and Regulators', slug: 'max-and-regulators' },
    { name: 'Radio Sets', slug: 'radio-sets' },
  ];

  return (
    <div className="min-h-screen bg-gray-900 py-6 px-4 sm:px-6 lg:px-8 text-white">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-semibold mb-6 text-center text-gray-300">Makalu General Store</h1>
        <button>
          <Link href='/admin/treks' className="block p-4 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white text-center transition duration-300">Treks</Link>
        </button>
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Product Overview</h2>
          <div className="overflow-x-auto rounded-md shadow-md">
            <table className="min-w-full bg-gray-800">
              <thead className="bg-gray-700">
                <tr>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Product</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Total</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-green-300 uppercase tracking-wider">Available</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-yellow-300 uppercase tracking-wider">Out on Trek</th>
                  <th className="py-3 px-6 text-left text-xs font-medium text-blue-300 uppercase tracking-wider">Returned</th>
                  <th className="py-3 px-6 text-right text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {productTypes.map((product) => (
                  <tr key={product.slug}>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <Link href={`/admin/${product.slug}`} className="hover:text-indigo-400 transition duration-200">
                        <div className="text-sm font-medium text-gray-200">{product.name}</div>
                      </Link>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{productCounts[product.slug]?.total || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm text-green-300">{productCounts[product.slug]?.available || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm text-yellow-300">{productCounts[product.slug]?.outOnTrek || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap">
                      <div className="text-sm text-blue-300">{productCounts[product.slug]?.returned || 'N/A'}</div>
                    </td>
                    <td className="py-4 px-6 whitespace-nowrap text-right">
                      <Link href={`/admin/${product.slug}`} className="text-indigo-400 hover:text-indigo-600 transition duration-200">
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="bg-gray-800 shadow-md rounded-md p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Recent Activity</h2>
          {recentActivity.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {recentActivity.map((activity) => (
                <li key={activity._id} className="py-3">
                  <p className="text-gray-400">{activity.description}</p>
                  <p className="text-sm text-gray-500">{new Date(activity.date).toLocaleString()}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No recent activity to display.</p>
          )}
        </div>

        {/* Quick Actions Section */}
        <div className="bg-gray-800 shadow-md rounded-md p-6">
          <h2 className="text-xl font-semibold text-gray-300 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <Link href="/admin/add-product" className="block p-4 rounded-md bg-blue-600 hover:bg-blue-700 text-white text-center transition duration-300">
              Add New Product
            </Link>
            <Link href="/admin/assign-product" className="block p-4 rounded-md bg-green-600 hover:bg-green-700 text-white text-center transition duration-300">
              Assign Product to Trek
            </Link>
            <Link href="/admin/receive-product" className="block p-4 rounded-md bg-yellow-600 hover:bg-yellow-700 text-white text-center transition duration-300">
              Mark Product as Returned
            </Link>
            {/* Add more quick actions as needed */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;