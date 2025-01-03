import React, { useState, useEffect } from 'react';
import { X, ArrowRight, Settings2Icon, UserIcon } from 'lucide-react';
import { useChatStore } from '../store/useChatStore';
import { useAuthStore } from '../store/useAuthStore';
import { useRoomStore } from '../store/useRoomStore';

const ChatHeader = () => {
  const { selectedRoom, setSelectedRoom } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const { getRoomExpirationTime } = useRoomStore(); // Assuming the TTL logic is handled in this function
  const [isModalOpen, setModalOpen] = useState(false);
  const [expirationTime, setExpirationTime] = useState(null);

  if (!selectedRoom) {
    return null;
  }

  const onlineCount = selectedRoom.members.filter((member) =>
    onlineUsers.includes(member._id)
  ).length;

  const openRoomDetails = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const convertToSeconds = (timeString) => {
    const parts = timeString.split(":");
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    return hours * 3600 + minutes * 60 + seconds;
  };

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds <= 0) {
      return ["00", "00", "00", "00"];
    }

    const days = Math.floor(timeInSeconds / (3600 * 24));
    const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    return [
      String(days).padStart(2, "0"),
      String(hours).padStart(2, "0"),
      String(minutes).padStart(2, "00"),
      String(seconds).padStart(2, "00"),
    ];
  };

  const fetchRoomExpiration = async () => {
    const roomId = selectedRoom._id;
    const timeLeftString = await getRoomExpirationTime(roomId);

    if (timeLeftString) {
      const timeInSeconds = convertToSeconds(timeLeftString);
      setExpirationTime(timeInSeconds);
    }
  };

  useEffect(() => {
    if (selectedRoom) {
      fetchRoomExpiration();
    }

    const timer = setInterval(() => {
      if (expirationTime > 0) {
        setExpirationTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [selectedRoom, expirationTime]);

  return (
<div className="bg-[#171717] rounded-r-2xl border-base-300">
  <div className="flex items-center justify-between p-5">
    <div className="flex items-center gap-3">
      <h3 className="font-medium uppercase">
        {selectedRoom.name}
      </h3>

      <div className="flex items-center gap-1">
        <UserIcon className="text-green-500" size={20} />
        <span className="text-sm text-gray-400">{onlineCount}</span>
      </div>
    </div>

    <div className="flex items-center gap-6">
      <Settings2Icon
        size={22}
        className="text-white cursor-pointer"
        onClick={openRoomDetails}
      />

      <button onClick={() => setSelectedRoom(null)}>
        <X />
      </button>
    </div>
  </div>

  {isModalOpen && (
    <div className="fixed inset-0 bg-black backdrop-blur-sm bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-3xl w-full max-w-lg flex flex-col items-center">
        <div className="flex w-full justify-between mb-4">
          <h2 className="text-3xl text-black font-custom tracking-tighter text-center w-full">
            Room Members
          </h2>
          <button
            onClick={closeModal}
            className="text-gray-500 hover:border rounded-lg p-1 hover:shadow-lg"
          >
            ✕
          </button>
        </div>
        <div className="text-sm bg-[#FFBDF7] p-2 rounded-xl uppercase mb-7 text-[#FF4104] font-futuras mt-4">
          Members & Status
        </div>
        <ul className="space-y-3 mt-4 w-full">
          {selectedRoom.members.map((member, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-2 bg-[#F4F4F4] rounded-lg shadow-sm"
            >
              <span className="text-black">{member.name}</span>
              <span
                className={`text-sm ${
                  onlineUsers.includes(member._id)
                    ? 'text-green-500'
                    : 'text-red-500'
                }`}
              >
                {onlineUsers.includes(member._id) ? 'Online' : 'Offline'}
              </span>
            </li>
          ))}
        </ul>

        <div className="text-sm bg-[#FFBDF7] border rounded-xl p-2 uppercase mt-6 font-futuras text-[#FF4104]">
          Time Left in Room
        </div>
        <div className="flex mt-4 space-x-2">
          {expirationTime && formatTime(expirationTime).map((timePart, index) => (
            <div key={index} className="text-4xl font-custom text-black border p-2 rounded-xl">
              {timePart}
            </div>
          ))}
        </div>
        <div className="flex space-x-2 text-md font-custom text-black">
          <div>Days</div>
          <div>Hours</div>
          <div>Minutes</div>
          <div>Seconds</div>
        </div>

        <button
          onClick={closeModal}
          className="bg-black hover:bg-gray-600 mt-7 border text-white p-3 rounded-full transition-all duration-300 flex items-center space-x-2"
        >
          <span>Chatroom</span>
          <ArrowRight className="text-white -rotate-45" size={24} />
        </button>
      </div>
    </div>
  )}
</div>
  );
};

export default ChatHeader;
