import React, { useState } from "react";
import logo from "../../assets/logo_pondera.png";

import { IoPersonSharp } from "react-icons/io5";
import { TbCircleLetterUFilled } from "react-icons/tb";
import { FaApple, FaGoogle, FaXTwitter } from "react-icons/fa6";
import { BsCalendar2DateFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "./../../services/authentication";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      await registerUser(formData);
      toast.success("Your account was successfully created.");
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.error || "An error occurred. Try Again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="py-8 px-12 max-w-md w-full login-form-bg rounded-2xl shadow-inner shadow-neutral-700 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-l from-[#06b6d4] via-[#2563eb] to-[#6366f1] rounded-t-2xl"></div>
        <div className="flex items-center justify-center mb-5 mt-5">
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
          <Link className="text-white" to="/login">
            Sign In
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex mt-10 flex-col gap-4">
            {/* Name */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors "
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name..."
                required
              />
              <IoPersonSharp className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Username */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors"
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Your username..."
                required
              />
              <TbCircleLetterUFilled className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Birth Date */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors"
                type="date"
                name="birthdate"
                value={formData.birthdate}
                onChange={handleChange}
                placeholder="Your birth date..."
                required
              />
              <BsCalendar2DateFill className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Email */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 animation-colors"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address..."
                required
              />
              <MdEmail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password..."
                required
              />
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Conf Password */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password..."
                required
              />
              <FaLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
          <button
            type="submit"
            className="p-2 mt-6 w-full text-white bg-blue-500 rounded-xl cursor-pointer transition-colors hover:bg-blue-600"
          >
            Register
          </button>
        </form>

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
