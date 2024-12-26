// useChatStore.js
import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios"; 
import { useAuthStore } from "./useAuthStore";  

export const useChatStore = create((set, get) => ({
  messages: [],
  room: [],
  selectedRoom: null,
  isRoomLoading: false,
  isMessagesLoading: false,

  getRooms: async () => {
    set({ isRoomLoading: true });
    try {
      const res = await axiosInstance.get("/room/users");
      set({ rooms: res.data });
    } catch (error) {
      toast.error("Failed to fetch rooms");
    } finally {
      set({ isRoomLoading: false });
    }
  },

  getMessages: async (roomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${roomId}/messages`);
      set({ messages:res.data });
    } catch (error) {
      toast.error("Failed to fetch messages");
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  sendMessage: async (messageData) => {
    const { selectedRoom, messages } = get();
    if (!selectedRoom?._id) {
      console.error("Room ID is missing!");
      return;
    }
  
    try {
      const res = await axiosInstance.post(`/message/${selectedRoom._id}/sendMessage`, messageData);
      set({ messages: [...messages, res.data] });
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  },

  subscribeToMessages: () => {
    const { selectedRoom } = get();
    if (!selectedRoom) return;
  
    const socket = useAuthStore.getState().socket;
  
    // Join the selected room
    socket.emit('joinRoom', selectedRoom._id);
  
    // Listen for new messages
    socket.on('message', (message) => {
      if (message.room === selectedRoom._id) {
        set({ messages: [...get().messages, message] });
      }
    });
  },
  

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.off('message');
    socket.emit('leaveRoom');
  },
  
  
// need chnages
setSelectedRoom: (selectedRoom) => {
  const { unsubscribeFromMessages, subscribeToMessages } = get();

  unsubscribeFromMessages();
  set({ selectedRoom });
  subscribeToMessages();
},

}));
