import { useState } from "react";
import { useRoomStore } from "../store/useRoomStore";
import { Copy, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ChatRoomPage = () => {
  const [joinCode, setJoinCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const {
    createRoom,
    joinRoom,
    isCreatingRoom,
    isJoiningRoom,
    createdRoomCode,
    showToast,
  } = useRoomStore();
  const navigate = useNavigate();

  const handleJoinRoom = async () => {
    if (!joinCode.trim()) {
      return showToast("Join code is required", "error");
    }

    const room = await joinRoom(joinCode);
    if (room || !room) {
      showToast("Joined the room successfully!", "success");
      navigate(`/chatbox`);
    }
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      return showToast("Room name is required", "error");
    }

    const room = await createRoom({ name: roomName });
    if (room) {
      showToast(`Room created successfully! Code: ${room.code}`, "success");
    }
  };

  const copyToClipboard = () => {
    if (createdRoomCode) {
      navigator.clipboard
        .writeText(createdRoomCode)
        .then(() => {
          showToast("Room code copied to clipboard!", "success");
        })
        .catch((err) => {
          showToast("Failed to copy room code: " + err, "error");
        });
    }
  };

  const handleForwardToChatbox = () => {
    if (createdRoomCode) {
      navigate(`/chatbox?roomCode=${createdRoomCode}`);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-8 md:px-12">
      <h1 className="text-6xl font-bold font-futuras text-center text-[#B3B2AD]">
        SETUP YOUR ROOM
      </h1>
      <div className="flex bg-[#171717] rounded-2xl p-10 md:p-12">
        <div className="flex gap-16 flex-col md:flex-row w-full max-w-5xl items-stretch">
          {/* Join Room Section */}
          <div className="w-full gap-5 md:w-1/2 flex flex-col items-center justify-center md:justify-center">
            <div className="flex w-full max-w-sm bg-[#FFBDF7] rounded-xl p-2 items-center">
              <img
                src="/joins.gif"
                alt="Join Room"
                className="w-32 h-32 rounded-md"
              />
              <div className="flex-1 flex-col p-4 justify-between">
                <div className="text-2xl font-bold uppercase flex font-futuras text-white">
                  Join Room
                </div>
                <div className="text-2xl font-bold uppercase flex font-futuras text-[#FF4104]">
                  Enter the code
                </div>
              </div>
            </div>
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={joinCode}
                onChange={(e) => setJoinCode(e.target.value)}
                className="w-full bg-transparent text-white border p-2 rounded-lg"
              />
              <button
                onClick={handleJoinRoom}
                className="bg-blue-500 text-white p-3 rounded-full ml-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isJoiningRoom}
              >
                {isJoiningRoom ? (
                  <div className="flex items-center justify-center gap-2">
                  <ArrowRight
                    size={20}
                    className="hover:-rotate-45 transition-all duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight
                      size={20}
                      className="hover:-rotate-45 transition-all duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                )}
              </button>
            </div>
          </div>

          {/* Divider for larger screens */}
          <div className="hidden md:block border-r border-gray-300 mx-4"></div>

          {/* Create Room Section */}
          <div className="w-full gap-6 md:w-1/2 flex flex-col items-center md:justify-center">
            <div className="flex w-full max-w-sm bg-[#EF5626] rounded-xl p-2 items-center">
              <img
                src="/joins.gif"
                alt="Join Room"
                className="w-32 h-32 rounded-md"
              />
              <div className="flex-1 flex-col p-4 justify-between">
                <div className="text-2xl font-bold uppercase flex font-futuras text-white">
                  Create Room
                </div>
                <div className="text-2xl font-bold uppercase flex font-futuras text-[#FFBDF7]">
                  Enter the code
                </div>
              </div>
            </div>
            <div className="flex items-center w-full">
              <input
                type="text"
                placeholder="Enter Room Name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
                className="w-full text-white bg-transparent border p-2 rounded-lg"
              />
              <button
                onClick={handleCreateRoom}
                className="bg-green-500 text-white p-3 rounded-full ml-2 transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={isCreatingRoom}
              >
                {isCreatingRoom ? (
                  <div className="flex items-center justify-center gap-2">
                  <ArrowRight
                    size={20}
                    className="hover:-rotate-45 transition-all duration-300 ease-in-out transform hover:scale-105"
                  />
                </div>                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <ArrowRight
                      size={20}
                      className="hover:-rotate-45 transition-all duration-300 ease-in-out transform hover:scale-105"
                    />
                  </div>
                )}
              </button>
            </div>

            {createdRoomCode && (
              <div className="mt-4 text-white flex flex-col items-center">
                <p className="text-gray-400 text-xs sm:text-sm">
                  Here's your room code:
                </p>
                <div className="flex items-center mt-2">
                  <span className="bg-gray-800 text-white py-2 px-4 rounded-xl text-sm">
                    {createdRoomCode}
                  </span>
                  <Copy
                    className="ml-2 text-white cursor-pointer"
                    onClick={copyToClipboard}
                    size={20}
                  />
                  <button
                    onClick={handleForwardToChatbox}
                    className="ml-2 text-white cursor-pointer"
                  >
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoomPage;
