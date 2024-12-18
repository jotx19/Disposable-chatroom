import { useState } from "react";
import { useRoomStore } from "../store/useRoomStore";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Copy, ArrowRight } from "lucide-react";

const Chatroom = () => {
  const [formData, setFormData] = useState({ roomName: "", roomCode: "" });
  const [generatedRoomCode, setGeneratedRoomCode] = useState(null);
  const navigate = useNavigate();
  const { createRoom, joinRoom, isLoading } = useRoomStore();

  const validateCreateRoom = () => {
    if (!formData.roomName.trim()) {
      toast.error("Room name is required");
      return false;
    }
    return true;
  };

  const validateJoinRoom = () => {
    if (!formData.roomCode.trim()) {
      toast.error("Room code is required");
      return false;
    }
    return true;
  };

  const handleCreateRoom = async () => {
    if (validateCreateRoom()) {
      const code = await createRoom(formData.roomName);
      if (code) {
        setGeneratedRoomCode(code);
      }
    }
  };

  const handleJoinRoom = async () => {
    if (validateJoinRoom()) {
      const success = await joinRoom(formData.roomCode);
      if (success) {
        toast.success("Successfully joined the room!");
        navigate("/chatbox");
      }
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedRoomCode);
    toast.success("Room code copied to clipboard!");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-black">
      {/* Header Section */}
      <div className="text-center p-8 mb-6">
        <h1 className="text-6xl sm:text-9xl font-bold text-white">Chatroom</h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-base">Create or Join a Room</p>
      </div>

      {/* Form Section */}
      <div className="flex flex-col justify-center items-center w-full max-w-lg px-4 sm:px-6 md:px-8">
        <div className="shadow-lg rounded-lg p-6 md:p-10 w-full">
          <div className="flex flex-col gap-4">
            {/* Join Room Section */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
              <input
                type="text"
                placeholder="Enter Room Code"
                className="w-full sm:w-2/3 h-12 pl-4 pr-3 rounded-xl border border-gray-500 focus:ring-2 focus:ring-green-500 focus:outline-none placeholder-gray-400 text-white bg-transparent text-sm"
                value={formData.roomCode}
                onChange={(e) => setFormData({ ...formData, roomCode: e.target.value })}
              />
              <ArrowRight
                onClick={handleJoinRoom}
                className="bg-green-500 -rotate-45 text-black p-2 rounded-full w-12 h-12 cursor-pointer hover:bg-green-600 transition text-sm mt-2 sm:mt-0"
                disabled={isLoading}
                size={24}
              />
            </div>

            {/* OR Divider */}
            <div className="flex items-center justify-center my-4">
              <div className="border-t border-gray-500 md:w-2/4 sm:w-1/4"></div>
              <span className="mx-4 text-white text-xs sm:text-sm">OR</span>
              <div className="border-t border-gray-500 md:w-2/4 sm:w-1/4"></div>
            </div>

            {/* Create Room Section */}
            <div>
              <div className="flex flex-col items-center gap-8">
                <input
                  type="text"
                  placeholder="Enter Room Name"
                  className="w-full h-12 pl-4 pr-3 rounded-xl border border-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-400 text-white bg-transparent text-sm"
                  value={formData.roomName}
                  onChange={(e) => setFormData({ ...formData, roomName: e.target.value })}
                />
                <button
                  onClick={handleCreateRoom}
                  className="bg-white text-black py-2 px-4 rounded-md w-full sm:w-48 h-12 hover:bg-blue-600 transition text-base"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating..." : "Create Room"}
                </button>
              </div>

              {generatedRoomCode && (
                <div className="mt-4 text-white flex flex-col justify-center">
                  <p className="text-gray-400 flex justify-center text-xs sm:text-sm">Here's your room code:</p>
                  <div className="flex items-center justify-center mt-2">
                    <span className="bg-gray-800 text-white py-2 px-4 rounded-xl text-sm">{generatedRoomCode}</span>
                    <Copy
                      className="ml-2 text-white cursor-pointer"
                      onClick={copyToClipboard}
                      size={20}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
