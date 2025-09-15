import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://localhost:5000/api/profile";

const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const handleError = (error, defaultMessage = "An error occurred") => {
  const message =
    error.response?.data?.error || error.message || defaultMessage;
  toast.error(message);
  throw new Error(message);
};

export const profileService = {
  updateProfile: async (profileData) => {
    try {
      const response = await axios.put(`${API_URL}`, profileData, {
        headers: getAuthHeaders(),
      });

      if (response.data.user) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      return handleError(error, "Failed to update profile");
    }
  },

  changePassword: async (passwordData) => {
    try {
      const response = await axios.put(`${API_URL}/password`, passwordData, {
        headers: getAuthHeaders(),
      });
      toast.success("Password changed successfully!");
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to change password");
    }
  },

  getProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to fetch profile");
    }
  },
};
