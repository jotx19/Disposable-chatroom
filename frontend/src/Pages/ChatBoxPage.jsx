import Sidebar from '../components/Sidebar';
import React from 'react'
import ChatContainer from '../components/ChatContainer';
import NoChatSelected from '../components/NoChatSelected';

import { useChatStore } from '../store/useChatStore';

const ChatBoxPage = () => {
const{ selectedRoom } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
    <div className="flex p-2 items-center justify-center pt-20">
      <div className="bg-base-100 rounded-lg shadow-cl w-full max-w-8xl h-[calc(100vh-6rem)]">
        <div className="flex h-full text-white rounded-lg overflow-hidden">
          <Sidebar />

          {!selectedRoom ? <NoChatSelected /> : <ChatContainer />}
        </div>
      </div>
    </div>
  </div>
  )
}

export default ChatBoxPage;