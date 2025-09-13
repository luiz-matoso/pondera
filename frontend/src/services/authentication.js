import axios from "axios";

const API_URL = "http://localhost:5000/api/auth";

export const registerUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, formData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
