import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { EarthLock, Eye, EyeOff, Layers, Loader, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";

import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="shadow-lg border-[2px] border-[#27272A] rounded-lg p-6 md:p-10 w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-200 p-3 rounded-full">
              <EarthLock className="text-black h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-[#FAFAFA]">Create Account</h1>
            <p className="text-[#999FAB] text-sm -mt-2 mb-6 md:text-base">Get started with your free account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Full Name Input */}
          <div className="relative mb-4 w-full">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full h-12 pl-10 pr-3 rounded-lg border border-[#27272A] focus:ring-1 focus:ring-white focus:outline-none placeholder-gray-400 text-white text-base md:text-base bg-transparent"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Email Input */}
          <div className="relative mb-4 w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="user@gmail.com"
              className="w-full h-12 pl-10 pr-3 rounded-lg border border-[#27272A] focus:ring-1 focus:ring-white focus:outline-none placeholder-gray-400 text-white text-base md:text-base bg-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4 w-full">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="xxxxxx"
              className="w-full h-12 pl-10 pr-3 rounded-lg border border-[#27272A] focus:ring-1 focus:ring-white focus:outline-none placeholder-gray-400 text-white text-base md:text-base bg-transparent"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none text-sm md:text-base"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-[#E2E2E2] text-black mt-11 py-2 px-4 rounded-lg w-1/2 md:w-1/2 flex items-center justify-center hover:bg-[#e3e3e3] transition text-base md:text-base mb-4"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <>
                <Loader className="animate-spin mr-2" />
              </>
            ) : (
              "Create Account"
            )}
          </button>

        </form>

        {/* Login link */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
