import Header from "./../Header/Header";
import { MdHome } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { IoHelpBuoySharp } from "react-icons/io5";
import { Link, Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import AskQuestionModal from "../AskQuestionModal/AskQuestionModal";
import { isAuthenticated } from "../../services/authentication";
import { toast } from "react-toastify";

const Layout = () => {
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleAskQuestionClick = () => {
    if (!isAuthenticated()) {
      toast.error("Please login to ask a question");
      return;
    }
    setIsModalOpen(true);
  };

  const handleQuestionCreated = () => {
    setIsModalOpen(false);

    window.location.reload();
  };

  return (
    <div>
      <Header />

      <div className="flex">
        {/* Sidebar Esquerda */}
        <div className="w-1/4">
          <div className="custom-bg-sidebar h-[calc(100vh-5rem)] p-6">
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

        <div className="w-2/4 bg-[#0f0f0f] p-6">
          <Outlet />
        </div>

        {/* Sidebar Direita */}
        <div className="w-1/4">
          <div className="custom-bg-sidebar h-[calc(100vh-5rem)] p-6 border-r border-gray-800">
            <div className="space-y-2">
              <div className="p-3 text-center rounded transition-colors">
                <button
                  onClick={handleAskQuestionClick}
                  className={`px-20 py-3 rounded-sm font-black transition-colors ${
                    isAuthenticated()
                      ? "text-white bg-blue-500 cursor-pointer hover:bg-blue-600"
                      : "text-gray-400 bg-blue-500 bg-opacity-50 cursor-not-allowed"
                  }`}
                  disabled={!isAuthenticated()}
                  title={
                    !isAuthenticated() ? "Please login to ask a question" : ""
                  }
                >
                  Ask A Question
                </button>
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
