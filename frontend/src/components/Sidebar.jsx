import { useEffect, useState } from "react";
import { useRoomStore } from "../store/useRoomStore";
import SidebarSkeleton from "./SidebarSkeleton";
import { ChevronDown, ChevronUp, Layers, AlertCircle } from "lucide-react"; // Add AlertCircle for offline status

const Sidebar = () => {
  const { getUserRooms, userRooms } = useRoomStore();
  const [activeRoom, setActiveRoom] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [selectedRoom, setSelectedRoom] = useState(null); // State to track selected room

  useEffect(() => {
    getUserRooms();
  }, [getUserRooms]);

  const users = userRooms.flatMap((room) => room.members).map((member) => member);

  if (!userRooms || userRooms.length === 0) {
    return <SidebarSkeleton />;
  }

  const handleToggleRoom = (roomId) => {
    if (activeRoom === roomId) {
      setActiveRoom(null);
    } else {
      setActiveRoom(roomId);
    }
  };

  const handleModalOpen = (room) => {
    setSelectedRoom(room);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedRoom(null);
  };

  return (
    <aside className="h-full w-20 lg:w-72 border-r border-base-300 flex flex-col transition-all duration-200">
      <div className="w-full p-5">
        <div className="font-medium text-xs md:text-lg p-2 bg-[#ff91e7] text-black flex justify-center items-center gap-x-2 rounded-md">
          <Layers className="w-6 h-6 text-black" /> {/* Icon visible on all screens */}
          <span className="hidden lg:block">Rooms</span> {/* Text only visible on desktop */}
        </div>
        {userRooms.map((room, index) => (
          <div key={room.id} className="border-b gap-3 border-base-300">
            <div className="flex mt-2 items-center justify-between p-2">
              <div className="lg:hidden flex items-center justify-center w-9 p-2 h-8 bg-blue-500 text-white font-semibold rounded-md">
                {index + 1}
              </div>
              <div className="hidden lg:flex items-center justify-between w-full">
                <div className="font-medium">{room.name}</div>
                <button
                  onClick={() => handleModalOpen(room)}
                  className="w-8 h-8 text-white rounded-full flex justify-center items-center focus:outline-none"
                >
                  <AlertCircle className="w-5 h-5" /> {/* Lucide icon */}
                </button>
              </div>
            </div>
            {activeRoom === room.id && (
              <div className="overflow-y-auto w-full py-3">
                {room.members.map((user) => (
                  <div
                    key={user.id}
                    className="w-full p-3 flex items-center gap-3 hover:bg-base-300 transition-colors"
                  >
                    <div className="relative mx-auto lg:mx-0">
                      <img
                        src={user.picture || "/avatar.png"}
                        alt={user.name}
                        className="size-12 object-cover rounded-full"
                      />
                      {onlineUsers.includes(user.id) && (
                        <span
                          className="absolute bottom-0 right-0 size-3 bg-green-500 
                          rounded-full ring-2 ring-zinc-900"
                        />
                      )}
                    </div>
                    <div className="hidden lg:block text-left min-w-0">
                      <div className="font-medium truncate">{user.name}</div>
                      <div className="text-sm text-zinc-400">
                        {onlineUsers.includes(user.id) ? "Online" : "Offline"}
                      </div>
                    </div>
                  </div>
                ))}
                {room.members.length === 0 && (
                  <div className="text-center text-zinc-500 py-4">No users available</div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modal to display users with their online status */}
      {isModalOpen && selectedRoom && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
          <div className="bg-gray-900 text-white p-6 rounded-lg w-80 max-w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium text-lg">{selectedRoom.name} - Users</h3>
              <button
                onClick={handleModalClose}
                className="text-red-500 font-semibold text-lg"
              >
                &times; {/* Close button */}
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {selectedRoom.members.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between py-2 px-3 hover:bg-base-100"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={user.picture || "/avatar.png"}
                      alt={user.name}
                      className="w-8 h-8 object-cover rounded-full"
                    />
                    <div className="font-medium">{user.name}</div>
                  </div>
                  <div
                    className={`text-sm ${onlineUsers.includes(user.id) ? "text-green-500" : "text-red-500"}`}
                  >
                    {onlineUsers.includes(user.id) ? "Online" : "Offline"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
