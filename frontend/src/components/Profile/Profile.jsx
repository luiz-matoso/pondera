import { useState, useEffect, useCallback } from "react";
import { FaUserCircle, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { updateProfile, changePassword } from "../../services/profile";
import { getCurrentUser, isAuthenticated } from "../../services/authentication";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    birthdate: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [loading, setLoading] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const isLoggedIn = isAuthenticated();
  const user = getCurrentUser();

  const initializeFormData = useCallback(() => {
    if (user && !isInitialized) {
      let formattedBirthdate = "";
      if (user.birthdate) {
        const date = new Date(user.birthdate);
        if (!isNaN(date.getTime())) {
          formattedBirthdate = date.toISOString().split("T")[0];
        }
      }

      setFormData({
        name: user.name || "",
        email: user.email || "",
        username: user.username || "",
        birthdate: formattedBirthdate,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsInitialized(true);
    }
  }, [user, isInitialized]);

  useEffect(() => {
    initializeFormData();
  }, [initializeFormData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (
      name === "name" ||
      name === "email" ||
      name === "currentPassword" ||
      name === "newPassword" ||
      name === "confirmPassword"
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword({
      ...showPassword,
      [field]: !showPassword[field],
    });
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        setLoading(false);
        return;
      }

      const result = await updateProfile({
        name: formData.name,
        email: formData.email,
      });

      if (result.success) {
        const updatedUser = {
          ...user,
          name: result.user.name,
          email: result.user.email,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setIsInitialized(false);
        toast.success("Profile updated successfully!");
      } else {
        toast.error(result.message || "Error updating profile.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error updating profile. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      setLoading(false);
      return;
    }

    try {
      const result = await changePassword({
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      });

      if (result.success) {
        toast.success("Password changed successfully!");
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      } else {
        toast.error(result.message || "Error changing password.");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error changing password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Unauthorized Access</h2>
          <p className="mt-2">You need to be logged in to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="login-form-bg text-gray-100 font-sans p-8">
      <header className="bg-neutral-900 border-t border-neutral-700 px-6 py-4 rounded-lg mb-6">
        <nav className="flex space-x-6">
          <Link
            to="/profile"
            className="text-white border-b-2 border-blue-500 pb-2 font-medium"
          >
            My Profile
          </Link>
        </nav>
      </header>

      <main className="mt-4">
        <div className="bg-neutral-900 border-t border-neutral-700 rounded-xl p-6 lg:p-8">
          <h2 className="text-xl font-semibold flex items-center">
            <FaUserCircle className="mr-2" /> Personal Information
          </h2>
          <p className="text-gray-400 mt-2">
            Update your personal information.
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-6">
            <img
              src={`https://ui-avatars.com/api/?name=${
                user?.name || user?.username || "User"
              }&background=6366f1&color=fff`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border-2 border-neutral-600"
            />
            <div>
              <button
                className="bg-transparent text-white border border-gray-700 py-2 px-4 rounded-md hover:bg-gray-700 transition-colors cursor-not-allowed opacity-50"
                disabled
              >
                Change avatar is not available at the moment.
              </button>
              <p className="text-sm text-gray-400 mt-2">
                JPG or PNG. Maximum 1MB.
              </p>
            </div>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleProfileSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Username */}
              <div>
                <label className="block text-sm font-medium text-gray-400">
                  Username
                </label>
                <input
                  type="text"
                  name="username"
                  className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white cursor-not-allowed"
                  value={formData.username}
                  disabled
                  title="Username cannot be changed"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Email *
              </label>
              <input
                type="email"
                name="email"
                className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Birthdate */}
            <div>
              <label className="block text-sm font-medium text-gray-400">
                Birthdate
              </label>
              <input
                type="text"
                name="birthdate"
                className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white cursor-not-allowed"
                value={formData.birthdate}
                disabled
                title="Birthdate cannot be changed"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-600 cursor-pointer text-white py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>

          <hr className="border-neutral-700 my-12" />

          <h2 className="text-xl font-semibold mt-12 flex items-center">
            <FaLock className="mr-2" /> Change Password
          </h2>
          <p className="text-gray-400 mt-2">
            Update your password associated with your account.
          </p>

          <form className="mt-8 space-y-6" onSubmit={handlePasswordSubmit}>
            <div className="relative">
              <label className="block text-sm font-medium text-gray-400">
                Current Password *
              </label>
              <input
                type={showPassword.current ? "text" : "password"}
                name="currentPassword"
                className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                value={formData.currentPassword}
                onChange={handleChange}
                placeholder="Your current password..."
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
                onClick={() => togglePasswordVisibility("current")}
              >
                {showPassword.current ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400">
                New Password *
              </label>
              <input
                type={showPassword.new ? "text" : "password"}
                name="newPassword"
                className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                value={formData.newPassword}
                onChange={handleChange}
                placeholder="Your new password..."
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
                onClick={() => togglePasswordVisibility("new")}
              >
                {showPassword.new ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <div className="relative">
              <label className="block text-sm font-medium text-gray-400">
                Confirm New Password *
              </label>
              <input
                type={showPassword.confirm ? "text" : "password"}
                name="confirmPassword"
                className="mt-1 block w-full bg-neutral-950 border border-neutral-800 rounded-md py-2 px-3 text-white placeholder-gray-500 focus:outline-none focus:border-white"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your new password..."
                required
              />
              <button
                type="button"
                className="absolute right-3 top-9 text-gray-400 hover:text-white"
                onClick={() => togglePasswordVisibility("confirm")}
              >
                {showPassword.confirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-600 text-white cursor-pointer py-2 px-6 rounded-md font-medium hover:bg-blue-700 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? "Saving..." : "Change Password"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Profile;
