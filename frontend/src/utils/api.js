import axios from "axios";
import { getAuth } from "./auth";

const API_URL = `http://localhost:3000/api`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const { token } = getAuth();
  config.headers.tokens = token || null;
  return config;
});

export default api;
