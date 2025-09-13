import React from "react";
import logo from "../../assets/logo_pondera.png";

import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { IoPersonSharp } from "react-icons/io5";
import { TbCircleLetterUFilled } from "react-icons/tb";
import { FaApple, FaGoogle, FaXTwitter } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="flex h-screen items-center justify-center">
      <div className="py-8 px-12 max-w-md w-full login-form-bg rounded-2xl shadow-inner shadow-neutral-800">
        <div className="flex items-center justify-center mb-5 mt-5 ">
          <img
            src={logo}
            className="w-20 bg-neutral-800 rounded-2xl shadow-inner shadow-neutral-700 cursor-pointer"
            alt=""
          />
        </div>

        <h1 className="text-white font-semibold text-center text-2xl">
          Create Your Account
        </h1>
        <p className="mt-2 text-zinc-400 text-center">
          Already have an account?{" "}
          <Link className="text-white" to="/signin">
            Sign In
          </Link>
        </p>

        <form action="">
          <div className="flex mt-10 flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-400 w-full pl-8 animation-colors "
                type="text"
                placeholder="Your name..."
              />
              <IoPersonSharp className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Username */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors"
                type="text"
                placeholder="Your username..."
              />
              <TbCircleLetterUFilled className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Birth Date */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors"
                type="text"
                placeholder="Your birth date..."
              />
              <BsCalendar2DateFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors"
                type="email"
                placeholder="Your email address..."
              />
              <MdEmail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8"
                type="password"
                placeholder="Your password..."
              />
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Conf Password */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8"
                type="password"
                placeholder="Confirm your password..."
              />
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
        </form>

        <button className="p-2 mt-6 w-full text-white bg-blue-500 rounded-xl cursor-pointer transition-colors hover:bg-blue-600">
          Register
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-neutral-700" />
          <span className="mx-4 text-neutral-500 text-sm">OR</span>
          <hr className="flex-grow border-neutral-700" />
        </div>

        <div className="flex justify-center gap-4 ">
          {/* Apple */}
          <button className="flex justify-center items-center w-full cursor-pointer p-3 bg-neutral-800 rounded-md border border-neutral-700 hover:bg-neutral-700 transition-colors">
            <FaApple className="text-white" size={24} />
          </button>
          {/* Google */}
          <button className="flex justify-center items-center w-full p-3 cursor-pointer bg-neutral-800 rounded-md border border-neutral-700 hover:bg-neutral-700 transition-colors">
            <FaGoogle className="text-white" size={24} />
          </button>
          {/* Twitter */}
          <button className="flex justify-center items-center w-full p-3 cursor-pointer bg-neutral-800 rounded-md border border-neutral-700 hover:bg-neutral-700 transition-colors">
            <FaXTwitter className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
