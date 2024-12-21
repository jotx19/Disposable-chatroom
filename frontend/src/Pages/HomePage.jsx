import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col md:flex-col lg:flex-row pt-20">
      {/* Left Column with Text and Buttons */}
      <div className="flex-1 text-white p-8 md:p-24">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-custom">
          Where Chats <br /> Live, Then Fade Away.
        </h1>
        <p className="mt-8 md:mt-10 lg:mt-12 font-custom text-sm md:text-lg lg:text-2xl tracking-tight">
          Create a temporary space for honest chats, where privacy is key and every conversation disappears when you're done.
        </p>

        <div className="mt-10 md:mt-12 lg:mt-16 flex flex-col md:flex-row gap-4 md:gap-6">
          <Link to="/chatbox">
            <button className="w-40 md:w-48 lg:w-56 h-12 md:h-14 lg:h-16 text-lg md:text-xl py-3 bg-[#ff91e7] text-black font-custom hover:bg-white hover:scale-105 transition duration-200">
              Make Room
            </button>
          </Link>
          <Link to="/chatroom">
            <button className="w-28 md:w-40 lg:w-56 h-12 md:h-14 lg:h-16 text-lg md:text-xl py-3 bg-transparent border-[0.5px] border-white text-white font-custom hover:bg-white hover:scale-105 hover:text-black transition duration-200">
              Help
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column with Image */}
      <div className="flex-1 p-8 md:p-12 flex justify-center items-center">
        <img
          src="/hero.png"
          alt="Post"
          className="object-cover w-full h-auto max-h-[60vh] md:max-h-[70vh] rounded-2xl"
          style={{ padding: '10px' }}
        />
      </div>
    </div>
  );
};

export default HomePage;
