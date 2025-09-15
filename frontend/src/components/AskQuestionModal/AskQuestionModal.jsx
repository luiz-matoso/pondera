import { useState, useEffect } from "react";
import { FaTimes, FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { questionService } from "../../services/question";
import { getCurrentUser } from "../../services/authentication";

const AskQuestionModal = ({ isOpen, onClose, onQuestionCreated }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await questionService.getCategories();
        setCategories(categoriesData);

        if (categoriesData.length > 0 && !formData.category) {
          setFormData((prev) => ({
            ...prev,
            category: categoriesData[0].id.toString(),
          }));
        }
      } catch (error) {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    setIsSubmitting(true);

    try {
      const user = getCurrentUser();
      if (!user) {
        toast.error("Please login to ask a question");
        return;
      }

      if (
        !formData.title.trim() ||
        !formData.content.trim() ||
        !formData.category
      ) {
        toast.error("Please fill in all required fields");
        return;
      }

      const selectedCategory = categories.find(
        (cat) => cat.id.toString() === formData.category
      );

      const questionData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        category: selectedCategory ? selectedCategory.name : formData.category,
        user_id: user.id,
      };

      const result = await questionService.createQuestion(questionData);

      if (result) {
        toast.success("Question created successfully!");
        setFormData({
          title: "",
          content: "",
          category: categories.length > 0 ? categories[0].id.toString() : "",
        });
        onQuestionCreated?.();
        onClose();
      }
    } catch (error) {
      console.error("Error creating question:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-neutral-900 border border-neutral-700 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-neutral-700">
          <h2 className="text-xl font-semibold text-white">Ask a Question</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
            disabled={isSubmitting}
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]"
        >
          <div className="space-y-4">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Question Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="What's your question?"
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                required
                disabled={isSubmitting}
                maxLength={200}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.title.length}/200 characters
              </p>
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Category *
              </label>
              {loadingCategories ? (
                <div className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-gray-400">
                  Loading categories...
                </div>
              ) : (
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  disabled={isSubmitting || categories.length === 0}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Question Details *
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Provide details about your question..."
                rows={6}
                className="w-full bg-neutral-800 border border-neutral-700 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                required
                disabled={isSubmitting}
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.content.length}/1000 characters
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end space-x-3 pt-6 mt-4 border-t border-neutral-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-300 hover:text-white border border-neutral-700 rounded-md transition-colors disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.content.trim() ||
                !formData.category ||
                loadingCategories
              }
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              {isSubmitting ? (
                "Posting..."
              ) : (
                <>
                  <FaPlus className="mr-2" />
                  Post Question
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AskQuestionModal;
