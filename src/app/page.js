import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Navbar */}
      <nav className="bg-white shadow-md py-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-gray-800">
            Makalu Store
          </Link>
          <div>
            <Link href="/login" className="text-gray-700 hover:text-gray-900">
              Login
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-gradient-to-r from-blue-400 to-indigo-500 py-20 text-white text-center">
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-6">Welcome to Makalu Store</h1>
          <p className="text-xl mb-8">Your one-stop shop for quality products.</p>
          <button className="bg-white text-blue-600 font-semibold py-3 px-6 rounded-full hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400">
            Explore Products
          </button>
        </div>
      </header>

      {/* Featured Products Section (Example) */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example Product Card 1 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="https://via.placeholder.com/150" alt="Product 1" className="w-full h-32 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Awesome Gadget</h3>
              <p className="text-gray-500">$49.99</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                View Details
              </button>
            </div>

            {/* Example Product Card 2 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="https://via.placeholder.com/150" alt="Product 2" className="w-full h-32 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Stylish Item</h3>
              <p className="text-gray-500">$29.99</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                View Details
              </button>
            </div>

            {/* Example Product Card 3 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <img src="https://via.placeholder.com/150" alt="Product 3" className="w-full h-32 object-cover rounded-md mb-4" />
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Cool Accessory</h3>
              <p className="text-gray-500">$19.99</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-full mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
                View Details
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-200 py-8 text-center text-gray-600">
        <div className="container mx-auto">
          <p>&copy; {new Date().getFullYear()} Makalu Store. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}