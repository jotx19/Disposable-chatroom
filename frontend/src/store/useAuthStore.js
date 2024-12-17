import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
  authUser: null,
  isSigningUp: false,
  isLoggingIn: false, 
  isLoginWithGoogle: false, 
  isUpdatingProfile: false,
  isCheckingAuth: true,
  isGoogleLogin: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data, isGoogleLogin: true });
    } catch (error) {
      set({ authUser: null, isGoogleLogin: false });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null, isGoogleLogin: false });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  loginWithGoogle: async () => {
    set({ isLoggingInWithGoogle: true });
    try {
      const googleAuthWindow = window.open(
        "http://localhost:5001/api/auth/google", 
        "Google Login",
      );

      const checkIfClosed = setInterval(() => {
        if (googleAuthWindow.closed) {
          clearInterval(checkIfClosed);
          axiosInstance.get("api/auth/google")
            .then((res) => {
              set({ authUser: res.data, isGoogleLogin: true });
              toast.success("Logged in with Google successfully!");
            })
            .catch(() => {
              toast.error("Google login failed");
            });
        }
      }, 1000);
    } catch (error) {
      toast.error("Error with Google login flow");
    } finally {
      set({ isLoggingInWithGoogle: false });
    }
  }
}));
