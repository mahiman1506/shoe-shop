import React, { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';

const PaymentPage = ({ 
  paymentSuccess, 
  cart, 
  getTotalPrice, 
  shippingCost, 
  totalPrice, 
  handlePayment 
}) => {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Payment</h1>

          {paymentSuccess ? (
            <div className="bg-white rounded-lg shadow-lg p-8 text-center">
              <Check size={64} className="mx-auto text-green-500 mb-4" />
              <h2 className="text-2xl font-semibold text-green-600 mb-4">Payment Successful!</h2>
              <p className="text-gray-600 mb-4">Thank you for your purchase. Your order has been confirmed.</p>
              <p className="text-sm text-gray-500">Redirecting to home page...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-lg p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard size={24} className="text-blue-600" />
                    <h2 className="text-xl font-semibold">Payment Information</h2>
                  </div>

                  {/* Payment Method Selector */}
                  <div className="mb-4">
                    <label className="block font-medium text-gray-700 mb-2">Select Payment Method:</label>
                    <div className="space-x-4">
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={paymentMethod === "card"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Card
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={paymentMethod === "upi"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        UPI
                      </label>
                      <label>
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="netbanking"
                          checked={paymentMethod === "netbanking"}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="mr-2"
                        />
                        Net Banking
                      </label>
                    </div>
                  </div>

                  <form>
                    {paymentMethod === "card" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input type="text" placeholder="1234 5678 9012 3456" required className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input type="text" placeholder="MM/YY" required className="w-full px-4 py-2 border rounded-lg" />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input type="text" placeholder="123" required className="w-full px-4 py-2 border rounded-lg" />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                          <input type="text" placeholder="John Doe" required className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address</label>
                          <input type="text" placeholder="123 Main Street, City, State, ZIP" required className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "upi" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">UPI ID</label>
                          <input type="text" placeholder="yourname@upi" required className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                      </div>
                    )}

                    {paymentMethod === "netbanking" && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
                          <select className="w-full px-4 py-2 border rounded-lg" required>
                            <option value="">Select a bank</option>
                            <option value="sbi">State Bank of India</option>
                            <option value="hdfc">HDFC Bank</option>
                            <option value="icici">ICICI Bank</option>
                            <option value="axis">Axis Bank</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Account Holder Name</label>
                          <input type="text" required className="w-full px-4 py-2 border rounded-lg" />
                        </div>
                      </div>
                    )}
                  </form>
                </div>
              </div>

              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <div className="space-y-3 mb-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <img src={item.image} alt={item.name} className="w-8 h-8 object-cover rounded" />
                          <span className="text-sm">{item.name} x{item.quantity}</span>
                        </div>
                        <span className="text-sm">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${getTotalPrice().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-semibold text-lg">
                      <span>Total:</span>
                      <span>${totalPrice.toFixed(2)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayment}
                    className="w-full bg-green-600 text-white py-3 rounded-full hover:bg-green-700 transition mt-6">
                    Complete Payment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;