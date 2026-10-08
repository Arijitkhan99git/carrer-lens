// api/services/index.ts
import axios, { type AxiosInstance } from "axios";
import { BASE_URL } from "../url";

const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000, // ✅ Good practice: prevent hanging requests
});

// ✅ Optional: lightweight error logging interceptor (no auth logic)
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Log in dev, surface clean error to callers
    if (__DEV__) {
      console.warn("[API Error]", error?.response?.status, error?.config?.url);
    }
    return Promise.reject(error);
  },
);

export default api;
