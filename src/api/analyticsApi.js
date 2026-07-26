import axios from "axios";

const API = axios.create({
  baseURL: "https://luxury-watch-backend-production.up.railway.app/api",
});

// ===============================
// Get Analytics
// ===============================
export const getAnalytics = () =>
  API.get("/analytics");