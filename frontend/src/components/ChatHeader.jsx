import { X } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = () => {
  const { selectedRoom, setSelectedRoom } = useChatStore();
  const { onlineUsers } = useAuthStore();

  if (!selectedRoom) {
    return null;
  }

  const onlineCount = selectedRoom.members.filter(member => onlineUsers.includes(member._id)).length;

  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div>
            <h3 className="font-medium uppercase ml-3">{selectedRoom.name}</h3>
            <p className="text-sm ml-3 text-base-content/ text-green-500">
              {onlineCount > 0 ? `${onlineCount} Online` : "No users online"}
            </p>
          </div>
        </div>

        <button onClick={() => setSelectedRoom(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
