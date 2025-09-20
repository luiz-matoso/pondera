import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { IoChevronBackCircleSharp } from "react-icons/io5";
import { AiFillDislike, AiFillLike } from "react-icons/ai";
import { questionService } from "../../services/question";
import { authService } from "./../../services/authentication";

const QuestionDetail = () => {
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [answerContent, setAnswerContent] = useState("");
  const [currentUser] = useState(authService.getCurrentUser());
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchQuestion();
  }, [id]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const data = await questionService.getQuestionById(id);
      setQuestion(data);
    } catch (err) {
      setQuestion(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLike = async () => {
    try {
      await questionService.likeQuestion(id);
      fetchQuestion();
    } catch (err) {}
  };

  const handleDislike = async () => {
    try {
      await questionService.dislikeQuestion(id);
      fetchQuestion();
    } catch (err) {}
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this question?"))
      return;

    try {
      await questionService.deleteQuestion(id, currentUser.id);
      navigate("/");
    } catch (err) {
      console.error("Error deleting question:", err);
      alert("You can only delete your own questions");
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();
    if (!answerContent.trim()) return;

    try {
      await questionService.addAnswer(id, {
        question_id: id,
        user_id: currentUser.id,
        content: answerContent,
      });

      setAnswerContent("");
      fetchQuestion();
    } catch (err) {
      console.error("Error submitting answer:", err);
    }
  };

  const goBack = () => {
    navigate("/");
  };

  if (!question) {
    return (
      <div className="text-white p-4 sm:p-6">
        <p>Question not found</p>
        <button
          onClick={goBack}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="text-white p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center mb-6">
        <button
          onClick={goBack}
          className="text-white bg-neutral-900 mb-4 sm:mb-0 sm:mr-4 cursor-pointer px-5 py-3 rounded flex gap-2 items-center transition-colors hover:bg-neutral-800"
        >
          <IoChevronBackCircleSharp className="text-white text-2xl" /> Back to
          Questions
        </button>
        <h1 className="text-2xl font-bold">Question Details</h1>
      </div>

      <div className="bg-neutral-900 p-6 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">{question.title}</h2>
        <p className="text-gray-300 mb-4">{question.content}</p>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 p-2 rounded-md ${
                question.userVote === "like"
                  ? "bg-green-500 text-white"
                  : "bg-neutral-800 text-green-300 hover:bg-neutral-700"
              } ${
                !currentUser
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={!currentUser}
              title={!currentUser ? "Login to like" : ""}
            >
              <AiFillLike />
              <span>{question.likes || 0}</span>
            </button>

            <button
              onClick={handleDislike}
              className={`flex items-center space-x-1 p-2 rounded-md ${
                question.userVote === "dislike"
                  ? "bg-red-500 text-white"
                  : "bg-neutral-800 text-red-300 hover:bg-neutral-700"
              } ${
                !currentUser
                  ? "opacity-50 cursor-not-allowed"
                  : "cursor-pointer"
              }`}
              disabled={!currentUser}
              title={!currentUser ? "Login to dislike" : ""}
            >
              <AiFillDislike />
              <span>{question.dislikes || 0}</span>
            </button>
          </div>

          <div className="text-gray-400 text-sm">
            <span>By {question.author_name}</span>
            <span className="mx-2 hidden sm:inline">•</span>
            <span className="block sm:inline">
              {new Date(question.created_at).toLocaleDateString()}
            </span>
            <span className="bg-blue-500 text-white px-2 py-1 rounded text-xs mt-2 sm:mt-0 sm:ml-2 inline-block sm:inline">
              {question.category}
            </span>
          </div>
        </div>

        {currentUser && currentUser.id === question.user_id && (
          <div className="mt-4">
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600"
            >
              Delete Question
            </button>
          </div>
        )}
      </div>

      {/* Respostas */}
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">
          Answers ({question.answers ? question.answers.length : 0})
        </h3>

        {question.answers && question.answers.length > 0 ? (
          question.answers.map((answer) => (
            <div key={answer.id} className="bg-neutral-800 p-4 rounded-lg mb-3">
              <p className="text-gray-300">{answer.content}</p>
              <div className="text-gray-400 text-sm mt-2">
                By {answer.author_name} •{" "}
                {new Date(answer.created_at).toLocaleDateString()}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400">
            No answers yet. Be the first to answer!
          </p>
        )}
      </div>

      {/* Form das respostas*/}
      {currentUser && (
        <form
          onSubmit={handleAnswerSubmit}
          className="bg-neutral-900 p-6 rounded-lg"
        >
          <h4 className="text-lg font-semibold mb-4">Your Answer</h4>
          <textarea
            value={answerContent}
            onChange={(e) => setAnswerContent(e.target.value)}
            placeholder="Write your answer here..."
            className="w-full bg-neutral-800 text-white p-3 rounded-lg resize-none border border-neutral-700 focus:border-blue-500 focus:outline-none"
            rows="6"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4 hover:bg-blue-600 transition-colors cursor-pointer"
          >
            Post Answer
          </button>
        </form>
      )}
    </div>
  );
};

export default QuestionDetail;
