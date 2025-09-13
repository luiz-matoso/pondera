import Header from "./../Header/Header";
import { MdHome } from "react-icons/md";
import { RiProfileFill } from "react-icons/ri";
import { IoHelpBuoySharp } from "react-icons/io5";

const Layout = ({ children }) => {
  return (
    <div>
      <Header />

      <div className="flex">
        {/* Sidebar Esquerda */}
        <div className="w-1/4">
          <div className="custom-bg-sidebar h-[calc(100vh-5rem)] p-6">
            <div className="ml-8 md:ml-20 lg:ml-32 xl:ml-40 mt-12 w-4/5">
              <div className="space-y-2 text-xl">
                <div className="p-3 text-white rounded cursor-pointer transition-colors text-left flex items-center hover:text-blue-500">
                  <MdHome className="mr-3" />
                  <span>Home</span>
                </div>
                <div className="p-3 text-white rounded cursor-pointer transition-colors text-left flex items-center hover:text-blue-500">
                  <RiProfileFill className="mr-3" />
                  <span>My Profile</span>
                </div>
                <div className="p-3 text-white rounded cursor-pointer transition-colors text-left flex items-center hover:text-blue-500">
                  <IoHelpBuoySharp className="mr-3" />
                  <span>Help</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-2/4 bg-[#0f0f0f] p-6">{children}</div>

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
