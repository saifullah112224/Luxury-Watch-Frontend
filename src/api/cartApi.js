import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Get User Cart
export const getCart = (user_id) =>
  API.get("/cart", {
    params: {
      user_id,
    },
  });

// Add Product to Cart
export const addToCart = (product, user_id) =>
  API.post("/cart", {
    product_id: product.id,
    product_name: product.name,
    user_id,
  });

// Increase Quantity
export const increaseQuantity = (id) =>
  API.put(`/cart/increase/${id}`);

// Decrease Quantity
export const decreaseQuantity = (id) =>
  API.put(`/cart/decrease/${id}`);

// Remove Item
export const removeCartItem = (id) =>
  API.delete(`/cart/${id}`);