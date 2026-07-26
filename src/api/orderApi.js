import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const placeOrder = (data) =>
  API.post("/orders", data);

export const getUserOrders = (userId) =>
  API.get(`/orders/${userId}`);

// ===============================
// Admin APIs
// ===============================

export const getAllOrders = () =>
  API.get("/orders");

export const updateOrder = (id, data) =>
  API.put(`/orders/${id}`, data);

export const deleteOrder = (id) =>
  API.delete(`/orders/${id}`);