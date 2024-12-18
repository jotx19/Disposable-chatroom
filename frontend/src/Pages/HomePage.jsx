import React from 'react';
import { Link } from 'react-router-dom'; 
// Remove Pattern import since we are using the image now.

const HomePage = () => {
  return (
    <div className="min-h-screen flex pt-20">
      {/* Left Column with Text and Buttons */}
      <div className="flex-1 text-white p-20">
        <h1 className="text-7xl font-custom">Where Chats Live, Then <br/> Fade Away.</h1>
        <p className="mt-12 text-lg">Create a temporary space for honest chats, where privacy is key and every conversation disappears when you're done.</p>

        <div className="mt-24 flex flex-col space-y-4">
          <Link to="/chatroom">
            <button className="w-2/3 py-3 bg-[#ff91e7] text-black font-custom hover:bg-white hover:scale-105 transition duration-200">
              Make Room
            </button>
          </Link>
        </div>
      </div>

      {/* Right Column with Image */}
      <div className="flex-1 p-12">
        <img 
          src="/final.gif" 
          alt="Post" 
          className="object-cover w-[40vw] h-[70vh] rounded-2xl" 
        />
      </div>
    </div>
  );
};

export default HomePage;
