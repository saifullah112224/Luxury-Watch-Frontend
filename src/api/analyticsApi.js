import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// ===============================
// Get Analytics
// ===============================
export const getAnalytics = () =>
  API.get("/analytics");