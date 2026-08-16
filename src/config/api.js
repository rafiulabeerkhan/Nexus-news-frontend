import axios from "axios";
import { logoutUser } from "../utils/logoutUser";
import showToast from "../utils/toast";

const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
const IS_DEMO_MODE = true; // Set to true to prevent data modification on the live portfolio

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

let refreshPromise = null;

api.interceptors.request.use(
  (config) => {
    // --- DEMO MODE PROTECTION ---
    if (IS_DEMO_MODE) {
      const method = config.method?.toUpperCase();
      const url = config.url || "";
      // Allow login requests to pass through so recruiters can see the dashboard
      const isLoginRequest = url.includes("/api/auth/login");
      
      if (!isLoginRequest && ["POST", "PUT", "PATCH", "DELETE"].includes(method)) {
        // Reject the request with a friendly error message that the components will display as a single toast
        return Promise.reject(new Error("Demo Mode is enabled. Modifications are not allowed on this portfolio site."));
      }
    }
    // -----------------------------

    config.headers["X-Client-Type"] = "web";

    if (!config.headers?.Authorization) {
      const token = localStorage.getItem(ACCESS_TOKEN_KEY);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => Promise.reject(error),
);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    try {
      if (!refreshPromise) {
        refreshPromise = axios
          .post(`${import.meta.env.VITE_API_URL}/api/auth/refresh`, {}, { withCredentials: true })
          .then((res) => {
            const newAccessToken = res.data[ACCESS_TOKEN_KEY];

            if (!newAccessToken) {
              throw new Error("No access token returned from refresh endpoint");
            }

            localStorage.setItem(ACCESS_TOKEN_KEY, newAccessToken);

            api.defaults.headers.common.Authorization = `Bearer ${newAccessToken}`;

            return newAccessToken;
          })
          .finally(() => {
            refreshPromise = null;
          });
      }

      const newAccessToken = await refreshPromise;

      originalRequest.headers = {
        ...originalRequest.headers,
        Authorization: `Bearer ${newAccessToken}`,
      };

      return api(originalRequest);
    } catch (refreshError) {
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      await logoutUser();
      return Promise.reject(refreshError);
    }
  },
);

export default api;
