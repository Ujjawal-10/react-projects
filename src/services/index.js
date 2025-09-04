import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_URL;
console.log("Base URL:", baseURL);

const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Response error:", error);
    return Promise.reject(error);
  }
);

export default api;
