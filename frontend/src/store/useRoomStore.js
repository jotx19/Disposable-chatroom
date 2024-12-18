import { create } from "zustand";
import { axiosInstance } from "../lib/axios";

export const useRoomStore = create((set) => ({
  rooms: [],
  isLoading: false,

  createRoom: async (roomName) => {
    try {
      set({ isLoading: true });
      const response = await axiosInstance.post("/room/create", { name: roomName });
      set({ isLoading: false });
      return response.data.roomCode;
    } catch (error) {
      set({ isLoading: false });
      console.error("Error creating room:", error);
      return null;
    }
  },
  

  joinRoom: async (roomCode) => {
    try {
      set({ isLoading: true });
      console.log("Joining room with code:", roomCode); // Debug log
      const response = await axiosInstance.post("/room/join", { roomCode }); 
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      console.error("Error joining room:", error);
      return false;
    }
  },
  
}));
