import axios from "axios";

const API_BASE_URL = "http://localhost:8000"; 

// axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
});

// attach JWT token to request headers
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
