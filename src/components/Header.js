import React from 'react';
import { ShoppingCart, Heart, Home, Phone } from 'lucide-react'; // Add Home and Phone icons

const Header = ({ currentPage, setCurrentPage, getTotalItems, wishlistCount }) => ( 
  <header className="bg-white shadow-lg sticky top-0 z-50">
    <div className="container mx-auto px-4 py-4 flex justify-between items-center">
      <div className="text-2xl font-bold text-blue-600 cursor-pointer" 
           onClick={() => setCurrentPage('home')}>
        ShoeStore
      </div>
      <nav className="hidden md:flex space-x-8">
        <button 
          onClick={() => setCurrentPage('home')} 
          className={`hover:text-blue-600 transition flex items-center gap-2 ${currentPage === 'home' ? 'text-blue-600 font-semibold' : ''}`}> {/* Added flex items-center gap-2 */}
          <Home size={20} />
          Home
        </button>
        <button 
          onClick={() => setCurrentPage('cart')} 
          className={`hover:text-blue-600 transition flex items-center gap-2 ${currentPage === 'cart' ? 'text-blue-600 font-semibold' : ''}`}>
          <ShoppingCart size={20} />
          Cart ({getTotalItems()})
        </button>
        <button 
          onClick={() => setCurrentPage('contact')} 
          className={`hover:text-blue-600 transition flex items-center gap-2 ${currentPage === 'contact' ? 'text-blue-600 font-semibold' : ''}`}> {/* Added flex items-center gap-2 */}
          <Phone size={20} />
          Contact
        </button>
        <button 
          onClick={() => setCurrentPage('wishlist')} 
          className={`hover:text-blue-600 transition flex items-center gap-2 ${currentPage === 'wishlist' ? 'text-blue-600 font-semibold' : ''}`}>
          <Heart size={20} /> {/* Add Heart icon */}
          Wishlist ({wishlistCount}) {/* Add wishlist count */}
        </button>
      </nav>
      <div className="md:hidden">
        <button 
          onClick={() => setCurrentPage('cart')} 
          className="relative">
          <ShoppingCart size={24} />
          {getTotalItems() > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
              {getTotalItems()}
            </span>
          )}
        </button>
      </div>
    </div>
  </header>
);

export default Header;