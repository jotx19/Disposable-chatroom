import { create } from "zustand";
import { axiosInstance } from "../lib/axios.js";
import toast from "react-hot-toast";

export const useRoomStore = create((set) => ({
  rooms: [],
  userRooms: [], 
  isCreatingRoom: false,
  isJoiningRoom: false,
  createdRoomCode: "", 

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
      set({ createdRoomCode: res.data.roomCode }); // Store roomCode in Zustand state
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
      console.log("Fetched user rooms:", userRooms); // Log the user rooms to the console
    } catch (error) {
      console.error("Error fetching user rooms:", error);
      toast.error("Failed to fetch user rooms");
    }
  },
  
}));
