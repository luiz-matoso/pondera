import React from "react";
import logo from "../../assets/logo_pondera.png";
import { Link } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {
  getCurrentUser,
  isAuthenticated,
  logoutUser,
} from "../../services/authentication";

const Header = () => {
  const isLoggedIn = isAuthenticated();
  const user = getCurrentUser();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <nav className="custom-header text-white p-6">
      <div className="container mx-auto px-40 flex justify-between items-center h-full">
        <div className="flex items-center space-x-8 h-full">
          <div className="flex items-center space-x-6">
            <img
              src={logo}
              className="w-14 bg-neutral-900 rounded-2xl shadow-inner shadow-neutral-700 cursor-pointer"
              alt="Logo Pondera"
            />
            <p className="text-white font-bold cursor-pointer">
              <Link to="/">Pondera</Link>
            </p>
          </div>

          <div className="h-5 w-px bg-zinc-800"></div>

          <div className="flex items-center space-x-8">
            <Link
              to="/"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-white hover:text-gray-300 transition-colors"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="flex items-center space-x-6 h-full">
          <div className="flex items-center bg-neutral-950 border border-neutral-700 rounded-md px-6 py-2">
            <input
              type="text"
              placeholder="Type Search Words"
              className="bg-transparent focus:outline-none text-sm w-48 text-gray-300"
            />
            <FaSearch className="cursor-pointer" />
          </div>

          <div className="h-5 w-px bg-zinc-800"></div>

          {isLoggedIn ? (
            <div className="flex items-center space-x-4">
              <img
                src={`https://ui-avatars.com/api/?name=${
                  user?.name || user?.username
                }&background=6366f1&color=fff`}
                alt="Profile"
                className="h-8 w-8 rounded-full"
              />
              <div className="block">
                <p className="text-xs text-gray-400">Logged in as</p>
                <p className="text-sm font-semibold text-white">
                  {user?.name || user?.username}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-1 bg-red-500 text-white text-sm rounded-md transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md transition-colors hover:bg-blue-600"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-zinc-800 text-white text-sm rounded-md transition-colors hover:bg-zinc-700"
              >
                Sign Up
              </Link>
            </div>
          )}

          <div className="h-5 w-px bg-zinc-800"></div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
