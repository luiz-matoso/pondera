import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/auth";

const handleError = (error, defaultMessage = "An error occurred") => {
  const message =
    error.response?.data?.error || error.message || defaultMessage;
  toast.error(message);
  throw new Error(message);
};

export const authService = {
  registerUser: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to create account");
    }
  },

  loginUser: async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/login`, formData, {
        validateStatus: function (status) {
          return true;
        },
      });

      if (response.status >= 200 && response.status < 300) {
        if (response.data.token) {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("user", JSON.stringify(response.data.user));
        }
        return response.data;
      } else {
        throw {
          response: {
            data: response.data,
          },
        };
      }
    } catch (error) {
      return handleError(error, "Login failed");
    }
  },

  logoutUser: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.info("Logged out successfully");
    window.location.href = "/login";
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getCurrentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
