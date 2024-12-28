import React, { useEffect, useState } from 'react';
import { useChatStore } from '../store/useChatStore';
import { Layers } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';

const Sidebar = () => {
  const { getRooms, rooms = [], selectedRoom, setSelectedRoom, isRoomLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();


  useEffect(() => {
    getRooms();
  }, [getRooms]);

  return (
    <aside className="h-full w-20 bg-[#171717] lg:w-52 rounded-l-3xl border-base-300 flex flex-col transition-all duration-200">
      {/* <div className='border-base-300 flex justify-center gap-4 w-full p-2.5'>
        <Layers className="size-6" />
        <span className="font-medium hidden lg:block">Rooms</span>
      </div> */}

      <div className="overflow-y-auto w-full py-3">
        {Array.isArray(rooms) && rooms.length > 0 ? (
          rooms.map((room) => {
            // Count online members for each room
            const onlineCount = room.members.filter(member => onlineUsers.includes(member._id)).length;

            return (
              <button
                key={room._id}
                onClick={() => setSelectedRoom(room)}
                className={`
                  w-full p-3 flex items-center gap-3
                  hover:bg-base-300 transition-colors
                  ${selectedRoom?._id === room._id ? "bg-[#] border rounded-l-3xl ring-[0.3px] ring-white" : ""}
                `}
              >
                <div className="relative mx-auto lg:mx-0">
                  <div className="size-12 uppercase bg-[#DBF507] text-black rounded-full flex justify-center items-center">
                    {room.name[0]} 
                  </div>
                </div>

                <div className="hidden  lg:block text-left min-w-0">
                  <div className="font-bold text-white truncate">{room.name}</div>
                  <div className="text-sm text-zinc-400">
                    {onlineCount > 0 ? `${onlineCount} Online` : "No users online"}
                  </div>
                </div>
              </button>
            );
          })
        ) : (
          <div className="text-center text-zinc-500 py-4">No rooms available</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
