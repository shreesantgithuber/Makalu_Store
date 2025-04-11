'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Import icons
import { motion } from 'framer-motion'; // For animations

const ProductDetailPage = ({ params }) => {
  const [slug, setSlug] = useState(null);
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const router = useRouter();
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  useEffect(() => {
    setSlug(params.slug);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      if (slug) {
        try {
          const response = await fetch('/api/products/get');
          if (response.ok) {
            const data = await response.json();
            setProducts(data);
          } else {
            console.error('Failed to fetch products');
          }
        } catch (error) {
          console.error('Error fetching products:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProducts();
  }, [slug]);

  const handleDelete = async (productId) => {
    setDeleteConfirmation(productId);
  };

  const confirmDelete = async (productId) => {
    try {
      const response = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProducts(products.filter((product) => product._id !== productId));
        setDeleteConfirmation(null);
        // Optionally show a success notification
      } else {
        console.error('Failed to delete product');
        // Optionally show an error notification
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Optionally show an error notification
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  if (loading || slug === null) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-gray-200 to-gray-300">
        <motion.div className="text-lg font-semibold text-gray-700" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          Loading product details...
        </motion.div>
      </div>
    );
  }

  const productTypeMap = {
    tents: 'tent',
    'box-tents': 'box-tent',
    'dining-tents': 'dining-tent',
    'kitchen-tents': 'kitchen-tent',
    'shower-tents': 'shower-tent',
    'toilet-tents': 'toilet-tent',
    chairs: 'chair',
    tables: 'table',
    oxygen: 'oxygen',
    'max-and-regulators': 'max-and-regulator',
    'radio-sets': 'radio-set',
  };

  const backendProductType = productTypeMap[slug];
  const filteredProducts = products.filter((product) => product.productType === backendProductType);

  const displayProductName = slug
    .replace(/-/g, ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  if (!backendProductType) {
    return (
      <motion.div
        className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 py-6 px-4 sm:px-6 lg:px-8 flex justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
          <h1 className="text-2xl font-semibold text-red-600 mb-4">Product Category Not Found</h1>
          <p className="text-gray-700 mb-4">The product category '{slug}' does not exist.</p>
          <Link
            href="/admin/dashboard"
            className="inline-block bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
          >
            Back to Dashboard
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-gray-200 to-gray-300 py-6 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto">
        <motion.h1
          className="text-3xl font-semibold text-gray-800 mb-8 text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {displayProductName}
        </motion.h1>

        {filteredProducts.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1, delay: 0.4 }}
          >
            {filteredProducts.map((product) => (
              <motion.div
                key={product._id}
                className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.02 }}
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">{product.uniqueId}</h3>
                  <div className="mb-2">
                    <span className="font-medium text-gray-700">Status:</span>{' '}
                    <span
                      className={`font-semibold ${
                        {
                          available: 'text-green-600',
                          'out on trek': 'text-yellow-600',
                          returned: 'text-blue-600',
                        }[product.status] || 'text-gray-600'
                      }`}
                    >
                      {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                    </span>
                  </div>
                  {product.capacity && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Capacity:</span> {product.capacity}
                    </p>
                  )}
                  {product.cylinderSize && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Cylinder Size:</span> {product.cylinderSize}
                    </p>
                  )}
                  {product.regulatorType && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Regulator Type:</span> {product.regulatorType}
                    </p>
                  )}
                  {product.assignedTo?.trekId && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Assigned to Trek:</span> {product.assignedTo.trekId}
                    </p>
                  )}
                  {product.assignedTo?.groupName && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Group:</span> {product.assignedTo.groupName}
                    </p>
                  )}
                  {product.assignedDate && (
                    <p className="text-gray-600 mb-1">
                      <span className="font-medium">Assigned Date:</span>{' '}
                      {new Date(product.assignedDate).toLocaleDateString()}
                    </p>
                  )}
                  {product.returnDate && (
                    <p className="text-gray-600 mb-3">
                      <span className="font-medium">Returned Date:</span> {new Date(product.returnDate).toLocaleDateString()}
                    </p>
                  )}
                  <div className="flex justify-end space-x-2">
                    <Link
                      href={`/admin/edit-product/${product._id}`}
                      className="inline-flex items-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      <FaEdit className="mr-2" /> Edit
                    </Link>
                    <button
                      onClick={() => handleDelete(product._id)}
                      className="inline-flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
                    >
                      <FaTrash className="mr-2" /> Delete
                    </button>
                  </div>

                  {deleteConfirmation === product._id && (
                    <motion.div
                      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.div
                        className="bg-white rounded-md shadow-lg p-6"
                        initial={{ scale: 0.8 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0.8 }}
                      >
                        <p className="text-lg text-gray-800 mb-4">Are you sure you want to delete {product.uniqueId}?</p>
                        <div className="flex justify-end space-x-2">
                          <button onClick={cancelDelete} className="px-4 py-2 text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none">
                            Cancel
                          </button>
                          <button onClick={() => confirmDelete(product._id)} className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600 focus:outline-none">
                            Delete
                          </button>
                        </div>
                      </motion.div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.p className="text-gray-700 text-lg mt-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }}>
            No products found for '{displayProductName}'.
          </motion.p>
        )}

        <motion.div className="mt-8" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
          <Link
            href="/admin/dashboard"
            className="inline-block bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-3 px-6 rounded-md focus:outline-none focus:shadow-outline transition duration-300"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductDetailPage;