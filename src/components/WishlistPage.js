import React from 'react';
import { X, ShoppingCart } from 'lucide-react'; // Import ShoppingCart

const WishlistPage = ({ wishlist, removeFromWishlist, setCurrentPage, addToCart }) => { // Add addToCart prop
  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-semibold mb-4">Your Wishlist is Empty</h2>
        <p className="text-gray-600 mb-8">Looks like you haven't added anything to your wishlist yet.</p>
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Your Wishlist</h2>
      <div className="bg-white shadow-lg rounded-lg p-6">
        {wishlist.map(item => (
          <div key={item._id} className="flex items-center justify-between border-b py-4">
            <div className="flex items-center">
              <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded mr-4" />
              <div>
                <h3 className="text-lg font-semibold">{item.name}</h3>
                <p className="text-gray-600">${item.price}</p>
              </div>
            </div>
            <div className="flex items-center gap-4"> {/* Added a div to group buttons */}
              <button 
                onClick={() => {
                  addToCart(item); 
                  removeFromWishlist(item._id); 
                }}
                className="bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition flex items-center gap-2 text-sm"
              >
                <ShoppingCart size={16} />
                Add to Cart
              </button>
              <button 
                onClick={() => removeFromWishlist(item._id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <X size={24} />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <button 
          onClick={() => setCurrentPage('home')}
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full hover:bg-gray-300 transition mr-4"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default WishlistPage;