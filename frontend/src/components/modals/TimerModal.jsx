import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react'; // Import the X (close) icon

// Timer Modal component
const TimerModal = ({ expirationTime, showModal, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(expirationTime);

  // Countdown logic for modal (decrementing expiration time)
  useEffect(() => {
    if (timeLeft === null) return;

    const timer = setInterval(() => {
      if (timeLeft > 0) {
        setTimeLeft((prev) => prev - 1);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time as Days:HH:MM:SS
  const formatTime = (timeInSeconds) => {
    if (timeInSeconds <= 0) {
      return '00:00:00:00'; // Return "00:00:00:00" if expired
    }

    const days = Math.floor(timeInSeconds / (3600 * 24));
    const hours = Math.floor((timeInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    // Format each part to always have two digits
    const formattedDays = String(days).padStart(2, '0');
    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedDays}:${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-xl w-96 flex flex-col items-center">
          <div className="flex w-full justify-end">
            <button onClick={onClose} className="text-gray-500">
              <X size={24} />
            </button>
          </div>
          <h2 className="text-2xl font-bold text-center mb-4">Room Expiration Time</h2>
          <div className="text-3xl font-mono text-black">
            {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    )
  );
};

export default TimerModal;
