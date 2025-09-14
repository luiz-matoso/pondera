import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCurrentUser } from "../../services/authentication";
import { useNavigate } from "react-router-dom";
import { AiFillLike } from "react-icons/ai";
import { AiFillDislike } from "react-icons/ai";
import { questionService } from "../../services/question";

const HomeQuestions = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const currentUser = getCurrentUser();

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      const data = await questionService.getQuestions();
      setQuestions(data);
    } catch (err) {
      setError("Failed to fetch questions");
      console.error("Error fetching questions:", err);
    } finally {
      setLoading(false);
    }
  };

  const openQuestion = (questionId) => {
    navigate(`/question/${questionId}`);
  };

  const handleDelete = async (questionId, e) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      await questionService.deleteQuestion(questionId, currentUser.id);
      fetchQuestions();
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("You can only delete your own questions");
    }
  };

  return (
    <div className="text-white">
      <h1 className="text-2xl font-bold mb-6">Questions • Home</h1>

      <div className="space-y-4">
        {questions.map((question) => (
          <div
            key={question.id}
            className="bg-neutral-900 p-4 rounded-lg cursor-pointer hover:bg-neutral-800 transition-colors"
            onClick={() => openQuestion(question.id)}
          >
            <h3 className="text-lg font-semibold">{question.title}</h3>
            <p className="text-gray-400 mt-1 text-sm">
              {question.content.substring(0, 100)}...
            </p>

            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center text-gray-400 text-sm">
                <span className="text-yellow-100">
                  {question.answer_count || 0} answers
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center text-green-300">
                  {question.likes || 0} <AiFillLike className="ml-1" />
                </span>
                <span className="mx-2">•</span>
                <span className="flex items-center text-red-300">
                  {question.dislikes || 0} <AiFillDislike className="ml-1" />
                </span>
              </div>
              <div className="text-gray-400 text-sm">
                <span>By {question.author_name}</span>
                <span className="mx-2">•</span>
                <span>
                  {new Date(question.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="mt-2">
              <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs">
                {question.category}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeQuestions;
