import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { ArrowRight, MessageSquare, Settings, User } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-base-100 border-b border-base-300 fixed w-full top-0 z-40 backdrop-blur-lg bg-base-100/80">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-between h-full">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2.5 hover:opacity-80 transition-all">
              <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <h1 className="text-lg font-bold">DChat</h1>
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <Link to="/settings" className="btn btn-sm flex items-center transition-colors">
              <Settings className="w-4 h-4 mr-2" />
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm flex items-center">
                  <User className="size-5 mr-2" />
                </Link>

                <button className="flex items-center p-1.5 border-white rounded-lg bg-[#65f157] text-black hover:bg-[#ff91e7] hover:scale-105 border-transparent hover:border-white" onClick={logout}>
                  <span>Logout</span>
                  <ArrowRight className="size-5 -rotate-45" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
