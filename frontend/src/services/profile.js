import axios from "axios";

const API_URL = "http://localhost:5000/api/profile";

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

export const updateProfile = async (profileData) => {
  try {
    const response = await axios.put(`${API_URL}`, profileData);

    if (response.data.user) {
      localStorage.setItem("user", JSON.stringify(response.data.user));
    }

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const changePassword = async (passwordData) => {
  try {
    const response = await axios.put(`${API_URL}/password`, passwordData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getProfile = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  updateProfile,
  changePassword,
  getProfile,
};
