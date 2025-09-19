import Header from "./../Header/Header";
import { MdHome } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { IoHelpBuoySharp } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AskQuestionModal from "../AskQuestionModal/AskQuestionModal";
import { toast } from "react-toastify";
import { questionService } from "../../services/question";
import { authService } from "./../../services/authentication";

const Layout = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stats, setStats] = useState({ total_questions: 0, total_answers: 0 });

  const menuItems = [
    { id: "home", icon: MdHome, label: "Home", path: "/" },
    {
      id: "profile",
      icon: RiProfileFill,
      label: "My Profile",
      path: "/profile",
    },
    { id: "help", icon: IoHelpBuoySharp, label: "Help", path: "/help" },
  ];

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const statsData = await questionService.getStats();
        setStats(statsData);
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  const handleAskQuestionClick = () => {
    if (!authService.isAuthenticated()) {
      toast.error("Please login to ask a question");
      return;
    }
    setIsModalOpen(true);
  };

  const handleQuestionCreated = () => {
    setIsModalOpen(false);
    window.location.reload();
    questionService.getStats().then(setStats);
  };

  return (
    <div className="flex flex-col h-screen">
      <Header />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Esquerda */}
        <div className="hidden sm:flex w-1/4 flex-shrink-0">
          <div className="custom-bg-sidebar h-full p-6">
            <div className="ml-8 md:ml-20 lg:ml-32 xl:ml-40 mt-12 w-4/5">
              <div className="space-y-2 text-xl">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;

                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className={`p-3 rounded cursor-pointer transition-colors text-left flex items-center ${
                        active
                          ? "text-blue-500"
                          : "text-white hover:text-blue-400"
                      }`}
                    >
                      <Icon className="mr-3" />
                      <span className="cursor-pointer">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Conteúdo Central  */}
        <div className="w-2/4 bg-[#0f0f0f] p-6 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          <Outlet />
        </div>

        {/* Sidebar Direita */}
        <div className="hidden sm:flex w-1/4 flex-shrink-0">
          <div className="custom-bg-sidebar h-full p-6 border-r border-gray-800 overflow-y-auto">
            <div className="space-y-2">
              <div className="p-3 text-center rounded transition-colors">
                <button
                  onClick={handleAskQuestionClick}
                  className={`px-20 py-3 rounded-sm font-black transition-colors ${
                    authService.isAuthenticated()
                      ? "text-white bg-blue-500 cursor-pointer hover:bg-blue-600"
                      : "text-gray-400 bg-blue-500 bg-opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!authService.isAuthenticated()}
                  title={
                    !authService.isAuthenticated()
                      ? "Please login to ask a question"
                      : ""
                  }
                >
                  Ask A Question
                </button>
              </div>
              <div className="bg-neutral-900 border-t border-neutral-700 rounded-lg p-4 text-center mt-10">
                <h3 className="text-white font-semibold mb-3">Total Stats</h3>

                <div className="grid grid-cols-2">
                  {/* Total Questions */}
                  <div className="rounded p-3">
                    <div className="text-2xl font-bold text-blue-400">
                      {stats.total_questions.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-300 mt-1">Questions</div>
                  </div>

                  {/* Total Answers */}
                  <div className="rounded p-3">
                    <div className="text-2xl font-bold text-green-400">
                      {stats.total_answers.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-300 mt-1">Answers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onQuestionCreated={handleQuestionCreated}
      />
    </div>
  );
};

export default Layout;
