import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle, Clock, Users, BoxIcon } from "lucide-react";
import Marquee from "../components/Marquee";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen gap-16 flex mt-14 flex-col justify-start items-center px-4 lg:px-8">
        <div className="text-center mt-28">
          <h1 className="text-4xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl mb-8 leading-tight bg-gradient-to-r from-white to-purple-600 text-transparent bg-clip-text font-bold tracking-tight">
            Welcome to FlikChat
            <br /> Connect, Chat & Share Instantly
          </h1>

          <p className="text-sm px-6  sm:text-xl md:text-xl lg:text-xl  text-[#B3B2AD] font-custom mt-4">
            Chatting today is more than just exchanging words
            <br />
            it's about building connections, sharing moments, and creating
            memories.
          </p>
        </div>
        {/* 
        <div className="flex justify-center items-center w-full">
          <img
            src="/hero.png"
            alt="Post"
            className="object-cover h-auto max-w-full md:h-[60vh] lg:h-[68vh]"
          />
        </div> */}

        <div className="flex flex-row justify-center gap-5 ">
          <Link
            to="/chatbox"
            className="w-24 sm:w-36 h-11 sm:h-11 flex justify-center items-center bg-[#f2f2f2] rounded-lg hover:bg-[#d8d8da] text-black"
          >
            <span className="text-base sm:text-lg">Rooms</span>
            <BoxIcon className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
          </Link>
          <Link
            to="/chatroom"
            className="w-xl p-2 sm:w-36 h-11 sm:h-11 flex justify-center items-center bg-transparent border-[1px] border-[#27272A] hover:bg-[#27272A] rounded-lg text-[#f2f2f2] "
          >
            <span className="text-base sm:text-lg">Get Started</span>
            <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2 -rotate-45" />
          </Link>
        </div>

        <div className="w-full p-4 flex flex-col items-center space-y-6">
          <div className="max-w-6xl w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-transparent border border-[#27272A] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center space-y-6 hover:scale-105 hover:rotate-2 transition-all duration-300 ease-in-out">
              <MessageCircle className="text-[#EF5626] w-14 h-14" />
              {/* <h1 className="font-futuras uppercase text-[#EF5626] text-2xl sm:text-3xl font-bold">
        Live Chat
      </h1> */}
              <ul className="text-base text-white sm:text-lg space-y-2">
                <li>Instant Communication</li>
                <li>Real-time Engagement</li>
                <li>Dynamic Conversations</li>
              </ul>
            </div>

            <div className="bg-transparent border border-[#27272A] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center space-y-6 hover:scale-105 hover:-rotate-2 transition-all duration-300 ease-in-out">
              <Clock className="text-[#DBF507] w-14 h-14" />
              {/* <h1 className="font-futuras uppercase text-[#DBF507] text-2xl sm:text-3xl font-bold">
        Ephemeral
      </h1> */}
              <ul className="text-white sm:text-lg space-y-2">
                <li>Temporary Chatrooms</li>
                <li>Auto Deletion</li>
                <li>Time-limited Access</li>
              </ul>
            </div>

            <div className="bg-transparent border border-[#27272A] rounded-3xl shadow-xl p-10 flex flex-col items-center text-center space-y-6 hover:scale-105 hover:rotate-2 transition-all duration-300 ease-in-out">
              <Users className="text-[#FFBDF7] w-14 h-14" />
              {/* <h1 className="font-futuras uppercase text-[#FFBDF7] text-2xl sm:text-3xl font-bold">
        Chatrooms
      </h1> */}
              <ul className="text-white sm:text-lg space-y-2">
                <li>Community Discussions</li>
                <li>Topic Organization</li>
                <li>Custom Permissions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="min-h-[40vh] flex flex-col mt-10 items-center justify-center text-center px-4 py-8 sm:px-6 md:px-8 lg:px-12 xl:px-16">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-6xl font-bold text-[#f2f2fa] mb-6">
          Experience the Future of Live Chat
        </h2>
        <p className="text-base p-5 sm:text-lg md:text-xl lg:text-2xl xl:text-xl text-gray-400 max-w-3xl leading-relaxed">
          FlikChat makes chatting seamless and instant. Click "Get Started" to
          begin, then create a room by adding a name—you will receive a unique
          code. Share this code with friends so they can join the same room. To
          view your active rooms, click "Go to Room", where all your joined
          rooms are listed. Select any room to enter and start chatting freely.
          No signups, no history—just simple, real-time conversations that
          disappear when you are done.
        </p>
      </div>

      <Marquee />
    </>
  );
};

export default HomePage;
