import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail, Loader } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = await login(formData);

    if (user) {
      navigate("/chatbox");
    } else {
      console.log("Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="shadow-lg border-[2px] border-[#27272A] rounded-lg p-6 md:p-11 w-full max-w-lg">
        <div className="text-center mb-6">
          <div className="flex flex-col items-center gap-3">
            <div className="bg-gray-200 p-3 rounded-full">
              <Mail className="text-black h-8 w-8 md:h-10 md:w-10" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Welcome Back</h1>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
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

          <button
            type="submit"
            className="bg-[#E2E2E2] mt-6 text-black py-2 px-4 rounded-lg w-1/3 md:w-1/2 flex items-center justify-center hover:bg-[#E3E3E3] transition text-sm md:text-base mb-4"
            disabled={isLoggingIn}
          >
            {isLoggingIn ? (
              <>
                <Loader className="animate-spin mr-2" />
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

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
