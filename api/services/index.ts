// api/services/index.ts
import axios, { type AxiosInstance } from "axios";

const api: AxiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ✅ Good practice: prevent hanging requests
});

// ✅ Optional: lightweight error logging interceptor (no auth logic)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (__DEV__) {
      if (error?.response) {
        // Server responded with a non-2xx status
        console.warn("[API Error] HTTP", error.response.status, error.config?.url);
      } else if (error?.request) {
        // Request was made but no response received (timeout / no internet)
        console.warn("[API Error] No response (network/timeout):", error.config?.url, error.message);
      } else {
        // Something went wrong building the request
        console.warn("[API Error] Request setup failed:", error.message);
      }
    }
    return Promise.reject(error);
  },
);

export default api;
