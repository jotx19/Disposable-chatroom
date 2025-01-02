import React, { useEffect, useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import { Trash2 } from "lucide-react";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedRoom,
    subscribeToMessages,
    unsubscribeFromMessages,
    sendMessage,
    deleteSelectedMessages,
    addMessageToState,
    selectedMessages,
    toggleSelectedMessage,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedRoom) {
      getMessages(selectedRoom._id);
      subscribeToMessages((newMessage) => {
        addMessageToState(newMessage);
      });
    }

    return () => unsubscribeFromMessages();
  }, [selectedRoom?._id]);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    const messageData = {
      text: newMessage,
      sender: authUser._id,
      room: selectedRoom._id,
      createdAt: new Date().toISOString(),
    };

    const newMessageResponse = await sendMessage(messageData);
    addMessageToState(newMessageResponse);
    setNewMessage("");
  };

  const handleDeleteSelectedMessages = async () => {
    await deleteSelectedMessages();
  };

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isAuthUser =
            message.sender === authUser._id || message.sender?._id === authUser._id;
          const messageTime = formatMessageTime(message.createdAt);

          return (
            <div
              key={message._id}
              className={`flex ${isAuthUser ? "justify-end" : "justify-start"} relative`}
              onClick={() => toggleSelectedMessage(message._id)}
            >
              {!isAuthUser && (
                <div className="w-10 h-10 rounded-full border mr-2">
                  <img
                    src={message.sender?.profilepic || "/avatar.png"}
                    alt="profile pic"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              )}

              <div className="flex flex-col space-y-2 max-w-xs">
                <div
                  className={`px-4 py-2 rounded-xl ${
                    isAuthUser ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {message.text && <p>{message.text}</p>}
                </div>

                <div className="text-xs text-gray-500">{messageTime}</div>
              </div>

              {selectedMessages.includes(message._id) && (
                <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300 flex items-center justify-center">
                  <button
                    className="bg-red-500 p-1 rounded-full text-white"
                    onClick={() => deleteSelectedMessages([message._id])}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              )}
            </div>
          );
        })}
        <div ref={messageEndRef} />
      </div>

      <MessageInput
        newMessage={newMessage}
        setNewMessage={setNewMessage}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default ChatContainer;
