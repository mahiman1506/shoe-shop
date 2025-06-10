import React from 'react';
import { Heart, Star, ShoppingCart, RefreshCw } from 'lucide-react';

const HomePage = ({ products, addToCart, renderStars, addToWishlist, wishlist, removeFromWishlist, loading, error, onRefresh }) => {
  const isInWishlist = (productId) => wishlist.some(item => item._id === productId);

  return (
  <div className="min-h-screen bg-gray-50">
    {/* Hero Section */}
    <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Step Into Style</h1>
        <p className="text-xl mb-8">Discover the perfect shoes for every occasion</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
          Shop Now
        </button>
      </div>
    </section>

    {/* Products Section */}
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-3xl font-bold">Featured Products</h2>
          <button 
            onClick={onRefresh}
            disabled={loading}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin' : ''} />
            {loading ? 'Refreshing...' : 'Refresh Products'}
          </button>
        </div>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
            <button 
              onClick={onRefresh}
              className="ml-4 underline text-blue-600 hover:text-blue-800"
            >
              Try Again
            </button>
          </div>
        )}
        
        {loading && !error ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw size={40} className="animate-spin text-blue-600" />
            <p className="ml-4 text-lg">Loading products...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition group">
              <div className="relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
                <button 
                  onClick={() => isInWishlist(product._id) ? removeFromWishlist(product._id) : addToWishlist(product)}
                  className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
                >
                  <Heart size={20} className={`${isInWishlist(product._id) ? 'text-red-500 fill-red-500' : 'text-gray-600 hover:text-red-500'}`}  />
                </button>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-3">{product.description}</p>
                <div className="flex items-center mb-3">
                  {renderStars(product.rating)}
                  <span className="ml-2 text-sm text-gray-600">({product.rating})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">${product.price}</span>
                  <button 
                    onClick={() => addToCart(product)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition flex items-center gap-2">
                    <ShoppingCart size={16} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </section>
  </div>
)};

export default HomePage;