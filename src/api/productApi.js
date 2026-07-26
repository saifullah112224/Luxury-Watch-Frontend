import axios from "axios";

const API = axios.create({
 baseURL: "https://luxury-watch-backend-production.up.railway.app/api",
});

// ===============================
// Get All Products
// ===============================
export const getProducts = () =>
  API.get("/products");

// ===============================
// Add Product
// ===============================
export const addProduct = (product) =>
  API.post("/products", product);

// ===============================
// Update Product
// ===============================
export const updateProduct = (id, product) =>
  API.put(`/products/${id}`, product);

// ===============================
// Delete Product
// ===============================
export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);