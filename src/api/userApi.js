import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===============================
// Get All Users
// ===============================
export const getUsers = () =>
  API.get("/users");

// ===============================
// Update User Role
// ===============================
export const updateUserRole = (id, role) =>
  API.put(`/users/${id}`, { role });

// ===============================
// Delete User
// ===============================
export const deleteUser = (id) =>
  API.delete(`/users/${id}`);