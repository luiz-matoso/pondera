// services/question.js
import axios from "axios";
import { toast } from "react-toastify";

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
      const response = await axios.get(API_URL, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to fetch questions");
    }
  },

  getQuestionById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`, {
        headers: getAuthHeaders(),
      });
      return response.data;
    } catch (error) {
      return handleError(error, "Question not found");
    }
  },

  createQuestion: async (questionData) => {
    try {
      const response = await axios.post(API_URL, questionData, {
        headers: getAuthHeaders(),
      });
      toast.success("Question created successfully!");
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to create question");
    }
  },

  likeQuestion: async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/${id}/like`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );
      toast.success("Question liked!");
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to like question");
    }
  },

  dislikeQuestion: async (id) => {
    try {
      const response = await axios.post(
        `${API_URL}/${id}/dislike`,
        {},
        {
          headers: getAuthHeaders(),
        }
      );
      toast.success("Question disliked!");
      return response.data;
    } catch (error) {
      return handleError(error, "Failed to dislike question");
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
