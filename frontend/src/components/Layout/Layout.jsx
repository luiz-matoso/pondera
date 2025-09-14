import Header from "./../Header/Header";
import { MdHome } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { IoHelpBuoySharp } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Layout = ({ children }) => {
  const [activeTab, setActiveTab] = useState("home");

  const menuItems = [
    { id: "home", icon: MdHome, label: "Home", component: HomeContent },
    {
      id: "profile",
      icon: RiProfileFill,
      label: "My Profile",
      component: ProfileContent,
    },
    {
      id: "help",
      icon: IoHelpBuoySharp,
      label: "Help",
      component: HelpContent,
    },
  ];

  const ActiveComponent =
    menuItems.find((item) => item.id === activeTab)?.component || HomeContent;

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
                  const active = activeTab === item.id;

                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      className={`p-3 rounded cursor-pointer transition-colors text-left flex items-center ${
                        active
                          ? "text-blue-500"
                          : "text-white hover:text-blue-400"
                      }`}
                    >
                      <Icon className="mr-3" />
                      <span className={`cursor-pointer`}>{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/4 bg-[#0f0f0f] p-6">
          <ActiveComponent />
        </div>

        {/* Sidebar Direita */}
        <div className="w-1/4">
          <div className="custom-bg-sidebar h-[calc(100vh-5rem)] p-6 border-r border-gray-800">
            <div className="space-y-2">
              <div className="p-3 text-center rounded transition-colors">
                <button className="text-white bg-blue-500 px-20 py-3 cursor-pointer rounded-sm font-black">
                  Ask A Question
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
