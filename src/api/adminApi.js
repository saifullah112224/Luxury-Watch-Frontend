import axios from "axios";

const API = axios.create({
  baseURL: "https://luxury-watch-backend-production.up.railway.app/api",
});

export const getDashboard = () =>
  API.get("/admin/dashboard");