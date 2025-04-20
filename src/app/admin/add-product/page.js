'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const AddProductPage = () => {
    const [productType, setProductType] = useState('');
    const [uniqueId, setUniqueId] = useState('');
    const [capacity, setCapacity] = useState('');
    const [cylinderSize, setCylinderSize] = useState('');
    const [regulatorType, setRegulatorType] = useState('');
    const [name, setName] = useState('');  // Added for radio-set
    const [model, setModel] = useState(''); // Added for radio-set
    const [modelNo, setModelNo] = useState(''); // Added for radio-set
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        const newProduct = {
            productType,
            uniqueId,
            ...(productType === 'tent' && capacity ? { capacity: parseInt(capacity) } : {}),
            ...(productType === 'box-tent' && capacity ? { capacity: parseInt(capacity) } : {}),
            ...(productType === 'dining-tent' && capacity ? { capacity: parseInt(capacity) } : {}),
            ...(productType === 'oxygen' && cylinderSize ? { cylinderSize } : {}),
            ...(productType === 'oxygen' && regulatorType ? { regulatorType } : {}),
            // Add radio-set specific fields
            ...(productType === 'radio-set' && name ? { name } : {}),
            ...(productType === 'radio-set' && model ? { model } : {}),
            ...(productType === 'radio-set' && modelNo ? { modelNo } : {}),
        };

        try {
            const response = await fetch('/api/admin/add-product', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newProduct),
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage('Product added successfully!');
                setTimeout(() => {
                    router.push('/admin/dashboard');
                }, 1500);
            } else {
                setError(data.message || 'Failed to add product.');
            }
        } catch (error) {
            console.error('Error adding product:', error);
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto bg-white shadow-md rounded-md p-6">
                <h1 className="text-2xl font-semibold text-gray-800 mb-4">Add New Product</h1>
                {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">{error}</div>}
                {successMessage && <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">{successMessage}</div>}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="productType" className="block text-gray-700 text-sm font-bold mb-2">Product Type:</label>
                        <select
                            id="productType"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={productType}
                            onChange={(e) => setProductType(e.target.value)}
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="tent">Tent</option>
                            <option value="box-tent">Box Tent</option>
                            <option value="dining-tent">Dining Tent</option>
                            <option value="kitchen-tent">Kitchen Tent</option>
                            <option value="shower-tent">Shower Tent</option>
                            <option value="toilet-tent">Toilet Tent</option>
                            <option value="chair">Chair</option>
                            <option value="table">Table</option>
                            <option value="oxygen">Oxygen</option>
                            <option value="max-and-regulator">Max and Regulator</option>
                            <option value="radio-set">Radio Set</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="uniqueId" className="block text-gray-700 text-sm font-bold mb-2">Unique ID:</label>
                        <input
                            type="text"
                            id="uniqueId"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={uniqueId}
                            onChange={(e) => setUniqueId(e.target.value)}
                            required
                        />
                    </div>
                    {/* Conditional rendering for product-specific fields */}
                    {productType === 'tent' || productType === 'box-tent' || productType === 'dining-tent' ? (
                        <div>
                            <label htmlFor="capacity" className="block text-gray-700 text-sm font-bold mb-2">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                value={capacity}
                                onChange={(e) => setCapacity(e.target.value)}
                            />
                        </div>
                    ) : null}

                    {productType === 'oxygen' ? (
                        <>
                            <div>
                                <label htmlFor="cylinderSize" className="block text-gray-700 text-sm font-bold mb-2">Cylinder Size:</label>
                                <input
                                    type="text"
                                    id="cylinderSize"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={cylinderSize}
                                    onChange={(e) => setCylinderSize(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="regulatorType" className="block text-gray-700 text-sm font-bold mb-2">Regulator Type:</label>
                                <input
                                    type="text"
                                    id="regulatorType"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={regulatorType}
                                    onChange={(e) => setRegulatorType(e.target.value)}
                                />
                            </div>
                        </>
                    ) : null}

                    {productType === 'radio-set' ? (
                        <>
                            <div>
                                <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Name:</label>
                                <input
                                    type="text"
                                    id="name"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="model" className="block text-gray-700 text-sm font-bold mb-2">Model:</label>
                                <input
                                    type="text"
                                    id="model"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={model}
                                    onChange={(e) => setModel(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="modelNo" className="block text-gray-700 text-sm font-bold mb-2">Model No:</label>
                                <input
                                    type="text"
                                    id="modelNo"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={modelNo}
                                    onChange={(e) => setModelNo(e.target.value)}
                                />
                            </div>
                        </>
                    ) : null}

                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full">Add Product</button>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;
