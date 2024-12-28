import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useRoomStore = create((set) => ({
  rooms: [],
  userRooms: [], 
  isCreatingRoom: false,
  isJoiningRoom: false,
  createdRoomCode: "", 
  roomExpirationTimes: {}, // New state to hold expiration times for rooms

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
      set({ createdRoomCode: res.data.roomCode });
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

  showToast: (message, type = "success") => {
    if (type === "success") {
      toast.success(message);
    } else if (type === "error") {
      toast.error(message);
    } else {
      toast(message);
    }
  },

  getUserRooms: async () => {
    try {
      const res = await axiosInstance.get("/room/users");
      const userRooms = res.data.map((room) => ({
        ...room,
        members: room.members.map((member) => ({
          id: member._id,
          name: member.name,
          email: member.email,
          picture: member.picture,
        })),
        createdBy: {
          id: room.createdBy._id,
          name: room.createdBy.name,
          email: room.createdBy.email,
          picture: room.createdBy.picture,
        },
      }));
      set({ userRooms });
      console.log("Fetched user rooms:", userRooms);
    } catch (error) {
      console.error("Error fetching user rooms:", error);
      toast.error("Failed to fetch user rooms");
    }
  },

  getRoomExpirationTime: async (roomCode) => {  
    try {
      const res = await axiosInstance.get(`/room/${roomCode}/expiry`);
      const { timeLeft } = res.data;
        
      set((state) => ({
        roomExpirationTimes: {
          ...state.roomExpirationTimes,
          [roomCode]: timeLeft,
        },
      }));
  
      console.log(`Expiration time for room ${roomCode}:`, timeLeft); // Log the expiration time

      return timeLeft; 
    } catch (error) {
      console.error('Error fetching room expiration time:', error); // Log any errors
      toast.error('Failed to fetch room expiration time');
    }
  },
  
}));
