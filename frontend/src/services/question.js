import axios from "axios";
import { toast } from "react-toastify";
import { getCurrentUser } from "./authentication";

const API_URL = "http://localhost:5000/api/questions";

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

export const questionService = {
  getQuestions: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to fetch questions";
      toast.error(message);
      throw new Error(message);
    }
  },

  getQuestionById: async (id) => {
    try {
      const user = getCurrentUser();
      const params = user ? { user_id: user.id } : {};

      const response = await axios.get(`${API_URL}/${id}`, { params });
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || "Question not found";
      toast.error(message);
      throw new Error(message);
    }
  },

  createQuestion: async (questionData) => {
    try {
      const response = await axios.post(API_URL, questionData, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to create question");
    }
  },

  likeQuestion: async (id) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error("Please login to like questions");
      }

      const response = await axios.post(`${API_URL}/${id}/like`, {
        user_id: user.id,
      });

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.error || "Failed to like question";
      toast.error(message);
      throw new Error(message);
    }
  },

  dislikeQuestion: async (id) => {
    try {
      const user = getCurrentUser();
      if (!user) {
        throw new Error("Please login to dislike questions");
      }

      const response = await axios.post(`${API_URL}/${id}/dislike`, {
        user_id: user.id,
      });

      toast.success(response.data.message);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.error || "Failed to dislike question";
      toast.error(message);
      throw new Error(message);
    }
  },

  deleteQuestion: async (id, user_id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`, {
        data: { user_id },
        headers: getAuthHeaders(),
      });
      toast.success("Question deleted successfully!");
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to delete question");
    }
  },

  addAnswer: async (questionId, answerData) => {
    try {
      const response = await axios.post(
        `${API_URL}/${questionId}/answers`,
        answerData,
        {
          headers: getAuthHeaders(),
        }
      );
      toast.success("Answer posted successfully!");
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to post answer");
    }
  },
};
