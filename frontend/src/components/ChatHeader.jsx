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
    <div className="bg-[#171717] rounded-r-2xl border-base-300">
      <div className="flex items-center justify-between p-2.5">
        <div className="flex items-center gap-3">
          <h3 className="font-medium uppercase">
            {selectedRoom.name}
            <span className="text-sm ml-2 text-green-500">
              {onlineCount > 0 ? `(${onlineCount}) Online` : "No users online"}
            </span>
          </h3>
        </div>

        <button onClick={() => setSelectedRoom(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
