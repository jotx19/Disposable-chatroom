import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageCircle,
  Clock,
  Users,
  Send,
  Image,
} from "lucide-react";
import Marquee from "../components/Marquee";

const HomePage = () => {
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const typingEffect = async () => {
      const messages = [
        "hello",
        "hola",
        "how are you ! give a try to disposable chatrooms",
      ];
      let messageIndex = 0;
      let currentText = "";

      while (isTyping) {
        const currentMessage = messages[messageIndex];

        for (let i = 0; i < currentMessage.length; i++) {
          currentText += currentMessage[i];
          setMessage(currentText);
          await new Promise((resolve) => setTimeout(resolve, 400));
        }

        for (let i = currentMessage.length; i > 0; i--) {
          currentText = currentText.slice(0, i - 1);
          setMessage(currentText);
          await new Promise((resolve) => setTimeout(resolve, 700));
        }

        messageIndex = (messageIndex + 1) % messages.length;
      }
    };

    if (isTyping) {
      typingEffect();
    }

    return () => {
      setIsTyping(false);
    };
  }, [isTyping]);

  return (
    <>
      <div className="min-h-screen gap-10 flex flex-col justify-start items-center px-4 lg:px-8">
        <div className="text-center mt-28">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl text-[#B3B2AD] font-futuras uppercase font-bold tracking-tight m-0">
            Welcome to FlikChat
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl lg:text-xl  text-[#B3B2AD] font-custom tracking-tighter mt-4">"Chatting today is more than just exchanging words"</p>
        </div>

        <div className="flex justify-center items-center w-full">
          <img
            src="/hero.png"
            alt="Post"
            className="object-cover h-auto max-w-full md:h-[60vh] lg:h-[68vh]"
          />
        </div>

        <div className="flex flex-row justify-center gap-1 ">
          <Link
            to="/chatbox"
            className="w-28 sm:w-40 h-10 sm:h-12 flex justify-center items-center bg-white rounded-lg text-black hover:scale-105 border-transparent transition duration-200"
          >
            <span className="text-base sm:text-lg">Explore</span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 -rotate-45" />
          </Link>
          <Link
            to="/chatroom"
            className="w-28 sm:w-40 h-10 sm:h-12 flex justify-center items-center bg-white rounded-lg text-black hover:scale-105 border-transparent hover:border-white transition duration-200"
          >
            <span className="text-base sm:text-lg">Room</span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 -rotate-45" />
          </Link>
          
        </div>

        <Marquee />

        <div className="w-full p-4 flex flex-col items-center space-y-6">
          <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-[#245767] rounded-3xl shadow-xl p-10 space-y-8 hover:scale-105 hover:rotate-2 transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-4">
                <MessageCircle className="text-[#DBF507] w-10 h-10" />
                <h1 className="font-futuras uppercase text-[#DBF507] text-2xl sm:text-3xl font-bold">
                  Live Chat
                </h1>
              </div>
              <ul className="text-base text-white sm:text-lg space-y-4">
                <li>Instant Communication</li>
                <li>Real-time Engagement</li>
                <li>Dynamic Conversations</li>
              </ul>
            </div>

            <div className="bg-[#EF5626] rounded-3xl shadow-xl p-10 space-y-8 hover:scale-105 hover:-rotate-2 transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-4">
                <Clock className="text-[#FFBDF7] w-10 h-10" />
                <h1 className="font-futuras uppercase text-[#FFBDF7] text-2xl sm:text-3xl font-bold">
                  Ephemeral
                </h1>
              </div>
              <ul className="text-white justify-center content-center flex flex-col sm:text-lg space-y-4">
                <li>Temporary Chatrooms</li>
                <li>Auto Deletion</li>
                <li>Time-limited Access</li>
              </ul>
            </div>

            <div className="bg-[#1c1c1c] rounded-3xl shadow-xl p-10 space-y-8 hover:scale-105 hover:rotate-2 transition-all duration-300 ease-in-out">
              <div className="flex items-center gap-4">
                <Users className="text-[#FFBDF7] w-10 h-10" />
                <h1 className="font-futuras uppercase text-[#FFBDF7] text-2xl sm:text-3xl font-bold">
                  Chatrooms
                </h1>
              </div>
              <ul className="text-white justify-center content-center flex flex-col sm:text-lg space-y-4">
                <li>Community Discussions</li>
                <li>Topic Organization</li>
                <li>Custom Permissions</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="w-full p-6 flex items-center justify-center">
          <div className="w-full max-w-6xl p-4 bg-white rounded-3xl shadow-xl flex items-center gap-4">
            <input
              type="text"
              value={message}
              className="w-full p-3 font-custom font-bold rounded-3xl border border-gray-300 focus:outline-none focus:border-[#FFBDF7] text-lg"
              placeholder="Type a message..."
              readOnly
            />
            <button className="p-3 rounded-full bg-[#FFBDF7] hover:bg-[#DBB2D3] text-white transition duration-200">
              <Send className="w-6 h-6" />
            </button>
            <button className="p-3 rounded-full bg-[#FFBDF7] hover:bg-[#DBB2D3] text-white transition duration-200">
              <Image className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
