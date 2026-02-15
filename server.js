// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// // MongoDB Connection (COMMENTED OUT)
// const mongoURI = process.env.MONGODB_URI;
// mongoose
//   .connect(mongoURI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB connected ✅"))
//   .catch((err) => console.error("MongoDB connection error:", err));

// // Product Schema (COMMENTED OUT)
// const productSchema = new mongoose.Schema({
//   name: String,
//   price: Number,
//   image: String,
//   rating: Number,
//   description: String,
// });

// const Product = mongoose.model("Product", productSchema);

// API Routes
app.get("/", (req, res) => {
  res.send("Server running ✅");
});

// // Get all products from MongoDB (COMMENTED OUT)
// app.get("/api/products", async (req, res) => {
//   try {
//     const products = await Product.find();
//     if (products.length === 0) {
//       return res.status(200).json([]);
//     }
//     res.status(200).json(products);
//   } catch (err) {
//     console.error("Error fetching products:", err);
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

// // Add a new product (COMMENTED OUT)
// app.post("/api/products", async (req, res) => {
//   try {
//     const { name, price, image, rating, description } = req.body;
//     const newProduct = new Product({
//       name,
//       price,
//       image,
//       rating,
//       description,
//     });
//     await newProduct.save();
//     res.status(201).json(newProduct);
//   } catch (err) {
//     console.error("Error creating product:", err);
//     res.status(500).json({ error: "Failed to create product" });
//   }
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
