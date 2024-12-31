import React, { useState, useEffect } from "react";
import { Settings, ArrowRight, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../store/useRoomStore";

const SettingsPage = () => {
  const [roomCode, setRoomCode] = useState("");
  const [expirationTime, setExpirationTime] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const { getRoomExpirationTime, showToast } = useRoomStore();

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
      String(minutes).padStart(2, "0"),
      String(seconds).padStart(2, "0"),
    ];
  };

  const handleCheckExpirationTime = async (e) => {
    e.preventDefault();
    if (!roomCode) {
      showToast("Please enter a room code", "error");
      return;
    }

    const timeLeftString = await getRoomExpirationTime(roomCode);

    if (timeLeftString) {
      const timeInSeconds = convertToSeconds(timeLeftString);
      setExpirationTime(timeInSeconds);
      setShowModal(true);
    } else {
      setExpirationTime(null);
    }
  };

  useEffect(() => {
    if (expirationTime === null) return;

    const timer = setInterval(() => {
      if (expirationTime > 0) {
        setExpirationTime((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [expirationTime]);

  // Function to navigate to the chatroom
  const goToChatRoom = () => {
    navigate("/chatbox");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 px-8 md:px-12">
      <div className="flex flex-col items-center space-x-4 mb-6">
        <Settings className="text-[#B3B2AD] text-8xl" size={100} />
        <h1 className="text-4xl md:text-6xl font-bold font-futuras text-center text-[#B3B2AD]">
          SETTINGS PAGE
        </h1>
      </div>

      <div className="w-full gap-5 md:w-1/2 flex flex-col items-center justify-center md:justify-center bg-[#171717] p-6 rounded-xl mt-6">
      <div className="flex w-full max-w-sm bg-[#245767] rounded-xl p-2 items-center h-32 md:h-44">
      <img
            src="/roomies.gif"
            alt="Join Room"
            className="w-24 h-24 md:w-32 md:h-32 rounded-md"
          />
          <div className="flex-1 flex-col p-4 justify-between">
            <div className="text-xl font-bold uppercase flex font-futuras text-white md:text-2xl">
              Enter the room code
            </div>
            <div className="flex items-center w-full mt-4">
              <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className="w-full bg-transparent text-white border p-2 rounded-lg focus:outline-none"
              />
              <button
                onClick={handleCheckExpirationTime}
                className="bg-[#BFDD2E] text-white p-3 rounded-full ml-2 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <ArrowRight className="text-black font-bold" size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-3xl w-[90vw] sm:w-[75vw] md:w-[60vw] lg:w-[50vw] xl:w-[40vw] md:h-[55vh] h-[50vh] flex flex-col items-center">
            <div className="flex w-full justify-between mb-4">
              <h2 className="text-4xl tracking-tighter font-custom font-bold text-center text-black w-full">
                Lifespan of Room
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:border rounded-lg hover:shadow-lg"
              >
                <X size={24} />
              </button>
            </div>
            <div className="text-3xl m-11 border bg-[#FFBDF7] rounded-xl p-2 text-[#FF4104] font-futuras uppercase">
              Time Left
            </div>
            <div className="flex mt-2 space-x-2">
              {formatTime(expirationTime).map((timePart, index) => (
                <div
                  key={index}
                  className="text-4xl font-custom text-black border p-2 rounded-xl"
                >
                  {timePart}
                </div>
              ))}
            </div>
            <div className="flex m-2 space-x-2 text-xl font-custom text-black">
              <div>Days: </div>
              <div>Hours: </div>
              <div>Minutes: </div>
              <div>Seconds</div>
            </div>

            <div className="mt-4 flex space-x-4">
              <button
                onClick={goToChatRoom}
                className="bg-black hover:bg-gray-600 mt-2 border text-white p-3 rounded-full transition-all duration-300 flex items-center space-x-2"
              >
                <span>Chatroom</span>
                <ArrowRight className="text-white -rotate-45" size={24} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPage;
