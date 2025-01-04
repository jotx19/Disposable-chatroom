import { create } from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../lib/axios"; 
import { useAuthStore } from "./useAuthStore";  

export const useChatStore = create((set, get) => ({
  messages: [],
  rooms: [],
  selectedMessages: [],
  selectedRoom: null,
  isRoomLoading: false,
  isMessagesLoading: false,

  getRooms: async () => {
    set({ isRoomLoading: true });
    try {
      const res = await axiosInstance.get("/room/users");
      set({ rooms: res.data });
    } catch (error) {
      console.log("Failed to fetch rooms")
    } finally {
      set({ isRoomLoading: false });
    }
  },

  getMessages: async (roomId) => {
    set({ isMessagesLoading: true });
    try {
      const res = await axiosInstance.get(`/message/${roomId}/messages`);
      set({ messages: res.data });
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
    socket.emit("joinRoom", selectedRoom._id);
    socket.on("message", (message) => {
      if (message.room === selectedRoom._id) {
        set({ messages: [...get().messages, message] });
      }
    });
  },

  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    socket.emit("leaveRoom");
    socket.off("message");
  },

  setSelectedRoom: (selectedRoom) => {
    const { unsubscribeFromMessages, subscribeToMessages, getMessages } = get();
    unsubscribeFromMessages();
    set({ selectedRoom });
    if (selectedRoom) {
      getMessages(selectedRoom._id);
      subscribeToMessages();
    }
  },

  deleteSelectedMessages: async () => {
    const { selectedMessages, messages, selectedRoom } = get();

    if (selectedMessages.length === 0) {
      toast.error("No messages selected for deletion");
      return;
    }

    try {
      const res = await axiosInstance.delete("/message/delete", {
        data: { messageIds: selectedMessages },
      });

      toast.success("Deleted successfully");
      set({
        messages: messages.filter((message) => !selectedMessages.includes(message._id)),
        selectedMessages: [],
      });
    } catch (error) {
      toast.error("Failed to delete selected messages");
    }
  },

  addMessageToState: (newMessage) => {
    set((state) => ({
      messages: [...state.messages, newMessage],
    }));
  },

  toggleSelectedMessage: (messageId) => {
    const { selectedMessages } = get();
    if (selectedMessages.includes(messageId)) {
      set({
        selectedMessages: selectedMessages.filter(id => id !== messageId),
      });
    } else {
      set({
        selectedMessages: [...selectedMessages, messageId],
      });
    }
  },
}));
