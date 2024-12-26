import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./MessageSkeleton";

const ChatContainer = () => {
  const { messages, getMessages, selectedRoom, isMessagesLoading, sendMessage } =
    useChatStore();
  const { authUser } = useAuthStore();

  // State to hold the current message being typed
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    if (selectedRoom) {
      getMessages(selectedRoom._id);
    }
  }, [selectedRoom?._id, getMessages]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return;

    // Create a new message object
    const messageData = {
      text: newMessage,
      sender: authUser,
      roomId: selectedRoom._id,
    };
    sendMessage(messageData);

    setNewMessage("");
  };

  if (isMessagesLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`flex ${
              message.sender._id === authUser._id ? "justify-end" : "justify-start"
            }`}
          >
            <div className="flex items-start space-x-2">
              <div className="w-10 h-10 rounded-full border">
                <img
                  src={
                    message.sender._id === authUser._id
                      ? authUser.profilePic || "/avatar.png"
                      : "/avatar.png"
                  }
                  alt="profile pic"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col space-y-2 max-w-xs">
                <div
                  className={`px-4 py-2 rounded-lg ${
                    message.sender._id === authUser._id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-black"
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
                <div className="text-xs text-gray-500">
                  {formatMessageTime(message.createdAt)}
                </div>
              </div>
            </div>
          </div>
        ))}
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
