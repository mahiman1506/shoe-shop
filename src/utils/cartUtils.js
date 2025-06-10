import React from 'react';
import { Star } from 'lucide-react';

// Utility function to render star ratings
export const renderStars = (rating) => {
  return [...Array(5)].map((_, i) => (
    <Star 
      key={i} 
      size={16} 
      className={i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'} 
    />
  ));
};

// Utility function to calculate total price
export const getTotalPrice = (cart) => {
  return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
};

// Utility function to calculate total items
export const getTotalItems = (cart) => {
  return cart.reduce((total, item) => total + item.quantity, 0);
};

// Utility function to calculate shipping cost
export const calculateShippingCost = (cart) => {
  return cart.length <= 2 ? 4.99 : 0;
};

// Utility function to calculate total price with shipping
export const calculateTotalPrice = (cart) => {
  const subtotal = getTotalPrice(cart);
  const shipping = calculateShippingCost(cart);
  return subtotal + shipping;
};