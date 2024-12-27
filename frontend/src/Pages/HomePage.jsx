import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HomePage = () => {
  return (
    <>
    <div className="min-h-screen flex flex-col justify-center lg:flex-row">
      <div className="text-8xl text-[#B3B2AD] font-custom pt-28">
        <h1 className='font-futuras uppercase font-bold tracking-tight'>Where Chats Live, Then <u>Fade</u> Away.</h1>

        <div className="flex justify-center p-10 items-center">
          <img
            src="/Postses.png"
            alt="Post"
            className="object-cover w-full max-h-[50vh] rounded-2xl"
          />
        </div>

        <div className="flex flex-row justify-center content-center gap-4 mt-6">
          <Link
            to="/explore"
            className="w-40 h-12 flex justify-center items-center bg-white rounded-3xl text-black hover:bg-[#ff91e7] hover:scale-105 border-transparent hover:border-white transition duration-200"
          >
            <span className="text-lg font-bold">Explore</span>
            <ArrowRight className="w-5 h-5 ml-2 -rotate-45" />
          </Link>
          <Link
            to="/chatroom"
            className="w-40 h-12 flex justify-center items-center bg-white rounded-3xl text-black hover:bg-[#ff91e7] hover:scale-105 border-transparent hover:border-white transition duration-200"
          >
            <span className="text-lg font-bold">Room</span>
            <ArrowRight className="w-5 h-5 ml-2 -rotate-45" />
          </Link>
        </div>
      </div>
    </div>
    </>
  );
};

export default HomePage;
