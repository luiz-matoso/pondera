import logo from "../../assets/logo_pondera.png";

import { MdOutlineEmail } from "react-icons/md";
import { CiLock } from "react-icons/ci";
import { FaApple, FaGoogle, FaXTwitter } from "react-icons/fa6";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { loginUser } from "../../services/authentication";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await loginUser(formData);
      toast.success("Login successful!");
      setTimeout(() => {
        navigate("/");
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
        <div className="flex items-center justify-center mb-5 mt-5 ">
          <Link to="/">
            <img
              src={logo}
              className="w-20 bg-neutral-900 rounded-2xl shadow-inner shadow-neutral-700 cursor-pointer"
              alt=""
            />
          </Link>
        </div>

        <h1 className="text-white font-semibold text-center text-2xl">
          Welcome Back
        </h1>
        <p className="mt-2 text-zinc-400 text-center">
          Don't have an account yet?{" "}
          <Link className="text-white" to="/register">
            Sign Up
          </Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="flex mt-10 flex-col gap-4">
            {/* Email */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 border border-neutral-800 animation-colors"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address..."
                required
              />
              <MdOutlineEmail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>

            {/* Password */}
            <div className="relative">
              <input
                className="bg-neutral-950 p-2 w-full rounded-md text-neutral-300 w-full pl-8 border border-neutral-800"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Your password..."
                required
              />
              <CiLock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-neutral-400" />
            </div>
          </div>
          <button
            type="submit"
            className="p-2 mt-6 w-full text-white bg-blue-500 rounded-xl cursor-pointer transition-colors hover:bg-blue-600"
          >
            Login
          </button>
        </form>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-neutral-700" />
          <span className="mx-4 text-neutral-500 text-sm">OR</span>
          <hr className="flex-grow border-neutral-700" />
        </div>

        <div className="flex justify-center gap-4 ">
          {/* Apple */}
          <button className="flex justify-center items-center w-full cursor-pointer p-3 bg-neutral-900 rounded-md border border-neutral-800 shadow-lg shadow-black hover:bg-neutral-800 transition-colors">
            <FaApple className="text-white" size={24} />
          </button>
          {/* Google */}
          <button className="flex justify-center items-center w-full p-3 cursor-pointer bg-neutral-900 rounded-md border border-neutral-800 shadow-lg shadow-black hover:bg-neutral-800 transition-colors">
            <FaGoogle className="text-white" size={24} />
          </button>
          {/* Twitter */}
          <button className="flex justify-center items-center w-full p-3 cursor-pointer bg-neutral-900 rounded-md border border-neutral-800 shadow-lg shadow-black hover:bg-neutral-800 transition-colors">
            <FaXTwitter className="text-white" size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
