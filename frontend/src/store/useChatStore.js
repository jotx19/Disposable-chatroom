// useChatStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios";  // Ensure this import is correct

export const useChatStore = create((set, get) => ({
  messages: [],
  selectedRoom: null,
  isRoomLoading: false,
  isMessagesLoading: false,

  setSelectedRoom: async (roomId) => {
    set({ isRoomLoading: true });
    try {
      const res = await axiosInstance.get(`room/rooms/${roomId}`);
      set({ selectedRoom: res.data });
      get().fetchMessages(roomId); // Fetch messages for the selected room
    } catch (error) {
      toast.error("Failed to load room details");
    } finally {
      set({ isRoomLoading: false });
    }
  },

  fetchMessages: async (roomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`room/messages/${roomId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error("Failed to load messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (roomId, content, image = null) => {
    try {
      const payload = { roomId, content, image };
      const res = await axiosInstance.post("room/messages/send", payload);
      set({ messages: [...get().messages, res.data] }); // Append the new message
    } catch (error) {
      toast.error("Failed to send message");
    }
  },
}));
