import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useRoomStore = create((set) => ({
  rooms: [],
  isCreatingRoom: false,
  isJoiningRoom: false,
  createdRoomCode: "",  // Add this to initialize createdRoomCode
  
  fetchRooms: async () => {
    try {
      const res = await axiosInstance.get("/rooms");
      set({ rooms: res.data });
    } catch (error) {
      toast.error("Failed to fetch rooms");
    }
  },

  createRoom: async (data) => {
    set({ isCreatingRoom: true });
    try {
      const res = await axiosInstance.post("/room/create", data);
      if (res.data?.message) {
        toast.success(res.data.message);
      }
      set({ createdRoomCode: res.data.roomCode });  // Store roomCode in Zustand state
      return res.data.room;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create room");
    } finally {
      set({ isCreatingRoom: false });
    }
  },

  joinRoom: async (roomCode) => {
    set({ isJoiningRoom: true });
    try {
      const res = await axiosInstance.post("/room/join", { roomCode });
      
      if (res.data?.message) {
        toast.success(res.data.message);
      }
  
      return res.data.room;
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to join room");
    } finally {
      set({ isJoiningRoom: false });
    }
  },
}));
