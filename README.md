# Shoe Shop E-commerce Application

## Overview
This is a React-based e-commerce application for a shoe store. It features product browsing, cart functionality, wishlist, and checkout process. The application now uses MongoDB for data storage.

## Features
- Product catalog with images and details
- Shopping cart functionality
- Wishlist for saving favorite items
- Checkout process
- MongoDB integration for product data storage

## MongoDB Integration
The application now uses MongoDB to store product data instead of hardcoded arrays. This provides several benefits:
- Persistent data storage
- Ability to add, update, and delete products
- Scalable database solution

## Setup Instructions

### Prerequisites
- Node.js and npm installed
- MongoDB installed locally or a MongoDB Atlas account

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Configure MongoDB:
   - Update the `.env` file with your MongoDB connection string
   - For local MongoDB: `MONGODB_URI=mongodb://localhost:27017/shoe-shop`
   - For MongoDB Atlas: `MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shoe-shop`

4. Start the application:
   ```
   npm start
   ```

### Database Initialization
The application will automatically seed the initial product data to MongoDB when it first runs if the database is empty.

## API Functions
The following functions are available for interacting with the product data:

- `seedProducts()`: Seeds initial product data to MongoDB if the collection is empty
- `getProducts()`: Retrieves all products from the database
- `getProductById(id)`: Retrieves a single product by its ID
- `addProduct(productData)`: Adds a new product to the database
- `updateProduct(id, productData)`: Updates an existing product
- `deleteProduct(id)`: Deletes a product from the database

## Technologies Used
- React
- MongoDB
- Mongoose
- Tailwind CSS
- dotenv for environment variables