import axios from "axios";

const API = axios.create({
  baseURL: "https://luxury-watch-backend-production.up.railway.app/api",
});

export const getProducts = () =>
  API.get("/products");

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`);