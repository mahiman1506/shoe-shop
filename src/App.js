import React, { useState, useEffect } from "react";

// Import components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import CartPage from "./components/CartPage";
import ContactPage from "./components/ContactPage";
import PaymentPage from "./components/PaymentPage";
import WishlistPage from "./components/WishlistPage"; // Import WishlistPage

// Import utilities
import {
  renderStars,
  getTotalItems,
  getTotalPrice,
  calculateShippingCost,
  calculateTotalPrice,
} from "./utils/cartUtils";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]); // Add wishlist state
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch from MongoDB API
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products", {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      console.error("Error loading products:", err);
      setError(
        "Failed to load products. Please make sure the server is running.",
      );
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const addToCart = (product) => {
    const existingItem = cart.find((item) => item._id === product._id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        ),
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  // Add to wishlist function
  const addToWishlist = (product) => {
    setWishlist((prevWishlist) => {
      if (prevWishlist.find((item) => item._id === product._id)) {
        return prevWishlist; // Already in wishlist
      }
      return [...prevWishlist, product];
    });
  };

  const removeFromWishlist = (productId) => {
    setWishlist(wishlist.filter((item) => item._id !== productId));
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter((item) => item._id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
    } else if (newQuantity > 10) {
      // Add check for maximum quantity
      setCart(
        cart.map((item) =>
          item._id === productId
            ? { ...item, quantity: 10 } // Set to 10 if newQuantity exceeds max
            : item,
        ),
      );
    } else {
      setCart(
        cart.map((item) =>
          item._id === productId ? { ...item, quantity: newQuantity } : item,
        ),
      );
    }
  };

  const handlePayment = () => {
    setPaymentSuccess(true);
    setCart([]); // Empty cart after successful payment
    setTimeout(() => {
      setPaymentSuccess(false);
      setCurrentPage("home");
    }, 3000);
  };

  // Calculate shipping and total price
  const shippingCost = calculateShippingCost(cart);
  const totalPrice = calculateTotalPrice(cart);

  return (
    <div className="min-h-screen">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        getTotalItems={() => getTotalItems(cart)}
        wishlistCount={wishlist.length} // Pass wishlist length as wishlistCount
      />
      {currentPage === "home" && (
        <HomePage
          products={products}
          addToCart={addToCart}
          renderStars={renderStars}
          addToWishlist={addToWishlist}
          wishlist={wishlist}
          removeFromWishlist={removeFromWishlist}
          loading={loading}
          error={error}
          onRefresh={fetchProducts}
        />
      )}
      {currentPage === "cart" && (
        <CartPage
          cart={cart}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
          getTotalPrice={() => getTotalPrice(cart)}
          shippingCost={shippingCost}
          totalPrice={totalPrice}
          setCurrentPage={setCurrentPage}
        />
      )}
      {currentPage === "contact" && <ContactPage />}
      {currentPage === "payment" && (
        <PaymentPage
          paymentSuccess={paymentSuccess}
          cart={cart}
          getTotalPrice={() => getTotalPrice(cart)}
          shippingCost={shippingCost}
          totalPrice={totalPrice}
          handlePayment={handlePayment}
        />
      )}
      {currentPage === "wishlist" && ( // Add WishlistPage rendering
        <WishlistPage
          wishlist={wishlist}
          removeFromWishlist={removeFromWishlist}
          setCurrentPage={setCurrentPage}
          addToCart={addToCart} // Pass addToCart to WishlistPage
        />
      )}
    </div>
  );
};

export default App;
