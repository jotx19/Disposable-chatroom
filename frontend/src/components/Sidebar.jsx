import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();

  const {
    getRooms,
    rooms = [],
    selectedRoom,
    setSelectedRoom,
    isRoomLoading,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <aside className="h-full w-16 bg-transparent border-[1px] border-[#27272A] lg:w-52 rounded-l-lg border-base-300 flex flex-col transition-all duration-200">
      <div className="overflow-y-auto w-full gap-2">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => {
            const onlineCount = room.members.filter((member) =>
              onlineUsers.includes(member._id)
            ).length;

            return (
              <button
                key={room._id}
                onClick={() => setSelectedRoom(room)}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${
                    selectedRoom?._id === room._id
                      ? "bg-[#27272A] rounded-l-lg ring-[0.3px] ring-[#27272A]"
                      : ""
                  }
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <div className="size-12 uppercase bg-[#FFBDF7] text-black rounded-full flex justify-center items-center">
                    {room.name[0]}
                  </div>
                </div>

                <div className="hidden lg:block text-left min-w-0">
                  <div className="font-bold text-white truncate">
                    {room.name}
                  </div>
                  <div className="text-sm text-zinc-400">
                    {onlineCount > 0
                      ? `${onlineCount} Online`
                      : "No users online"}
                  </div>
                </div>
              </button>
            );
          })
          
        ) : (
          <div className="flex justify-center items-center py-4">
            <button
              onClick={() => navigate("/chatroom")}
              className="w-full p-2 flex items-center gap-3 hover:bg-[#3b4f67] text-white rounded-2xl transition-all duration-300 ease-in-out"
            >
              <div className="size-12 uppercase bg-[#FFBDF7] text-black rounded-full flex justify-center items-center">
                <Plus size={24} />
              </div>
              <div className="text-left hidden lg:block min-w-0">
                <div className="font-bold text-white hidden lg:block">Add Room</div>
              </div>
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
