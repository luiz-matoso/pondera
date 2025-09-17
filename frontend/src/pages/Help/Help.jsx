import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { FaQuestionCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const Help = () => {
  return (
    <div className="p-8">
      <header className="bg-neutral-900 border-t border-neutral-700 px-6 py-4 rounded-lg mb-6">
        <nav className="flex space-x-6">
          <Link
            to="/help"
            className="text-white border-b-2 border-blue-500 pb-2 font-medium"
          >
            Help
          </Link>
        </nav>
      </header>

      <main className="mt-4">
        <div className="bg-neutral-900 border-t border-neutral-700 rounded-xl p-6 lg:p-8">
          <h2 className="text-xl font-semibold flex items-center text-white">
            <FaQuestionCircle className="mr-2" /> F.A.Q
          </h2>
          <p className="text-gray-400 mt-2">Frequently Asked Questions</p>

          <p className="text-xl mt-6 text-white">Q: What is Pondera?</p>
          <p className="text-xl text-gray-300">
            A: Pondera is an online community where you can ask questions and
            share your knowledge. It's a space to learn, teach, and connect with
            other people who have the same questions or expertise as you.
          </p>

          <p className="text-xl mt-6 text-white">
            Q: How can I ask a question?
          </p>
          <p className="text-xl text-gray-300">
            A: It's easy! Just click the "Ask a Question" button or a similar
            option, type your question clearly and concisely, and add tags to
            categorize it if you wish. Your question will then be published for
            the community to answer.
          </p>

          <p className="text-xl mt-6 text-white">
            Q: Do I need an account to ask or answer a question?
          </p>
          <p className="text-xl text-gray-300">
            A: Yes, you need an account to participate. Creating an account
            helps us maintain the quality and security of our community. The
            registration process is quick and simple.
          </p>

          <p className="text-xl mt-6 text-white">
            Q: How do I answer a question?
          </p>
          <p className="text-xl text-gray-300">
            A: You can answer any question that has an "Answer" button below it.
            Please provide thorough and helpful responses based on your
            knowledge or experience.
          </p>

          <p className="text-xl mt-6 text-white">
            Q: What are the community rules?
          </p>
          <p className="text-xl text-gray-300">
            A: You can answer any question that has an "Answer" button below it.
            Please provide thorough and helpful responses based on your
            knowledge or experience.
          </p>

          <p className="text-xl mt-6 text-white">
            Q: What kind of questions should I ask?
          </p>
          <p className="text-xl text-gray-300">
            A: Clear and specific questions tend to receive the best answers.
            Please avoid questions that are vague, offensive, or violate our
            guidelines. Remember to search if your question has been asked
            before!
          </p>
        </div>
      </main>
    </div>
  );
};

export default Help;
