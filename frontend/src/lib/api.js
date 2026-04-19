import axios from "axios";

// Use relative /api paths so Vite can proxy requests to the backend in local
// development and through the frontend devtunnel as well.
export const API_BASE_URL = "";

const api = axios.create({
  baseURL: API_BASE_URL
});

export const buildApiUrl = (path) => `${API_BASE_URL}${path}`;

export default api;
