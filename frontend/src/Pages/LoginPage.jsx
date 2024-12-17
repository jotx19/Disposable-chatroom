import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn, loginWithGoogle, isLoggingInWithGoogle } = useAuthStore(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="shadow-lg rounded-lg bg-[#121212] p-6 md:p-10 w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-200 p-3 rounded-full">
              <MessageSquare className="text-blue-500 h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h1>
            <p className="text-white text-sm md:text-base">Sign in to your account</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          {/* Email Input */}
          <div className="relative mb-4 w-full">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              placeholder="Email"
              className="w-full h-12 pl-10 pr-3 rounded-3xl border border-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 text-white text-sm md:text-base bg-transparent"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>

          {/* Password Input */}
          <div className="relative mb-4 w-full">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full h-12 pl-10 pr-3 rounded-3xl border border-white focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 text-white text-sm md:text-base bg-transparent"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 focus:outline-none text-sm md:text-base"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-3xl w-full md:w-3/4 flex items-center justify-center hover:bg-blue-600 transition text-sm md:text-base mb-4"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Loading...
              </>
            ) : (
              "Sign in"
            )}
          </button>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-2 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            className="bg-gray-200 text-black py-2 px-4 rounded-3xl w-full md:w-3/4 flex items-center justify-center gap-2 hover:bg-gray-300 transition text-sm md:text-base"
            onClick={(e) => {
              e.preventDefault();
              loginWithGoogle(); 
            }}
            disabled={isLoggingInWithGoogle} 
          >
            {isLoggingInWithGoogle ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Logging in with Google...
              </>
            ) : (
              <span>Sign in with Google</span>
            )}
          </button>
        </form>

        {/* Sign up link */}
        <div className="mt-4 text-center">
          <p className="text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/signup" className="text-blue-500">Create account</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
