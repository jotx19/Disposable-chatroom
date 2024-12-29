import { Layers } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-12 md:p-16 bg-base-100/50">
      <div className="max-w-lg text-center space-y-6">
        <div className="flex justify-center gap-4 mb-4">
          <div className="relative"></div>
        </div>

        <img
          src="/hero2.gif" 
          alt="Welcome Illustration"
          className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-3xl mb-4 mx-auto"
        />

        <h2 className="text-xl sm:text-2xl md:text-3xl font-futuras text-[#B3B2AD] uppercase font-bold">
          Welcome to FlickChat!
        </h2>
      </div>
    </div>
  );
};

export default NoChatSelected;
