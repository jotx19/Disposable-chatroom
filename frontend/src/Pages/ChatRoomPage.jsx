import { useState } from "react";
import { useRoomStore } from "../store/useRoomStore";
import { Copy, Share } from "lucide-react"; // Import the Copy and Share2 icons from lucide-react

const ChatRoomPage = () => {
  const [joinCode, setJoinCode] = useState("");
  const [roomName, setRoomName] = useState("");
  const { createRoom, joinRoom, isCreatingRoom, isJoiningRoom, createdRoomCode } = useRoomStore();

  const handleJoinRoom = async () => {
    if (!joinCode.trim()) {
      return alert("Join code is required");
    }

    const room = await joinRoom(joinCode);
    if (room) {
      alert("Joined the room successfully!");
    }
  };

  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      return alert("Room name is required");
    }

    const room = await createRoom({ name: roomName });
    if (room) {
      alert(`Room created successfully! Code: ${room.code}`);
    }
  };

  const copyToClipboard = () => {
    if (createdRoomCode) {
      navigator.clipboard.writeText(createdRoomCode)
        .then(() => {
          alert("Room code copied to clipboard!");
        })
        .catch((err) => {
          alert("Failed to copy room code: " + err);
        });
    }
  };


  const shareRoomCode = () => {
    if (navigator.share) {
      navigator.share({
        title: "Join My Chat Room",
        text: `Here's the room code: ${createdRoomCode}`,
        url: window.location.href
      })
      .then(() => alert("Room code shared!"))
      .catch((err) => alert("Failed to share: " + err));
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Join a Room</h1>
        <input
          type="text"
          placeholder="Enter Room Code"
          value={joinCode}
          onChange={(e) => setJoinCode(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleJoinRoom}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          disabled={isJoiningRoom}
        >
          {isJoiningRoom ? "Joining..." : "Join Room"}
        </button>
      </div>

      <div className="w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4">Create a Room</h1>
        <input
          type="text"
          placeholder="Enter Room Name"
          value={roomName}
          onChange={(e) => setRoomName(e.target.value)}
          className="w-full border p-2 rounded mb-4"
        />
        <button
          onClick={handleCreateRoom}
          className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
          disabled={isCreatingRoom}
        >
          {isCreatingRoom ? "Creating..." : "Create Room"}
        </button>

        {createdRoomCode && (
          <div className="mt-4 text-white flex flex-col justify-center">
            <p className="text-gray-400 flex justify-center text-xs sm:text-sm">Here's your room code:</p>
            <div className="flex items-center justify-center mt-2">
              <span className="bg-gray-800 text-white py-2 px-4 rounded-xl text-sm">
                {createdRoomCode}
              </span>
              <Copy
                className="ml-2 text-white cursor-pointer"
                onClick={copyToClipboard}
                size={20} // Set the size of the Copy icon
              />
              <Share
                className="ml-2 text-white cursor-pointer"
                onClick={shareRoomCode}
                size={20} // Set the size of the Share icon
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoomPage;
